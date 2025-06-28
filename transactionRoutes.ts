import express from "express";
import Transaction from "../models/Transaction";
import { verifyToken } from "../middlewares/authMiddleware"; // ✅

const router = express.Router();

// ✅ Add verifyToken here
router.get("/", verifyToken, async (req, res) => {
  try {
    const {
      search = "",
      category,
      status,
      user_id,
      sort = "date",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const query: any = {};

    if (search) {
      query.$or = [
        { category: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
        { user_id: { $regex: search, $options: "i" } },
      ];
    }

    if (category) query.category = category;
    if (status) query.status = status;
    if (user_id) query.user_id = user_id;

    const skip = (+page - 1) * +limit;
    const sortBy: any = {};
    sortBy[sort as string] = order === "asc" ? 1 : -1;

    const total = await Transaction.countDocuments(query);
    const transactions = await Transaction.find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(+limit);

    res.status(200).json({ total, page: +page, limit: +limit, transactions });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

export default router;
