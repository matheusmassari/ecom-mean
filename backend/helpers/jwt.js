import { expressjwt } from "express-jwt";

async function isRevoked(req, token) {
    if (!token.payload.isAdmin) {
        return true;
    }
}

export function authJwt() {
    const secret = process.env.JWT_SECRET;
    const api = process.env.API_URL;

    return expressjwt({
        secret,
        algorithms: ["HS256"],
        isRevoked: isRevoked,
    }).unless({
        path: [
            // { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTION"] },
            // { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTION"] },
            // { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTION"] },
            // { url: `${api}/users`, methods: ["GET", "OPTION"] },
            // `${api}/users/login`,
            // `${api}/users/register`,
            { url: /(.*)/ },
        ],
    });
}
