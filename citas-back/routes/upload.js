const router = require('express').Router();
const cloudService = require('../services/cloudService');

router.post('/upload', async (req, res) => {
  try {
    const file = req.file; // normalmente gestionado por multer u otro middleware
    const result = await cloudService.upload(file);
    res.send({ url: result.url });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).send({ error: 'Error subiendo archivo', details: err.message });
  }
});

module.exports = router;