"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, hash_password } = req.body;
            const user = yield user_model_1.default.findOne({ email: email });
            const secret = process.env.SECRET_TOKEN_KEY;
            if (!user)
                return res.status(500).send({ message: "User not found" });
            const matchPasswords = bcrypt_1.default.compareSync(hash_password, user.hash_password);
            if (!matchPasswords)
                return res.status(500).send({ message: "Invalid password" });
            const token = jsonwebtoken_1.default.sign({ username: user.username }, process.env.SECRET_TOKEN_KEY, { expiresIn: "1h" });
            res.header("Authorization", `Bearer ${token}`);
            res.status(200).send({ user: user });
        }
        catch (err) {
            console.error(err);
            return res.status(500).send({ message: "Something went wrong when sending sampleData to your mongoDB: " + err });
        }
    });
}
exports.signin = signin;
