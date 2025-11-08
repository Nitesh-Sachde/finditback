const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");
const authenticateUser = require("../middlewares/auth");
const { validateId } = require("../middlewares/validation");

// All routes require authentication
router.use(authenticateUser);

// Get all matches
router.get("/", matchController.getAllMatches);

// Get matches for user's items
router.get("/my-lost-items", matchController.getMyLostItemMatches);
router.get("/my-found-items", matchController.getMyFoundItemMatches);

// Get matches for specific items
router.get("/lost/:id", validateId, matchController.findMatchesForLostItem);
router.get("/found/:id", validateId, matchController.findMatchesForFoundItem);

module.exports = router;
