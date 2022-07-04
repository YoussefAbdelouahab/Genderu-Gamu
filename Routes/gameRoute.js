import express from 'express';
import gameController from '../Controllers/gameController.js';
const router = express.Router();

//All Routes here will start with /game due to line 45 in index.js
router.get('/', gameController.getName)

export default router;