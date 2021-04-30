const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("./../webpack.config.js");
const compiler = webpack(config);
const app = express();
const { isAuthenticated } = require("./google-apis/google-auth");
const {
  cacheGoogleReportingData,
} = require("./models/cache/ga-reporting-cache");
const authGoogleRouter = require("./routes/authGoogleRoute");
const queryRouter = require("./routes/queryRoute");
const aboutRouter = require("./routes/aboutRoute");
const inspirationRouter = require("./routes/inspirationRoute");
const visualRouter = require("./routes/visualRoute");
const successRouter = require("./routes/successRoute");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const { v4: uuidv4 } = require("uuid");
const redis = require("redis");

const redisStore = require("connect-redis")(session);

// instantiate redis client - session store
const redisClient = redis.createClient({
  port: 6379,
  host: "localhost",
});

redisClient.on("error", (err) => {
  console.log("Redis error: ", err);
});

dotenv.config();

// set view engine to pug - template engine
app.set("view engine", "pug");
// set template directory as ./views
app.set("views", `${__dirname}/views`);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// allows access to the body object of the request
app.use(express.json());

// exposes static resources in public folder
app.use(express.static("public"));

// set express CORS options
const corsOptions = {
  origin: process.env.ORIGIN ?? "http://localhost:3000",
  optionsSuccessStatus: 200,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Accept-Language",
    "Content-Language",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// enable CORS middleware
app.use(cors(corsOptions));

// enable cookie parser plugin
app.use(cookieParser());

// add support for proxy
app.set("trust proxy", 1);

// configure http session to use Redis database as session store
app.use(
  session({
    store: new redisStore({
      client: redisClient,
    }),
    secret: "sess-secret",
    name: `sess-id-k29cn3s0`,
    resave: false,
    saveUninitialized: false,
    sameSite: true,
    cookie: {
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: true,
      maxAge: 1000 * 60 * 1440,
    },
    genid: () => uuidv4(),
  })
);

// Login/Auth route
app.use("/login", authGoogleRouter);
app.use("/success", successRouter);

// Template Routes
// add isAuth middleware to root route only, root takes care of any other routes built from root
app.use("/", isAuthenticated, visualRouter);
app.use("/inspiration", inspirationRouter);
app.use("/about", aboutRouter);

// API Cache middleware check for GA Reporting data
app.use("/api/v1/analytics", (req, res, next) => {
  res.locals.redisClient = redisClient;
  cacheGoogleReportingData(req, res, next);
});

// API routes
app.use("/api/v1/analytics", queryRouter);

module.exports = app;
