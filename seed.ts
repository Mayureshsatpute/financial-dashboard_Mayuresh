// // src/utils/seed.ts
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import fs from "fs";
// import path from "path";
// import Transaction from "../models/Transaction";

// dotenv.config();

// const filePath = path.join(__dirname, "../../../transactions.json");
// const rawData = fs.readFileSync(filePath, "utf-8");
// const transactions = JSON.parse(rawData);

// const seedDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI as string);
//     console.log("✅ MongoDB connected for seeding");

//     await Transaction.deleteMany({});
//     console.log("🗑️ Old transactions deleted");

//     await Transaction.insertMany(transactions);
//     console.log("✅ Transactions seeded successfully");
//     process.exit();
//   } catch (err) {
//     console.error("❌ Seeding failed:", err);
//     process.exit(1);
//   }
// };

// seedDB();



import mongoose from "mongoose";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Transaction from "../models/Transaction";
 // ✅ model relative to src/utils

dotenv.config(); // ✅ Load .env

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connected to MongoDB");

    // Clear existing transactions
    await Transaction.deleteMany({});
    console.log("🧹 Cleared old data");

    // Load JSON file from backend root
    const dataPath = path.join(__dirname, "../../transactions.json");
    const transactions = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    // Insert into MongoDB
    await Transaction.insertMany(transactions);
    console.log(`🌱 Inserted ${transactions.length} transactions`);

    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedData();
