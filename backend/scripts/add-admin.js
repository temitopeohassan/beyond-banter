import 'dotenv/config'
import { initFirebase } from '../src/firebase.js'
import admin from 'firebase-admin'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve))
}

async function addAdmin() {
  try {
    // Initialize Firebase
    const db = initFirebase()
    console.log('✅ Firebase initialized\n')

    // Get admin details
    const email = await question('Enter admin email: ')
    const username = await question('Enter admin username (optional, press Enter to use email): ') || email
    const password = await question('Enter admin password: ')

    if (!email || !password) {
      console.error('❌ Email and password are required')
      process.exit(1)
    }

    // Check if admin already exists
    const adminsRef = db.collection('admins')
    const existingAdmin = await adminsRef.where('email', '==', email).limit(1).get()

    let adminId
    if (!existingAdmin.empty) {
      console.log('⚠️  Admin with this email already exists. Updating...')
      adminId = existingAdmin.docs[0].id
      await adminsRef.doc(adminId).update({
        username,
        password, // In production, hash this password
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      })
    } else {
      // Create Firebase Auth user
      let firebaseUser
      try {
        firebaseUser = await admin.auth().createUser({
          email,
          emailVerified: false,
          disabled: false,
        })
        adminId = firebaseUser.uid
        console.log('✅ Firebase Auth user created:', adminId)
      } catch (authError) {
        // User might already exist in Firebase Auth
        if (authError.code === 'auth/email-already-exists') {
          const users = await admin.auth().getUserByEmail(email)
          adminId = users.uid
          console.log('⚠️  Firebase Auth user already exists, using existing UID:', adminId)
        } else {
          throw authError
        }
      }

      // Create admin document in Firestore
      await adminsRef.doc(adminId).set({
        email,
        username,
        password, // In production, hash this password with bcrypt
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      })
      console.log('✅ Admin document created in Firestore')
    }

    console.log('\n✅ Admin added successfully!')
    console.log(`   Email: ${email}`)
    console.log(`   Username: ${username}`)
    console.log(`   UID: ${adminId}`)
  } catch (error) {
    console.error('❌ Error adding admin:', error)
    process.exit(1)
  } finally {
    rl.close()
  }
}

addAdmin()

