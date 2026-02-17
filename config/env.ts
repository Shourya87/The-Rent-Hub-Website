const required = (value: string | undefined, key: string) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const env = {
  MONGODB_URI: required(process.env.MONGODB_URI, "MONGODB_URI"),
  JWT_SECRET: required(process.env.JWT_SECRET, "JWT_SECRET"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  COOKIE_NAME: process.env.COOKIE_NAME || "renthub_token",
};
