const User = require("../models/User");

class UserRepository {
  /**
   * Create a new user
   */
  async create(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find user by Firebase UID
   */
  async findByUid(uid) {
    try {
      return await User.findOne({ uid });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find user by email
   */
  async findByEmail(email) {
    try {
      return await User.findOne({ email: email.toLowerCase() });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find user by ID
   */
  async findById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update user by UID
   */
  async updateByUid(uid, updateData) {
    try {
      return await User.findOneAndUpdate(
        { uid },
        { ...updateData, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete user by UID
   */
  async deleteByUid(uid) {
    try {
      return await User.findOneAndDelete({ uid });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all users (for admin purposes)
   */
  async findAll(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const users = await User.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await User.countDocuments();

      return {
        users,
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
}

module.exports = new UserRepository();
