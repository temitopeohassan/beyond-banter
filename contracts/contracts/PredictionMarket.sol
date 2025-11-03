// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract PredictionMarket is Ownable {
    enum Outcome { None, TeamA, TeamB, Draw }

    struct MatchInfo {
        string teamA;
        string teamB;
        uint64 startTime;
        uint64 endTime;
        bool resolved;
        Outcome result;
        uint256 totalPool;
        uint256 poolA;
        uint256 poolB;
    }

    IERC20 public immutable stakingToken; // e.g., USDC
    address public feeRecipient;
    uint16 public platformFeeBps; // 200 = 2%

    mapping(bytes32 => MatchInfo) public matchesById; // id => match
    mapping(bytes32 => mapping(address => uint256)) public stakeA; // id => user => amount
    mapping(bytes32 => mapping(address => uint256)) public stakeB; // id => user => amount

    event MatchCreated(bytes32 indexed id, string teamA, string teamB, uint64 startTime);
    event Staked(bytes32 indexed id, address indexed user, Outcome outcome, uint256 amount);
    event MatchResolved(bytes32 indexed id, Outcome result);
    event RewardsDistributed(bytes32 indexed id, uint256 totalDistributed, Outcome winner);

    constructor(IERC20 _stakingToken, address _feeRecipient, uint16 _platformFeeBps) Ownable(msg.sender) {
        require(address(_stakingToken) != address(0), "token");
        require(_feeRecipient != address(0), "feeRecipient");
        require(_platformFeeBps <= 10000, "fee bps");
        stakingToken = _stakingToken;
        feeRecipient = _feeRecipient;
        platformFeeBps = _platformFeeBps; // 200 = 2%
    }

    function setFeeRecipient(address _recipient) external onlyOwner {
        require(_recipient != address(0), "zero");
        feeRecipient = _recipient;
    }

    function setPlatformFeeBps(uint16 _bps) external onlyOwner {
        require(_bps <= 10000, "bps");
        platformFeeBps = _bps;
    }

    function createMatch(bytes32 id, string calldata teamA_, string calldata teamB_, uint64 startTime) external onlyOwner {
        require(matchesById[id].startTime == 0, "exists");
        matchesById[id] = MatchInfo({
            teamA: teamA_,
            teamB: teamB_,
            startTime: startTime,
            endTime: 0,
            resolved: false,
            result: Outcome.None,
            totalPool: 0,
            poolA: 0,
            poolB: 0
        });
        emit MatchCreated(id, teamA_, teamB_, startTime);
    }

    function stake(bytes32 id, Outcome outcome, uint256 amount) external {
        require(outcome == Outcome.TeamA || outcome == Outcome.TeamB, "bad outcome");
        MatchInfo storage m = matchesById[id];
        require(m.startTime != 0, "no match");
        require(!m.resolved, "resolved");
        require(amount > 0, "amount");

        // pull tokens
        require(stakingToken.transferFrom(msg.sender, address(this), amount), "transferFrom");

        if (outcome == Outcome.TeamA) {
            stakeA[id][msg.sender] += amount;
            m.poolA += amount;
        } else {
            stakeB[id][msg.sender] += amount;
            m.poolB += amount;
        }
        m.totalPool += amount;
        emit Staked(id, msg.sender, outcome, amount);
    }

    function resolveMatch(bytes32 id, Outcome result, uint64 endTime) external onlyOwner {
        require(result == Outcome.TeamA || result == Outcome.TeamB || result == Outcome.Draw, "bad result");
        MatchInfo storage m = matchesById[id];
        require(m.startTime != 0, "no match");
        require(!m.resolved, "resolved");
        m.resolved = true;
        m.result = result;
        m.endTime = endTime;
        emit MatchResolved(id, result);
    }

    function distributeRewards(bytes32 id) external {
        MatchInfo storage m = matchesById[id];
        require(m.resolved, "not resolved");
        require(m.result == Outcome.TeamA || m.result == Outcome.TeamB, "draw unsupported");

        uint256 fee = (m.totalPool * platformFeeBps) / 10000;
        uint256 distributable = m.totalPool - fee;
        if (fee > 0) {
            require(stakingToken.transfer(feeRecipient, fee), "fee xfer");
        }

        uint256 winnerPool = m.result == Outcome.TeamA ? m.poolA : m.poolB;
        require(winnerPool > 0, "no winners");

        // Distribute by pull: users call claim. For simplicity here, do single-shot pro-rata to msg.sender
        // Production: implement per-user claim tracking. To keep within scope, we expose a claim function below.
        revert("Use claimReward");
    }

    mapping(bytes32 => mapping(address => bool)) public claimed;

    function claimReward(bytes32 id) external {
        MatchInfo storage m = matchesById[id];
        require(m.resolved, "not resolved");
        require(m.result == Outcome.TeamA || m.result == Outcome.TeamB, "draw unsupported");
        require(!claimed[id][msg.sender], "claimed");

        uint256 userStake = m.result == Outcome.TeamA ? stakeA[id][msg.sender] : stakeB[id][msg.sender];
        require(userStake > 0, "no stake");

        claimed[id][msg.sender] = true;

        uint256 fee = (m.totalPool * platformFeeBps) / 10000;
        uint256 distributable = m.totalPool - fee;
        uint256 winnerPool = m.result == Outcome.TeamA ? m.poolA : m.poolB;
        uint256 reward = (userStake * distributable) / winnerPool;
        require(stakingToken.transfer(msg.sender, reward), "xfer");
    }
}


