"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizManage = void 0;
const express_1 = __importDefault(require("express"));
const quiz_controller_1 = require("./quiz.controller");
const quiz_validation_1 = require("./quiz.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(quiz_validation_1.QuizValidationSchema.createQuizZodSchema), quiz_controller_1.QuizController.createQuiz);
router.put('/:id', (0, validateRequest_1.default)(quiz_validation_1.QuizValidationSchema.editQuizZodSchema), quiz_controller_1.QuizController.editQuiz);
router.delete('/:id', quiz_controller_1.QuizController.deleteQuiz);
exports.QuizManage = router;
