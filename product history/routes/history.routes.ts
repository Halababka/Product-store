import express from 'express';
import historyController from "../controllers/history.controller";

const router = express.Router();

router.post('/', historyController.createHistory);
router.get('/', historyController.getHistory);

export default router;