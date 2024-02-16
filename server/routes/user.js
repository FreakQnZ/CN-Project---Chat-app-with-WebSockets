import express from "express"
import { User } from "../database/models/users.js"
import Jwt from "jsonwebtoken"
import { authenticateToken } from "../utils/authorise.js"

const router = express.Router()

router.get('/', authenticateToken ,(req,res) => {

    console.log(req.user)

    res.json({
        message: 'Hello World'
    })
    console.log("Hello World")
})

router.post('/login' ,async (req,res) => {
    // const uuid = req.body.uuid
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({
        // uuid,
        email,
        password
    })

    if (!user) {
        res.status(400)
        res.json({
            success: false,
            message: 'User not found'
        })
    } else {

        const token = {
            uuid: user.uuid
        }

        const accessToken = Jwt.sign(token, process.env.ACCESS_TOKEN_SECRET)

        res.json({
            success: true,
            message: 'User found',
            accessToken
        })
    }

})

router.post('/new', async (req,res) => {
    const uuid = req.body.uuid
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({
        email
    })

    if (user) {
        res.status(400)
        res.json({
            message: 'User already exists'
        })
    }
    else {
        const status = await User.create({
            uuid,
            email,
            password
        })
    
        if (!status) {
            res.status(400)
            res.json({
                message: 'User not created'
            })
        } else {
            res.json({
                message: 'User created'
            })
        }
    }
})

export default router