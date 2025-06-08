export const environmentConfig = {
  NODE_ENV: process.env.NODE_ENV as string,
  PORT: process.env.PORT || (8000 as number),
  MONGODB_CONNECTION_STRING: process.env.CONNECTION_STRING as string,
};

export default environmentConfig;
