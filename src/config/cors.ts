import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (origin === process.env.CLIENT_DOMAIN) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by cors policy"));
        }
    },
};

export default corsOptions;