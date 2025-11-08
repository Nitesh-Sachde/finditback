const FoundItem = require("../models/FoundItem");

class FoundItemRepository {
  /**
   * Create a new found item
   */
  async create(itemData) {
    try {
      const item = new FoundItem(itemData);
      return await item.save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find found item by ID
   */
  async findById(id) {
    try {
      return await FoundItem.findById(id).populate(
        "userId",
        "name email phone profilePic"
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find all found items with pagination and filters
   */
  async findAll(filters = {}, page = 1, limit = 10) {
    try {
      const query = this._buildQuery(filters);
      const skip = (page - 1) * limit;

      const items = await FoundItem.find(query)
        .populate("userId", "name email phone profilePic")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await FoundItem.countDocuments(query);

      return {
        items,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find found items by user ID
   */
  async findByUserId(userId, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const items = await FoundItem.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await FoundItem.countDocuments({ userId });

      return {
        items,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update found item
   */
  async update(id, userId, updateData) {
    try {
      return await FoundItem.findOneAndUpdate(
        { _id: id, userId },
        { ...updateData, updatedAt: Date.now() },
        { new: true, runValidators: true }
      ).populate("userId", "name email phone profilePic");
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete found item
   */
  async delete(id, userId) {
    try {
      return await FoundItem.findOneAndDelete({ _id: id, userId });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search found items
   */
  async search(searchTerm, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const items = await FoundItem.find(
        { $text: { $search: searchTerm }, isReturned: false },
        { score: { $meta: "textScore" } }
      )
        .populate("userId", "name email phone profilePic")
        .sort({ score: { $meta: "textScore" } })
        .skip(skip)
        .limit(limit);

      const total = await FoundItem.countDocuments({
        $text: { $search: searchTerm },
        isReturned: false,
      });

      return {
        items,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find available found items for matching
   */
  async findAvailableItems() {
    try {
      return await FoundItem.find({ isReturned: false }).populate(
        "userId",
        "name email phone profilePic"
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Build query from filters
   */
  _buildQuery(filters) {
    const query = {};

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.location) {
      query.location = new RegExp(filters.location, "i");
    }

    if (filters.isReturned !== undefined) {
      query.isReturned = filters.isReturned;
    } else {
      query.isReturned = false; // Default to available items
    }

    if (filters.dateFrom || filters.dateTo) {
      query.dateFound = {};
      if (filters.dateFrom) {
        query.dateFound.$gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        query.dateFound.$lte = new Date(filters.dateTo);
      }
    }

    return query;
  }
}

module.exports = new FoundItemRepository();
