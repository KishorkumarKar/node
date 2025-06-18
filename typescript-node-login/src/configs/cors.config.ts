import cors from "cors";

const corsConfig = () => {
  var whitelist = ["http://example1.com", "http://example2.com"];
  return cors({
    origin: function (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Range"],
    credentials: true, // if this enable to send cookies
    preflightContinue: false,
    maxAge: 600, // this will cache preflight response for 10 mint -> avoid sending response multiple time
    optionsSuccessStatus: 204,
  });
};

export default corsConfig;
