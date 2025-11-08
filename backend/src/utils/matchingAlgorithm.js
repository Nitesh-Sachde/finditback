/**
 * Matching utility to find potential matches between lost and found items
 */

const DAYS_THRESHOLD = 5; // Days to consider for date proximity

/**
 * Calculate similarity score between two strings
 * Simple implementation using word matching
 */
function calculateTextSimilarity(text1, text2) {
  if (!text1 || !text2) return 0;

  const words1 = text1.toLowerCase().split(/\s+/);
  const words2 = text2.toLowerCase().split(/\s+/);

  const commonWords = words1.filter(
    (word) => words2.includes(word) && word.length > 2 // Ignore small words
  );

  // Calculate Jaccard similarity
  const union = new Set([...words1, ...words2]);
  const similarity = commonWords.length / union.size;

  return similarity;
}

/**
 * Calculate date proximity score
 * Returns 1 if dates are within threshold, decreases as distance increases
 */
function calculateDateProximity(date1, date2, threshold = DAYS_THRESHOLD) {
  const diffTime = Math.abs(new Date(date2) - new Date(date1));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= threshold) {
    return 1 - diffDays / (threshold * 2); // Score decreases with distance
  }

  return 0;
}

/**
 * Calculate location similarity
 * Exact match = 1, partial match = 0.5, no match = 0
 */
function calculateLocationSimilarity(location1, location2) {
  if (!location1 || !location2) return 0;

  const loc1 = location1.toLowerCase().trim();
  const loc2 = location2.toLowerCase().trim();

  if (loc1 === loc2) return 1;

  // Check if one location contains the other
  if (loc1.includes(loc2) || loc2.includes(loc1)) return 0.7;

  // Check for common words
  const words1 = loc1.split(/\s+/);
  const words2 = loc2.split(/\s+/);
  const commonWords = words1.filter(
    (word) => words2.includes(word) && word.length > 2
  );

  if (commonWords.length > 0) return 0.5;

  return 0;
}

/**
 * Calculate overall match score between a lost item and a found item
 */
function calculateMatchScore(lostItem, foundItem) {
  let score = 0;
  const weights = {
    category: 0.3,
    location: 0.25,
    date: 0.2,
    title: 0.15,
    description: 0.1,
  };

  // Category match (exact match required)
  if (lostItem.category === foundItem.category) {
    score += weights.category;
  } else {
    return { score: 0, breakdown: {} }; // No match if categories don't match
  }

  // Location similarity
  const locationScore = calculateLocationSimilarity(
    lostItem.location,
    foundItem.location
  );
  score += locationScore * weights.location;

  // Date proximity
  const dateScore = calculateDateProximity(
    lostItem.dateLost,
    foundItem.dateFound
  );
  score += dateScore * weights.date;

  // Title similarity
  const titleScore = calculateTextSimilarity(lostItem.title, foundItem.title);
  score += titleScore * weights.title;

  // Description similarity
  const descriptionScore = calculateTextSimilarity(
    lostItem.description,
    foundItem.description
  );
  score += descriptionScore * weights.description;

  return {
    score: Math.round(score * 100), // Convert to percentage
    breakdown: {
      category: weights.category * 100,
      location: Math.round(locationScore * weights.location * 100),
      date: Math.round(dateScore * weights.date * 100),
      title: Math.round(titleScore * weights.title * 100),
      description: Math.round(descriptionScore * weights.description * 100),
    },
  };
}

/**
 * Find matches for a lost item among found items
 */
function findMatchesForLostItem(lostItem, foundItems, minScore = 40) {
  const matches = [];

  for (const foundItem of foundItems) {
    const matchResult = calculateMatchScore(lostItem, foundItem);

    if (matchResult.score >= minScore) {
      matches.push({
        foundItem,
        matchScore: matchResult.score,
        breakdown: matchResult.breakdown,
      });
    }
  }

  // Sort by match score (descending)
  matches.sort((a, b) => b.matchScore - a.matchScore);

  return matches;
}

/**
 * Find matches for a found item among lost items
 */
function findMatchesForFoundItem(foundItem, lostItems, minScore = 40) {
  const matches = [];

  for (const lostItem of lostItems) {
    const matchResult = calculateMatchScore(lostItem, foundItem);

    if (matchResult.score >= minScore) {
      matches.push({
        lostItem,
        matchScore: matchResult.score,
        breakdown: matchResult.breakdown,
      });
    }
  }

  // Sort by match score (descending)
  matches.sort((a, b) => b.matchScore - a.matchScore);

  return matches;
}

/**
 * Get all potential matches between lost and found items
 */
function getAllMatches(lostItems, foundItems, minScore = 40) {
  const matches = [];

  for (const lostItem of lostItems) {
    for (const foundItem of foundItems) {
      const matchResult = calculateMatchScore(lostItem, foundItem);

      if (matchResult.score >= minScore) {
        matches.push({
          lostItem,
          foundItem,
          matchScore: matchResult.score,
          breakdown: matchResult.breakdown,
        });
      }
    }
  }

  // Sort by match score (descending)
  matches.sort((a, b) => b.matchScore - a.matchScore);

  return matches;
}

module.exports = {
  calculateMatchScore,
  findMatchesForLostItem,
  findMatchesForFoundItem,
  getAllMatches,
  calculateTextSimilarity,
  calculateDateProximity,
  calculateLocationSimilarity,
};
