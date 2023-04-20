"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserData = exports.createUserDataForm = exports.getAUser = exports.getAUserForm = void 0;
const uuid_1 = require("uuid");
const indexU_1 = require("../../utils/users/indexU");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// C-O-N-T-R-O-L-E-R FUNCTION
//
const path = require('path');
const saltRounds = 10;
//FUNCTION FOR GET ALL USERS COMING FROM THE getAllData Function IN UTILITY
// GET REQUEST FOR WHEN USER LOGS IN
const getAUserForm = (req, res, next) => {
    res.render("login");
};
exports.getAUserForm = getAUserForm;
const getAUser = (req, res, next) => {
    const allUsers = (0, indexU_1.getAllData)("users.json");
    const { password, Username } = req.body;
    const existingUserName = allUsers.find((e) => e.UserName === Username);
    if (!existingUserName) {
        return res.send({
            message: "THIS USER DOSE NOT EXIST"
        });
    }
    allUsers.forEach((e) => {
        if (Username === e.UserName) {
            // bcrypt.compare(password, e.password, function (err, result) {
            const result = bcrypt_1.default.compareSync(password, e.password);
            if (result) {
                const token = jsonwebtoken_1.default.sign(e, 'shhhhh');
                const data = {
                    "message": "login successful",
                    "logedUser": e,
                    "Token": token
                };
                res.redirect("/book/getAllBooks");
            }
            else {
                res.send("error");
            }
            // });
        }
    });
};
exports.getAUser = getAUser;
//FUNCTION FOR CREATING users COMING FROM THE creatData Function IN UTILITY
const createUserDataForm = (req, res, next) => {
    res.render("signup");
};
exports.createUserDataForm = createUserDataForm;
const createUserData = (req, res, next) => {
    const allUsers = (0, indexU_1.getAllData)("users.json");
    const existingUserName = allUsers.find((e) => e.UserName === req.body.UserName);
    const existingUserMail = allUsers.find((e) => e.Email === req.body.email);
    if (existingUserName || existingUserMail) {
        return res.send({
            message: `User with the Name ${req.body.UserName}  And Email ${req.body.email} already exists`
        });
    }
    const { password, UserName, email } = req.body;
    // bcrypt.hash(password, saltRounds, (err, hash) => {
    // if (err){
    //     console.log(err);
    //     return err;
    // }
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    const hash = bcrypt_1.default.hashSync(password, salt);
    const newChunk = {
        "id": (0, uuid_1.v4)(),
        "UserName": UserName,
        "Email": email,
        "password": hash,
        "createdAt": new Date(),
        "updatedAt": new Date()
    };
    const token = jsonwebtoken_1.default.sign(newChunk, 'shhhhh');
    allUsers.push(newChunk);
    (0, indexU_1.creatData)("users.json", allUsers);
    const wittoken = {
        "allUsers": allUsers,
        "token": token
    };
    res.redirect("/book/getAllBooks");
    // });
};
exports.createUserData = createUserData;
