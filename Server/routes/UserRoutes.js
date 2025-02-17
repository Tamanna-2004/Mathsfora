const express = require('express');
const { getUser, setUser, deleteUser, getSingleUser, getUserProfile } = require('../Controller/UserController');
const router = express.Router();

router.get("/", getUser);
router.post("/register", setUser);
router.delete("/register/:id",deleteUser);
router.post("/login", getSingleUser);
router.get("/user/:id", getUserProfile);


module.exports = router;