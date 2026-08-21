import { Router } from "express";
import { getAuth } from "@clerk/express";

const router = Router();

router.get("/me", (req, res) => {
  const { isAuthenticated, userId, sessionId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  res.json({
    userId,
    sessionId,
    authenticated: true,
  });
});

export default router;