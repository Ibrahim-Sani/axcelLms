"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const indexU_1 = require("../utils/users/indexU");
const auth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        console.log(req.headers);
        console.log("Token", authorization);
        if (authorization === undefined)
            throw new Error("no auth");
        const token = authorization.split(" ")[1];
        if (!token || token === "") {
            return res.status(401).send({
                status: "error",
                path: req.url,
                method: req.method,
                data: "Access denied",
            });
        }
        const decoded = await (0, indexU_1.verifyToken)(token);
        if ("user" in req) {
            req.user = decoded;
        }
        return next();
    }
    catch (err) {
        console.log(err);
    }
    next();
};
exports.auth = auth;
