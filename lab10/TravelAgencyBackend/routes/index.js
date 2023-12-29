const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: "Travel Agency Backend here!"
  });
});

module.exports = router;
