import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
dotenv.config();  // Load .env

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,   // use env variable
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: "http://localhost:5000/auth/github/callback",
    },
    (_accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: any) => void) => {
      console.log("✅ GitHub Profile:", profile);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});
