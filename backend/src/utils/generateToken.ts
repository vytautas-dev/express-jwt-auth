import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;
const refreshJwtSecret = process.env.REFRESH_JWT_SECRET;

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "30s",
  });
};

// Generate RefreshJWT
export const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id }, refreshJwtSecret, {
    expiresIn: "1d",
  });
};