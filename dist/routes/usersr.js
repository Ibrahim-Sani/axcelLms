"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersc_1 = require("../controllers/users/usersc");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.use(express_1.default.static("public"));
// ROUTER FUNCTIONS
router.get('/getAUsers', auth_1.auth, usersc_1.getAUserForm);
router.post('/getAUsers', auth_1.auth, usersc_1.getAUser);
router.post('/createUser', usersc_1.createUserData);
router.get('/createUser', usersc_1.createUserDataForm);
/* GET users listing. */
exports.default = router;
