import { Request, Response } from "express"
import User from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

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

        //validate inputs
        const validateUsername = /^[a-zA-Z0-9_]{8,20}$/.test(username);
        const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,50}$/.test(password);

        if (!validateUsername || !validateEmail || !validatePassword) {
            return response.status(500).send("Invalid credentials")
        }

        //validate database
        const usernameExists = await User.findOne({ username });
        const emailExists = await User.findOne({ email });

        if (usernameExists || emailExists) {
            return response.status(400).send("Username or email already exists");
        }

        const hashed = await bcrypt.hash(password, 10);
        const userInfo = new User({ username, email, password: hashed });
        await userInfo.save();
        return response.status(200).send("Registered successfully")
    } catch {
        return response.status(500).send("Error registering")
    }
}

async function login(request: Request, response: Response) {
    try {
        const { email, password } = request.body;

        //validate inputs
        if (!email || !password) {
            return response.status(500).send("Invalid credentials")
        }

        //validate database
        const userInfo = await User.findOne({ email });
        const isValid = await bcrypt.compare(password, userInfo?.password || "");

        if (!userInfo || !isValid) {
            return response.status(400).send("Incorrect email or password");
        }

        const data = { username: userInfo.username, email: userInfo.email }
        const token = jwt.sign(data, process.env.JWT || "", { expiresIn: '2h' });
        return response.status(200).send(token);
    } catch {
        return response.status(500).send("Error loging in")
    }
}

export { auth, register, login }