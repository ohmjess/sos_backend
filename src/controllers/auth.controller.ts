import { AuthService } from "../services/auth.service";
import { Request, Response } from "express";

export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body as { username: string, password: string };
            const user = await AuthService.login({username, password});
            res.status(200).json(user);
        } catch (error) {
            res.status(401).json({message: error});
        }
    }
}