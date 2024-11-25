import express from 'express'
import { getUser, loginUser, registerUser } from '../controllers/authController.js'
import { authenticateToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/register', registerUser) //Rotes for new user
router.post('/login', loginUser) //Rotes for login user

router.get('/:id', authenticateToken, getUser)

export default router