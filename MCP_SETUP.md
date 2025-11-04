# Divvi MCP Server Setup for Cursor

This guide explains how to install and configure the Divvi MCP Server in Cursor to enable AI-assisted Divvi referral SDK integration.

## What is the Divvi MCP Server?

The Divvi MCP Server is a Model Context Protocol (MCP) server that provides AI assistants with tools for automatically integrating the [@divvi/referral-sdk](https://github.com/divvi-xyz/divvi-referral-sdk) into JavaScript/TypeScript blockchain applications.

## Installation Steps

### Method 1: Using Cursor Settings UI (Recommended)

1. **Open Cursor Settings**
   - Press `Ctrl + ,` (Windows/Linux) or `Cmd + ,` (Mac)
   - Or go to `File` → `Preferences` → `Settings`

2. **Navigate to MCP Configuration**
   - In the settings search bar, type "Model Context Protocol" or "MCP"
   - Click on "Features" → "Model Context Protocol" or "MCP Servers"

3. **Add Divvi MCP Server**
   - Click "Add MCP Server" or "+" button
   - Configure with the following:
     - **Name**: `divvi-mcp`
     - **Command**: `npx`
     - **Args**: `["-y", "@divvi/mcp-server"]`
     - **Env**: Leave empty (or add environment variables if needed)

4. **Save and Restart**
   - Save the configuration
   - Restart Cursor for the changes to take effect

### Method 2: Using Configuration File

If Cursor supports configuration files, you can create/edit a Cursor MCP configuration file. The location may vary:

**Possible locations:**
- `.cursor/mcp.json` (in your project root)
- `~/.cursor/mcp-config.json` (in your home directory)
- Cursor settings directory

**Configuration format:**
```json
{
  "mcpServers": {
    "divvi-mcp": {
      "command": "npx",
      "args": ["-y", "@divvi/mcp-server"],
      "env": {}
    }
  }
}
```

## Verification

After installation, you can verify the MCP server is working by:

1. **Open Cursor's AI Chat** (usually `Ctrl + L` or `Cmd + L`)
2. **Ask the AI**: "Integrate this dapp with Divvi"
3. The AI should now have access to Divvi integration tools and will guide you through the process

## Usage

Once installed, you can use the Divvi MCP server by asking your AI assistant:

- **Simple**: "Integrate this dapp with Divvi"
- **Specific**: "Integrate my dapp with Divvi using consumer address 0x1234..."

The AI will:
1. Read the latest Divvi SDK documentation
2. Analyze your project structure
3. Install the SDK if needed
4. Modify your blockchain transactions to include referral tracking
5. Add referral submission after transactions

## Requirements

- **Node.js 22+** (should already be installed)
- **npm or yarn** (for npx to work)
- **Cursor** with MCP support

## Troubleshooting

### MCP Server Not Working

1. **Check Node.js version**: Run `node --version` (should be 22+)
2. **Check npx**: Run `npx --version` to ensure it's available
3. **Restart Cursor**: MCP servers are loaded on startup
4. **Check Cursor logs**: Look for MCP-related errors in Cursor's output/logs

### Installation Issues

- If `npx` fails, you may need to install the package globally:
  ```bash
  npm install -g @divvi/mcp-server
  ```
  Then update the command in Cursor settings to just: `@divvi/mcp-server`

### Local Development Setup

If you prefer to build from source:

```bash
# Clone the repository
git clone https://github.com/divvi-xyz/divvi-mcp-server.git
cd divvi-mcp-server

# Install dependencies
npm install  # or yarn install

# Build
npm run build  # or yarn build
```

Then configure Cursor to use:
- **Command**: `node`
- **Args**: `["/path/to/divvi-mcp-server/dist/index.js"]`

## Resources

- **Divvi MCP Server Repository**: https://github.com/divvi-xyz/divvi-mcp-server
- **Divvi Referral SDK**: https://github.com/divvi-xyz/divvi-referral-sdk
- **MCP Documentation**: https://modelcontextprotocol.io

## Next Steps

After setting up the Divvi MCP server, you can:
1. Ask your AI assistant to integrate Divvi referral tracking into your Beyond Banter dapp
2. Provide your Divvi consumer address when prompted
3. The AI will automatically integrate the SDK following best practices

---

**Note**: This MCP server helps integrate Divvi referral tracking. You'll need to have a Divvi consumer address (your dapp's wallet address registered on Divvi) to complete the integration.

