const matchService = require("../services/matchService");

class MatchController {
  /**
   * Find matches for a specific lost item
   * GET /api/v1/matches/lost/:id
   */
  async findMatchesForLostItem(req, res, next) {
    try {
      const { minScore = 40 } = req.query;

      const result = await matchService.findMatchesForLostItem(
        req.params.id,
        parseInt(minScore)
      );

      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Find matches for a specific found item
   * GET /api/v1/matches/found/:id
   */
  async findMatchesForFoundItem(req, res, next) {
    try {
      const { minScore = 40 } = req.query;

      const result = await matchService.findMatchesForFoundItem(
        req.params.id,
        parseInt(minScore)
      );

      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all potential matches in the system
   * GET /api/v1/matches
   */
  async getAllMatches(req, res, next) {
    try {
      const { minScore = 40, limit = 50 } = req.query;

      const result = await matchService.getAllMatches(
        parseInt(minScore),
        parseInt(limit)
      );

      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get matches for current user's lost items
   * GET /api/v1/matches/my-lost-items
   */
  async getMyLostItemMatches(req, res, next) {
    try {
      const { minScore = 40 } = req.query;

      const result = await matchService.getMyLostItemMatches(
        req.user._id,
        parseInt(minScore)
      );

      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get matches for current user's found items
   * GET /api/v1/matches/my-found-items
   */
  async getMyFoundItemMatches(req, res, next) {
    try {
      const { minScore = 40 } = req.query;

      const result = await matchService.getMyFoundItemMatches(
        req.user._id,
        parseInt(minScore)
      );

      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MatchController();
