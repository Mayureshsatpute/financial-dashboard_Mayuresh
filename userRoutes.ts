import express, { Request, Response } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import User from "../models/User";

const router = express.Router();

// ✅ Explicit return type of Promise<void>
router.get("/me", verifyToken, async (req: any, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

export default router;
