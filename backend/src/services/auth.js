import admin from 'firebase-admin'

/**
 * Create a custom token for Firebase Authentication
 * @param {string} uid - User ID
 * @returns {Promise<string>} Custom token
 */
export async function createCustomToken(uid) {
  try {
    const customToken = await admin.auth().createCustomToken(uid)
    return customToken
  } catch (error) {
    console.error('Error creating custom token:', error)
    throw new Error('Failed to create authentication token')
  }
}

