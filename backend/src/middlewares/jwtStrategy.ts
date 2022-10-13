import User from "../models/User";
import "dotenv/config";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";

const jwtSecret = process.env.JWT_SECRET;

const jwtOpts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

// create authentication strategy
export default new Strategy(jwtOpts, async (payload, done) => {
  console.log(done);
  try {
    const user = await User.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});
