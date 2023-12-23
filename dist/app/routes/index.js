"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const profile_routes_1 = require("../modules/profiles/profile.routes");
const user_routes_1 = require("../modules/user/user.routes");
const quiz_routes_1 = require("../modules/quizManagement/quiz.routes");
const quiz_routes_2 = require("../modules/quizTacking/quiz.routes");
const score_routes_1 = require("../modules/quizScore/score.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        routes: auth_routes_1.AuthRoutes,
    },
    {
        path: '/users',
        routes: user_routes_1.UserRoutes,
    },
    {
        path: '/profiles',
        routes: profile_routes_1.ProfileRoutes,
    },
    {
        path: '/quizzes',
        routes: quiz_routes_1.QuizManage,
    },
    {
        path: '/quizzesTack',
        routes: quiz_routes_2.QuizTacking,
    },
    {
        path: '/scores',
        routes: score_routes_1.ScoreRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
