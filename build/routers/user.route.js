"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authJwt_1 = __importDefault(require("../middlewares/authJwt"));
class UserRoute {
    constructor() {
        this.router = express_1.Router();
        this.authJWT();
        this.info();
        this.getAll();
        this.userDetail();
    }
    authJWT() {
        this.router.use(authJwt_1.default.authentication);
    }
    info() {
        this.router.get('/info/:userID', user_controller_1.default.info);
    }
    getAll() {
        this.router.get('/', user_controller_1.default.home);
    }
    userDetail() {
        this.router.get('/detail', user_controller_1.default.getUserDetail);
    }
}
exports.default = new UserRoute().router;
