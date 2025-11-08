import React from "react";
import { User } from "lucide-react";

const Profile = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <User className="h-16 w-16 text-primary-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Page</h2>
        <p className="text-gray-600">
          This page is under development. You'll be able to manage your profile
          and items here.
        </p>
      </div>
    </div>
  );
};

export default Profile;
