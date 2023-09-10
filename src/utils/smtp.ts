import nodemailer from "nodemailer";

async function send(to: string, key: string) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Outlook',
            auth: {
                user: "dabuti.business@outlook.es",
                pass: "Dabuti123"
            }
        });

        const options = {
            from: "dabuti.business@outlook.es", to,
            subject: "Verify your account",
            text: `${process.env.CLIENT_DOMAIN}/auth/verify/${key}`,
        };

        await transporter.sendMail(options);
    } catch (error) {
        throw error
    }
};

export default { send };


