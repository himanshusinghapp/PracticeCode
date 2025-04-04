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
exports.getUsers = exports.loginUser = exports.userRegister = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const userValidation_1 = require("../validation/userValidation");
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = userValidation_1.userValidationSchema.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });
        const { name, age, email, password, phoneNumber } = req.body;
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "Email already registered" });
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newUser = new User_1.default({
            name,
            age,
            email,
            password: hashedPassword,
            phoneNumber,
        });
        yield newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.userRegister = userRegister;
//login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Login failed" });
        }
        const isPassMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPassMatch) {
            return res.status(400).json({ message: "Login failed" });
        }
        res.status(200).json({ message: "Login successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "internal server error", err });
    }
});
exports.loginUser = loginUser;
//fetch data
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.getUsers = getUsers;
