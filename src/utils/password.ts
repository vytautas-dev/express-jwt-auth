import bcrypt from "bcryptjs";

// Hash password
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

// password validation
export const validPassword = async (password: string, userPassword: string) => {
  const isValid: boolean = await bcrypt.compare(password, userPassword);
  return isValid;
};
