const LostItem = require("../models/LostItem");

class LostItemRepository {
  /**
   * Create a new lost item
   */
  async create(itemData) {
    try {
      const item = new LostItem(itemData);
      return await item.save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find lost item by ID
   */
  async findById(id) {
    try {
      return await LostItem.findById(id).populate(
        "userId",
        "name email phone profilePic"
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find all lost items with pagination and filters
   */
  async findAll(filters = {}, page = 1, limit = 10) {
    try {
      const query = this._buildQuery(filters);
      const skip = (page - 1) * limit;

      const items = await LostItem.find(query)
        .populate("userId", "name email phone profilePic")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await LostItem.countDocuments(query);

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
   * Find lost items by user ID
   */
  async findByUserId(userId, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const items = await LostItem.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await LostItem.countDocuments({ userId });

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
   * Update lost item
   */
  async update(id, userId, updateData) {
    try {
      return await LostItem.findOneAndUpdate(
        { _id: id, userId },
        { ...updateData, updatedAt: Date.now() },
        { new: true, runValidators: true }
      ).populate("userId", "name email phone profilePic");
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete lost item
   */
  async delete(id, userId) {
    try {
      return await LostItem.findOneAndDelete({ _id: id, userId });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search lost items
   */
  async search(searchTerm, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const items = await LostItem.find(
        { $text: { $search: searchTerm }, status: "open" },
        { score: { $meta: "textScore" } }
      )
        .populate("userId", "name email phone profilePic")
        .sort({ score: { $meta: "textScore" } })
        .skip(skip)
        .limit(limit);

      const total = await LostItem.countDocuments({
        $text: { $search: searchTerm },
        status: "open",
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
   * Find open lost items for matching
   */
  async findOpenItems() {
    try {
      return await LostItem.find({ status: "open" }).populate(
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

    if (filters.status) {
      query.status = filters.status;
    } else {
      query.status = "open"; // Default to open items
    }

    if (filters.dateFrom || filters.dateTo) {
      query.dateLost = {};
      if (filters.dateFrom) {
        query.dateLost.$gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        query.dateLost.$lte = new Date(filters.dateTo);
      }
    }

    return query;
  }
}

module.exports = new LostItemRepository();
