import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
type rateLimitRequest = {
  time: number;
  limit: number;
};
const createBasicRateLimiting = ({
  time,
  limit,
}: rateLimitRequest): RateLimitRequestHandler => {
  return rateLimit({
    windowMs: time, // 15 minutes
    limit: limit, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
  });
};

export { createBasicRateLimiting };
