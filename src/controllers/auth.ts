import { Request, Response } from "express"
import User from "../models/user";
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

async function register(request: Request, response: Response) {
    try {
        const { username, email, password } = request.body;
        const validateUsername = await User.findOne({ username });
        const validateEmail = await User.findOne({ email });
        console.log(validateEmail)
        if (!validateEmail && !validateUsername) {
            const userInfo = new User({ username, email, password });
            await userInfo.save();
            return response.status(200).send("Registered successfully")
        } else {
            return response.status(400).send("Username or email already exists")
        }
    } catch {
        return response.status(400).send("Error registering")
    }
}

async function login(request: Request, response: Response) {
    try {
        const { email, password } = request.body;
        const userInfo = await User.findOne({ email });
        console.log(userInfo?.password === password)
        if (userInfo && userInfo.password === password) {
            const data = { username: userInfo.username, email: userInfo.email }
            const token = jwt.sign(data, process.env.JWT || "", { expiresIn: '2h' });
            return response.status(200).send(token);
        } else {
            return response.status(400).send("Incorrect email or password")
        }
    } catch {
        return response.status(400).send("Incorrect email or password")
    }
}

export { auth, register, login }