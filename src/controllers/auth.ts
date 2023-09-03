import { Request, Response } from "express"
import user from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";

async function auth(request: Request, response: Response) {
    try {
        const token = request.headers['authorization'];
        const decoded = jwt.verify(token || "", process.env.JWT || "") as JwtPayload;
        const userInfo = { username: decoded.username, email: decoded.email }
        console.log(userInfo)
        response.status(200).send(userInfo);
    } catch {
        response.status(401).send();
    }
}

async function login(request: Request, response: Response) {
    const { username, email, password } = request.body;
    const userInfo = new user({ username, email, password });
    await userInfo.save();
    const token = jwt.sign({ username, email }, process.env.JWT || "", { expiresIn: '2h' });
    return response.status(200).send(token);
}

export { auth, login }