const router = require("express").Router();

const authService = require("../services/authService");

const { getErrorMessage } = require('../utils/errorUtils');

const { isGuest } = require("../middlewares/authMiddeware");

router.post("/register", isGuest, async (req, res) => {
  const userData = req.body;

  try {
    const token = await authService.register(userData);
    const result = {
      token: token,
      name: userData.name,
      email: userData.email,
    }
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }
});

router.post("/login", isGuest, async (req, res) => {
  const { email, password } = req.body;

  try {
    const resData = await authService.login(email, password);

    
    res.json(resData);
  } catch (err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }
});

module.exports = router;
