"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.creatData = exports.getAllData = void 0;
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// UTILITY FUNCTIONS 
const getAllData = (pathFile) => {
    const result = fs_1.default.readFileSync(pathFile, "utf-8");
    return JSON.parse(result);
};
exports.getAllData = getAllData;
const creatData = (pathFile, data) => {
    const stringData = JSON.stringify(data, null, 2);
    fs_1.default.writeFileSync(pathFile, stringData);
};
exports.creatData = creatData;
const verifyToken = async (token, secret = "shhhhh") => {
    const decoded = await jsonwebtoken_1.default.verify(token, secret);
    return decoded;
};
exports.verifyToken = verifyToken;
