import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
    
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn : '10d' }) 

    res.cookie('jwt', token, {
        secure : false,
        sameSite : 'strict',
    })

}

export default generateTokenAndSetCookie