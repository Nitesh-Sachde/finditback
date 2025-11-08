import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import { formatDate, truncateText } from "../utils/helpers.js";

const ItemCard = ({ item, type = "lost", onAction }) => {
  const isLost = type === "lost";
  const itemPath = isLost ? `/lost/${item._id}` : `/found/${item._id}`;

  const getCategoryColor = (category) => {
    const colors = {
      Electronics: "bg-blue-100 text-blue-800",
      Documents: "bg-yellow-100 text-yellow-800",
      Keys: "bg-purple-100 text-purple-800",
      Bags: "bg-green-100 text-green-800",
      Wallets: "bg-red-100 text-red-800",
      Jewelry: "bg-pink-100 text-pink-800",
      Clothing: "bg-indigo-100 text-indigo-800",
      Pets: "bg-orange-100 text-orange-800",
      Other: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors.Other;
  };

  const getStatusBadge = () => {
    if (isLost) {
      return item.status === "resolved" ? (
        <span className="badge badge-success">Resolved</span>
      ) : (
        <span className="badge badge-primary">Open</span>
      );
    } else {
      return item.isReturned ? (
        <span className="badge badge-success">Returned</span>
      ) : (
        <span className="badge badge-primary">Available</span>
      );
    }
  };

  return (
    <div className="card card-hover">
      <div className="flex flex-col h-full">
        {/* Image */}
        {item.imageUrl && (
          <Link to={itemPath}>
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          </Link>
        )}

        {/* Category and Status */}
        <div className="flex items-center justify-between mb-3">
          <span className={`badge ${getCategoryColor(item.category)}`}>
            {item.category}
          </span>
          {getStatusBadge()}
        </div>

        {/* Title and Description */}
        <Link to={itemPath}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
            {item.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 flex-grow">
          {truncateText(item.description, 120)}
        </p>

        {/* Details */}
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>
              {isLost ? "Lost on" : "Found on"}{" "}
              {formatDate(isLost ? item.dateLost : item.dateFound)}
            </span>
          </div>
        </div>

        {/* Posted by */}
        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {item.userId?.profilePic ? (
              <img
                src={item.userId.profilePic}
                alt={item.userId.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
                {item.userId?.name?.substring(0, 2).toUpperCase()}
              </div>
            )}
            <span className="text-sm text-gray-600">
              Posted by <span className="font-medium">{item.userId?.name}</span>
            </span>
          </div>

          {onAction && (
            <button
              onClick={() => onAction(item)}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              View
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
