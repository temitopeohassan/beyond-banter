import { Router } from 'express'
import admin from 'firebase-admin'
import { createCustomToken } from '../services/auth.js'

export function createRouter(db) {
  const router = Router()
  if (!db) {
    router.use((_req, res) => res.status(503).json({ error: 'Database not available' }))
    return router
  }

  // Login endpoint - verify email/password and create custom token
  router.post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' })
      }

      // Get user from Firestore admins collection
      const adminsRef = db.collection('admins')
      const adminQuery = await adminsRef.where('email', '==', email).limit(1).get()

      if (adminQuery.empty) {
        return res.status(401).json({ error: 'Invalid email or password' })
      }

      const adminDoc = adminQuery.docs[0]
      const adminData = adminDoc.data()

      // Verify password (simple comparison for now - should use bcrypt in production)
      if (adminData.password !== password) {
        return res.status(401).json({ error: 'Invalid email or password' })
      }

      // Create custom token for Firebase Auth
      const uid = adminDoc.id
      const customToken = await createCustomToken(uid)

      res.json({
        ok: true,
        token: customToken,
        user: {
          id: uid,
          email: adminData.email,
          username: adminData.username || adminData.email,
        },
      })
    } catch (e) {
      next(e)
    }
  })

  // Verify token endpoint
  router.post('/verify', async (req, res, next) => {
    try {
      const { token } = req.body

      if (!token) {
        return res.status(400).json({ error: 'Token is required' })
      }

      // Verify the token with Firebase Admin
      const decodedToken = await admin.auth().verifyIdToken(token)
      
      // Get user from admins collection
      const adminDoc = await db.collection('admins').doc(decodedToken.uid).get()
      
      if (!adminDoc.exists) {
        return res.status(401).json({ error: 'Admin not found' })
      }

      const adminData = adminDoc.data()

      res.json({
        ok: true,
        user: {
          id: decodedToken.uid,
          email: adminData.email,
          username: adminData.username || adminData.email,
        },
      })
    } catch (e) {
      if (e.code === 'auth/id-token-expired' || e.code === 'auth/invalid-id-token') {
        return res.status(401).json({ error: 'Invalid or expired token' })
      }
      next(e)
    }
  })

  // Logout endpoint (client-side mainly, but we can track if needed)
  router.post('/logout', async (_req, res) => {
    res.json({ ok: true, message: 'Logged out successfully' })
  })

  return router
}

