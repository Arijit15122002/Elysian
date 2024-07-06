import jwt from 'jsonwebtoken'

import User from '../Models/user.model.js'

const protectRoute = async (req, res, next) => {

    try {

        const token = req.cookies.jwt

        if( !token ) {
            return res.status(401).json({
                message : "Unauthorized : User needs to login first"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if( !decoded ) {
            return res.status(401).json({
                message : "Unauthorized : Invalid token"
            })
        }

        const user = await User.findById(decoded.userId).select("-password")

        if( !user ) {
            return res.status(401).json({
                message : "Unauthorized : User not found"
            })
        }

        req.user = user
        next()
        
    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while protecting route"
        })

    }

}

export default protectRoute