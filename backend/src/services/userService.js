const userRepository = require("../repositories/userRepository");

class UserService {
  /**
   * Create or update user profile
   */
  async createOrUpdateUser(userData) {
    try {
      // Check if user already exists
      const existingUser = await userRepository.findByUid(userData.uid);

      if (existingUser) {
        // Update existing user
        const updatedUser = await userRepository.updateByUid(
          userData.uid,
          userData
        );
        return {
          user: updatedUser,
          isNew: false,
        };
      }

      // Create new user
      const newUser = await userRepository.create(userData);
      return {
        user: newUser,
        isNew: true,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user profile by UID
   */
  async getUserByUid(uid) {
    try {
      const user = await userRepository.findByUid(uid);
      if (!user) {
        throw new Error("User not found");
      }
      return user.getPublicProfile();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user profile by ID
   */
  async getUserById(id) {
    try {
      const user = await userRepository.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user.getPublicProfile();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateUser(uid, updateData) {
    try {
      // Don't allow updating uid or email
      delete updateData.uid;
      delete updateData.email;

      const updatedUser = await userRepository.updateByUid(uid, updateData);

      if (!updatedUser) {
        throw new Error("User not found");
      }

      return updatedUser.getPublicProfile();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete user account
   */
  async deleteUser(uid) {
    try {
      const deletedUser = await userRepository.deleteByUid(uid);

      if (!deletedUser) {
        throw new Error("User not found");
      }

      return { message: "User deleted successfully" };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all users (admin function)
   */
  async getAllUsers(page, limit) {
    try {
      return await userRepository.findAll(page, limit);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
