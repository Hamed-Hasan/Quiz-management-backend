"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizTacking = void 0;
const express_1 = __importDefault(require("express"));
const quiz_controller_1 = require("./quiz.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const quiz_validation_1 = require("./quiz.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
// Apply the authentication middleware to all routes in this router
// router.use(authenticateUser);
router.get('/:id/start', 
// authenticateUser,
(0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), quiz_controller_1.QuizController.startQuiz);
router.post('/:id/submit', 
// authenticateUser,
(0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(quiz_validation_1.QuizValidationSchema.submitAnswerZodSchema), quiz_controller_1.QuizController.submitAnswer);
exports.QuizTacking = router;
