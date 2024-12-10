import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../Models/user.model.js'
import generateTokenAndSetCookie from '../Utils/generateToken.js'


const signup = async (req, res) => {

    try {
        
        const { username, fullname, email, password } = req.body

        const profilePic = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

        if ( !emailRegex.test(email) ) {
            return res.status(400).json({
                message : "Invalid email address"
            })
        }

        if ( !username || !fullname || !email || !password ) {
            return res.status(400).json({
                message : "All fields are required"
            })
        }

        const existingUserName = await User.findOne({ username })

        if( existingUserName ) {
            return res.status(400).json({
                message : "UserName is already been taken"
            })
        }

        const existingUserEmail = await User.findOne({ email })

        if( existingUserEmail ) {
            return res.status(400).json({
                message : "Email already exists in our database"
            })
        }

        if( password.length < 8 ) {
            return res.status(400).json({
                message : "Password must be atleast of 8 characters"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            profilePic,
            username,
            fullname,
            email,
            password : hashedPassword
        })

        if( newUser ) {

            await newUser.save()

            const token = jwt.sign({ userId : newUser._id }, process.env.JWT_SECRET, { expiresIn : '10d' })

            return res.status(201).json({
                message : "User created successfully",
                user : newUser,
                token
            })

        } else {

            return res.status(500).json({
                message : "Something went wrong while creating user"
            })

        }
    } catch (error) {
        return res.status(500).json({ 
            message : "Something went wrong while registering user"    
        })
    }
}

const login = async (req, res) => {

    try {

        const {email, password} = req.body
        // console.log(email, password);

        if( !email || !password ) {
            return res.status(400).json({
                message : "All fields are required"
            })
        }

        const existingUser = await User.findOne({ email })

        if( !existingUser ) {
            return res.status(404).json({
                message : "User not found"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if( !isPasswordCorrect ) {
            return res.status(400).json({
                message : "Invalid credentials (Password is not correct)"
            })
        }

        const token = jwt.sign({ userId : existingUser._id }, process.env.JWT_SECRET, { expiresIn : '10d' })

        return res.status(200).json({
            message : "User logged in successfully",
            user : existingUser, 
            token
        })
        
    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while logging in"
        })

    }

}

const logout = async (req, res) => {

    try {

        res.clearCookie('jwt')
        return res.status(200).json({
            message : "User logged out successfully"
        })
        
    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while logging out"
        })

    }

}


export { signup, login, logout }