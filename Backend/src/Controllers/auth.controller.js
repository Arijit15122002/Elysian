import bcrypt from 'bcryptjs'

import User from '../Models/user.model.js'
import generateTokenAndSetCookie from '../Utils/generateToken.js'


const signup = async (req, res) => {

    try {
        
        const { username, fullname, email, password } = req.body

        console.log(username, fullname, email, password)

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
            username,
            fullname,
            email,
            password : hashedPassword
        })

        if( newUser ) {

            await newUser.save()

            generateTokenAndSetCookie(newUser._id, res)

            return res.status(201).json({
                message : "User created successfully",
                user : newUser
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

        generateTokenAndSetCookie(existingUser._id, res)

        return res.status(200).json({
            message : "User logged in successfully",
            user : existingUser
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

const getMe = async (req, res) => {

    try {

        const user = await User.findById(req.user._id).select("-password")

        if( !user ) {
            return res.status(404).json({
                message : "User not found"
            })
        }

        return res.status(200).json({
            message : "User found successfully",
            user
        })
        
    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while getting user"
        })

    }

}

export { signup, login, logout, getMe }