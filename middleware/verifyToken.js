import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (authHeader) {
        //verify a token 
        const token = authHeader && authHeader.split(' ')[1]//get public key
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
            if (err) {
                return res.status(403).json({ status: false, message: "Invalid token" })
            }
            req.user = user
            next()
        })
    } else {
        return res.status(401).json({ status: false, message: "You are not authenticatedd" })
    }
}