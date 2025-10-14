// routes/authRoutes.ts
import { Router, Request, Response } from "express";
import passport from "../auth/googleAuth";

const router = Router();

// start Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: true,
  }),
  (req: Request, res: Response) => {
    // Successful auth — redirect to profile/dashboard
    res.redirect("/profile");
  }
);

// logout
router.get("/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    // In older passport typings, logout may not take callback; this supports callback style.
    if (err) console.error(err);
    req.session.destroy((e) => {
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });
});

export default router;
