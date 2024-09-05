"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const history_controller_1 = __importDefault(require("../controllers/history.controller"));
const router = express_1.default.Router();
router.post('/', history_controller_1.default.createHistory);
router.get('/', history_controller_1.default.getHistory);
exports.default = router;
