// auth/googleAuth.ts
import passport from "passport";
import { Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

interface User {
  id: string;
  displayName: string;
  emails?: { value: string }[];
  photos?: { value: string }[];
  provider: string;
}

// Simple in-memory user store (for demo). Replace with DB in production.
const userStore = new Map<string, User>();

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  const user = userStore.get(id) || null;
  done(null, user);
});

const clientID = process.env.GOOGLE_CLIENT_ID!;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
const callbackURL = process.env.CALLBACK_URL!;

if (!clientID || !clientSecret || !callbackURL) {
  console.warn("Missing Google OAuth env variables. Check .env");
}

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL,
    },
    (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
      try {
        // Basic user object
        const user: User = {
          id: profile.id,
          displayName: profile.displayName,
          emails: profile.emails,
          photos: profile.photos,
          provider: profile.provider,
        };

        // Save in memory store (or upsert to DB here)
        userStore.set(profile.id, user);

        return done(null, user);
      } catch (err) {
        return done(err as any, undefined);
      }
    }
  )
);

export default passport;
export { userStore, User };
