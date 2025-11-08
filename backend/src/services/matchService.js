const lostItemRepository = require("../repositories/lostItemRepository");
const foundItemRepository = require("../repositories/foundItemRepository");
const {
  findMatchesForLostItem,
  findMatchesForFoundItem,
  getAllMatches,
} = require("../utils/matchingAlgorithm");

class MatchService {
  /**
   * Find matches for a specific lost item
   */
  async findMatchesForLostItem(lostItemId, minScore = 40) {
    try {
      const lostItem = await lostItemRepository.findById(lostItemId);

      if (!lostItem) {
        throw new Error("Lost item not found");
      }

      if (lostItem.status !== "open") {
        throw new Error("This lost item has already been resolved");
      }

      // Get all available found items
      const foundItems = await foundItemRepository.findAvailableItems();

      // Find matches
      const matches = findMatchesForLostItem(lostItem, foundItems, minScore);

      return {
        lostItem,
        matches,
        totalMatches: matches.length,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find matches for a specific found item
   */
  async findMatchesForFoundItem(foundItemId, minScore = 40) {
    try {
      const foundItem = await foundItemRepository.findById(foundItemId);

      if (!foundItem) {
        throw new Error("Found item not found");
      }

      if (foundItem.isReturned) {
        throw new Error("This found item has already been returned");
      }

      // Get all open lost items
      const lostItems = await lostItemRepository.findOpenItems();

      // Find matches
      const matches = findMatchesForFoundItem(foundItem, lostItems, minScore);

      return {
        foundItem,
        matches,
        totalMatches: matches.length,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all potential matches in the system
   */
  async getAllMatches(minScore = 40, limit = 50) {
    try {
      // Get all open lost items and available found items
      const [lostItems, foundItems] = await Promise.all([
        lostItemRepository.findOpenItems(),
        foundItemRepository.findAvailableItems(),
      ]);

      // Find all matches
      let matches = getAllMatches(lostItems, foundItems, minScore);

      // Limit results
      if (limit && matches.length > limit) {
        matches = matches.slice(0, limit);
      }

      return {
        matches,
        totalMatches: matches.length,
        totalLostItems: lostItems.length,
        totalFoundItems: foundItems.length,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get matches for current user's lost items
   */
  async getMyLostItemMatches(userId, minScore = 40) {
    try {
      // Get user's open lost items
      const userLostItems = await lostItemRepository.findByUserId(userId);
      const openLostItems = userLostItems.items.filter(
        (item) => item.status === "open"
      );

      if (openLostItems.length === 0) {
        return {
          matches: [],
          totalMatches: 0,
        };
      }

      // Get all available found items
      const foundItems = await foundItemRepository.findAvailableItems();

      // Find matches for each lost item
      const allMatches = [];
      for (const lostItem of openLostItems) {
        const matches = findMatchesForLostItem(lostItem, foundItems, minScore);
        if (matches.length > 0) {
          allMatches.push({
            lostItem,
            matches,
          });
        }
      }

      return {
        matches: allMatches,
        totalMatches: allMatches.reduce(
          (sum, item) => sum + item.matches.length,
          0
        ),
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get matches for current user's found items
   */
  async getMyFoundItemMatches(userId, minScore = 40) {
    try {
      // Get user's available found items
      const userFoundItems = await foundItemRepository.findByUserId(userId);
      const availableFoundItems = userFoundItems.items.filter(
        (item) => !item.isReturned
      );

      if (availableFoundItems.length === 0) {
        return {
          matches: [],
          totalMatches: 0,
        };
      }

      // Get all open lost items
      const lostItems = await lostItemRepository.findOpenItems();

      // Find matches for each found item
      const allMatches = [];
      for (const foundItem of availableFoundItems) {
        const matches = findMatchesForFoundItem(foundItem, lostItems, minScore);
        if (matches.length > 0) {
          allMatches.push({
            foundItem,
            matches,
          });
        }
      }

      return {
        matches: allMatches,
        totalMatches: allMatches.reduce(
          (sum, item) => sum + item.matches.length,
          0
        ),
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new MatchService();
