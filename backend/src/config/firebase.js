const admin = require("firebase-admin");

let firebaseApp = null;

const initializeFirebase = () => {
  try {
    // Check if already initialized
    if (firebaseApp) {
      return firebaseApp;
    }

    // Initialize with service account or environment variables
    if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
      const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      // Initialize with environment variables
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      });
    }

    console.log("✅ Firebase Admin initialized successfully");
    return firebaseApp;
  } catch (error) {
    console.error("❌ Firebase initialization error:", error.message);
    throw error;
  }
};

const getFirebaseAdmin = () => {
  if (!firebaseApp) {
    throw new Error(
      "Firebase has not been initialized. Call initializeFirebase() first."
    );
  }
  return admin;
};

module.exports = {
  initializeFirebase,
  getFirebaseAdmin,
};
