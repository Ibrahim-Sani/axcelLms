"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexc_1 = require("../controllers/books/indexc");
const router = express_1.default.Router();
router.use(express_1.default.static("public"));
// ROUTER FUNCTIONS
/* GET home page. */
router.get('/', indexc_1.getHomePage);
router.get('/getAllBooks', indexc_1.getAllBooks);
router.post("/bookDetails", indexc_1.bookDetails);
router.get('/createBook', indexc_1.createBokoForm);
router.post('/createBook', indexc_1.createBook);
router.post("/updateBookdetail", indexc_1.updateBook);
router.post("/updateBook", indexc_1.updateBookForm);
router.post("/deleteBook", indexc_1.deleteBook);
exports.default = router;
