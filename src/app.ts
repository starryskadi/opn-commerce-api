import bodyParser from "body-parser";
import express from "express";
import { UserService } from "./service/user.service"
import { isAuthenticated } from "./middleware/auth";
import { Auth } from "./service/auth.service";
import { registerUserDTO, updateProfileDTO, changePasswordDTO, loginDTO } from "./dtos/user.dto";

const PORT = 3000
const userService = new UserService()  
const authService = new Auth()

const app = express()

app.use(bodyParser.json())

app.post("/register", (req, res) => {
    // Registration page is where new member can start their membership.
    // Fields submitted: email, password, name, date of birth, gender and address, subscribe to newsletter.
    const schema = registerUserDTO.safeParse(req.body) 

    if (schema.error) {
        res.status(400).json({
            message: schema.error
        })
        return;
    }

    try {
        const user = userService.register(schema.data)

        res.status(200).json({
            user,
            message: "Succeefully registered the user"
        })
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).json({
                message: e.message
            })
            return
        }
        
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
})

app.get("/profile", isAuthenticated, (req, res) => {
    try {
        const user = userService.getProfile({ id: req.user.id })

        res.status(200).json({
            user: user
        })
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).json({
                message: e.message
            })
            return
        }
        
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
})

// TODO: If we want to get profile by id, we can use this endpoint.

// app.get("/profile/:id", isAuthenticated, (req, res) => {
//     // Profile page is where we can see their information.
//     // Fields to display: email, name, age, gender, address and subscribe to newsletter.
//     const id = Number(req.params.id)

//     const schema = getProfileDTO.safeParse({ id })

//     if (schema.error) {
//         res.status(400).json({
//             message: schema.error
//         })
//         return;
//     }

//     try {
//         const user = userService.getProfile({ id: schema.data.id })

//         res.status(200).json({
//             user: user
//         })
//     } catch (e) {
//         if (e instanceof Error) {
//             res.status(400).json({
//                 message: e.message
//             })
//             return
//         }   
        
//         res.status(500).json({
//             message: "Something went wrong!"
//         })
//     }
// })

app.post("/profile", isAuthenticated, (req, res) => {
    // Edit profile page is where members can update their information.
    // Fields allowed to edit: date of birth, gender, address and subscribe to newsletter.
    const id = req.user.id

    const schema = updateProfileDTO.safeParse(req.body)

    if (schema.error) {
        res.status(400).json({
            message: schema.error
        })
        throw new Error("Invalid request body")
    }

    try {
        const user = userService.updateProfile({ id, ...schema.data })

        res.status(200).json({
            user,
            message: "Succeefully updated the user"
        })
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).json({
                message: e.message
            })
            return
        }
        
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
})

app.delete("/profile", isAuthenticated, (req, res) => {
    // Members can delete their account regarding PDPA policy.
    const id = req.user.id

    try {
        const isDeleted = userService.deleteProfile({ id })

        if (isDeleted) {
            res.status(200).json({
                message: 'The user is sucessfully deleted'
            })
        }
    } catch(e) {
        if (e instanceof Error) {
            res.status(400).json({
                message: e.message
            })
            return
        }
        
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
})


app.post("/change-password", isAuthenticated, (req, res) => {
    const id = req.user.id

    const schema = changePasswordDTO.safeParse(req.body)

    if (schema.error) {
        res.status(401).json({
            message: schema.error
        })
        return;
    }

    try {
        const user = userService.updatePassword({ id, ...schema.data })

        res.status(200).json({
            user,
            message: "Succeefully updated the password"
        })
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).json({
                message: e.message
            })
            return
        }
        
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
})

app.post("/login", (req, res) => {
    const schema = loginDTO.safeParse(req.body)

    if (schema.error) {
        res.status(400).json({
            message: schema.error
        })
        return;
    }

    try {
        const user = userService.login(schema.data)
        const token = authService.token(user)

        console.log(user, token)

        res.status(200).json({
            token: token,
            user: user
        })
    } catch (e) {   
        if (e instanceof Error) {
            res.status(400).json({
                message: e.message
            })
            return
        }
        
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`)
})