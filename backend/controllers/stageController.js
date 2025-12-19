const Stage = require('../models/Stage');

exports.getAllStages = async (req, res) => {
  try {
    const stages = await Stage.findAll();
    res.json(stages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching stages' });
  }
};

exports.getStudentStages = async (req, res) => {
  try {
    const { studentId } = req.params;
    const stages = await Stage.findByStudentId(studentId);
    res.json(stages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching student stages' });
  }
};

exports.createStage = async (req, res) => {
  try {
    const stageData = req.body;

    // Validation simple
    if (!stageData.id_etudiant || !stageData.entreprise || !stageData.sujet ||
      !stageData.date_debut || !stageData.date_fin) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const stageId = await Stage.create(stageData);
    const newStage = await Stage.findById(stageId);

    res.status(201).json(newStage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating stage' });
  }
};

exports.updateStageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['en attente', 'valide', 'refuse'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const affectedRows = await Stage.updateStatus(id, status);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Stage not found' });
    }

    const updatedStage = await Stage.findById(id);
    res.json(updatedStage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating stage status' });
  }
};

exports.deleteStage = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await Stage.delete(id);

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Stage not found' });
    }

    res.json({ message: 'Stage deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting stage' });
  }
};