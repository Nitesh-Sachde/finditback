import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search as SearchIcon, TrendingUp, Users, Package } from "lucide-react";
import { lostItemService } from "../services/lostItemService";
import { foundItemService } from "../services/foundItemService";
import ItemCard from "../components/ItemCard";
import toast from "react-hot-toast";

const Home = () => {
  const [recentLostItems, setRecentLostItems] = useState([]);
  const [recentFoundItems, setRecentFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("lost");

  useEffect(() => {
    fetchRecentItems();
  }, []);

  const fetchRecentItems = async () => {
    try {
      setLoading(true);
      const [lostResponse, foundResponse] = await Promise.all([
        lostItemService.getAllLostItems({ page: 1, limit: 6 }),
        foundItemService.getAllFoundItems({ page: 1, limit: 6 }),
      ]);

      setRecentLostItems(lostResponse.data || []);
      setRecentFoundItems(foundResponse.data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
      toast.error("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">
              Find What You've Lost
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              A community-driven platform to reunite people with their lost
              belongings
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/post"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                <Package className="mr-2 h-5 w-5" />
                Post an Item
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-all shadow-lg"
              >
                <SearchIcon className="mr-2 h-5 w-5" />
                Search Items
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
              <TrendingUp className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {recentLostItems.length + recentFoundItems.length}+
            </h3>
            <p className="text-gray-600">Active Items</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Growing</h3>
            <p className="text-gray-600">Community Members</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
              <Package className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              AI-Powered
            </h3>
            <p className="text-gray-600">Smart Matching</p>
          </div>
        </div>
      </div>

      {/* Recent Items Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Recent Items</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("lost")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "lost"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Lost Items
            </button>
            <button
              onClick={() => setActiveTab("found")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "found"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Found Items
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {activeTab === "lost" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentLostItems.length > 0 ? (
                  recentLostItems.map((item) => (
                    <ItemCard key={item._id} item={item} type="lost" />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No lost items posted yet</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentFoundItems.length > 0 ? (
                  recentFoundItems.map((item) => (
                    <ItemCard key={item._id} item={item} type="found" />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No found items posted yet</p>
                  </div>
                )}
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                to="/search"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all"
              >
                View All Items
                <SearchIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
