import cors from "cors";
const ACCEPTED_ORIGINS = ["http://localhost:3000"];
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
    cors({
        // metodo de cors para validar origenes
        origin: (origin, callback) => {
            // Array de rutas aceptadas
            if (acceptedOrigins.includes(origin) || !origin) {
                return callback(null, true); //<- permitimos cors y cors preflight
            }
            return callback(new Error("Not allowed by CORS"));
        },
    });
