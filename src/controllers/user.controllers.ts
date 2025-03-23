import { Router } from "express";
import { registerUserDTO, updateProfileDTO, changePasswordDTO, loginDTO  } from "../dtos/user.dto";
import { zodErrorResponse } from "../utils/zodErrorResponse";
import { errorResponse } from "../utils/errorResponse";
import { isAuthenticated } from "../middleware/auth";
import { UserService } from "../service/user.service";  
import { Auth } from "../service/auth.service";

const router = Router()
const userService = UserService.getInstance()
const authService = Auth.getInstance()

router.post("/register", (req, res) => {
    // Registration page is where new member can start their membership.
    // Fields submitted: email, password, name, date of birth, gender and address, subscribe to newsletter.
    const schema = registerUserDTO.safeParse(req.body) 

    if (schema.error) {
        res.status(400).json(zodErrorResponse(schema.error))
        return;
    }

    try {
        const user = userService.register(schema.data)

        res.status(200).json({
            user,
            message: "Succeefully registered the user"
        })
    } catch (e) {
        errorResponse(e, res)
    }
})

router.post("/profile", isAuthenticated, (req, res) => {
    // Edit profile page is where members can update their information.
    // Fields allowed to edit: date of birth, gender, address and subscribe to newsletter.
    const id = req.user.id

    const schema = updateProfileDTO.safeParse(req.body)

    if (schema.error) {
        res.status(400).json(zodErrorResponse(schema.error))
        return;
    }

    try {
        const user = userService.updateProfile({ id, ...schema.data })

        res.status(200).json({
            user,
            message: "Succeefully updated the user"
        })
    } catch (e) {
        errorResponse(e, res)
    }
})

router.get("/profile", isAuthenticated, (req, res) => {
    try {
        const user = userService.getProfile({ id: req.user.id })

        res.status(200).json({
            user: user
        })
    } catch (e) {
        errorResponse(e, res)
    }
})

router.delete("/profile", isAuthenticated, (req, res) => {
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
        errorResponse(e, res)
    }
})


router.post("/change-password", isAuthenticated, (req, res) => {
    const id = req.user.id

    const schema = changePasswordDTO.safeParse(req.body)

    if (schema.error) {
        res.status(401).json(zodErrorResponse(schema.error))
        return;
    }

    try {
        const user = userService.updatePassword({ id, ...schema.data })

        res.status(200).json({
            user,
            message: "Succeefully updated the password"
        })
    } catch (e) {
        errorResponse(e, res)
    }   
})

router.post("/login", (req, res) => {
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

        res.status(200).json({
            token: token,
            user: user
        })
    } catch (e) {   
        errorResponse(e, res)
    }
}) 

export default router