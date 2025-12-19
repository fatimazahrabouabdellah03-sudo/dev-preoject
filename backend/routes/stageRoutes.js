const express = require('express');
const router = express.Router();
const stageController = require('../controllers/stageController');

// Routes pour les stages
router.get('/', stageController.getAllStages);
router.get('/student/:studentId', stageController.getStudentStages);
router.post('/', stageController.createStage);
router.put('/:id/status', stageController.updateStageStatus);
router.delete('/:id', stageController.deleteStage);

module.exports = router;