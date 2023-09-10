import { Request, Response } from "express"
import User from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcrypt";
import smtp from "../utils/smtp";
import crypto from "crypto";

const client = new OAuth2Client();

async function auth(request: Request, response: Response) {
    try {
        const token = request.headers['authorization'];
        const decoded = jwt.verify(token || "", process.env.JWT || "") as JwtPayload;
        const userInfo = { username: decoded.username, email: decoded.email }
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

        if (usernameExists && usernameExists.type === "standard") {
            return response.status(400).send("This username is already in use");
        }

        if (emailExists) {
            return response.status(400).send("This email is already in use");
        }

        //generate key and send mail
        const buffer = crypto.randomBytes(32);
        const key = buffer.toString("hex");
        await smtp.send(email, key);

        //generate pass and save to database
        const hashed = await bcrypt.hash(password, 10);
        const userInfo = new User({ type: "standard", username, email, key, password: hashed });
        await userInfo.save();

        return response.status(200).send("We have sent you a verification email (check spam)")
    } catch {
        return response.status(500).send("Internal error")
    }
}

async function username(request: Request, response: Response) {
    try {
        const { username } = request.params;

        const exists = await User.findOne({ username });

        if (exists && exists.type === "standard") {
            return response.status(400).send("This username is already in use")
        }

        return response.sendStatus(200);
    } catch {
        return response.status(500).send("Internal error")
    }
}

async function verify(request: Request, response: Response) {
    try {
        const { key } = request.params;

        const keyExists = await User.findOne({ key });

        if (keyExists && keyExists.verified === false) {
            await User.findOneAndUpdate({ key }, { $unset: { key: 1 }, $set: { verified: true } });
            return response.sendStatus(200);
        } else {
            return response.sendStatus(400)
        }
    } catch {
        return response.status(500).send("Internal error")
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

        if (!userInfo || userInfo.verified === false) {
            return response.status(400).send("Incorrect email");
        };

        if (userInfo.type !== "standard") {
            return response.status(400).send("This account is registered by Google");
        };

        const isValid = await bcrypt.compare(password, userInfo.password || "");

        if (!isValid) {
            return response.status(400).send("Incorrect password");
        };

        const data = { username: userInfo.username, email: userInfo.email }
        const token = jwt.sign(data, process.env.JWT || "", { expiresIn: '2h' });
        return response.status(200).send(token);
    } catch {
        return response.status(500).send("Internal error")
    }
}

async function google(request: Request, response: Response) {
    try {
        const { credential } = request.body;

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT
        });

        const payload = ticket.getPayload();

        if (payload) {
            const { name, email } = payload;

            const emailExists = await User.findOne({ email });

            if (emailExists && emailExists.type !== "google") {
                return response.status(400).send("This account is registered by email and password")
            }

            if (!emailExists) {
                const userInfo = new User({ type: "google", username: name, email });
                await userInfo.save();
            }

            const token = jwt.sign({ username: name, email }, process.env.JWT || "", { expiresIn: '2h' });
            return response.status(200).send(token);
        } else {
            return response.status(400).send("Google error")
        }
    } catch {
        return response.status(500).send("Internal error");
    }
}

export { auth, register, username, verify, login, google };