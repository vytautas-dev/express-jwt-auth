import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";
import authRoutes from "./routes/Auth";
import productsRoutes from "./routes/Product";
import orderRoutes from "./routes/Order";
import specialRoutes from "./routes/Special";
import passportMiddleware from "./middlewares/jwtStrategy";
import "./middlewares/jwtStrategy";
import cookieParser from "cookie-parser";
import refreshTokenRoute from "./routes/RefreshToken";

//config variables
const port = process.env.PORT;
const host = process.env.HOST;
const dbUri = process.env.DB_URI;

const app = express();

//connect to DB
mongoose
  .connect(dbUri)
  .then(() => {
    console.log("DB connected");
    startServer();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//only start the server if DB connects
const startServer = async () => {
  //cors configuration
  app.use(cors());

  //body parser middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  //passport auth initialize
  app.use(passport.initialize());
  passport.use(passportMiddleware);

  //routes
  app.use("/api/auth", authRoutes);
  app.use("/api/products", productsRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/refresh", refreshTokenRoute);

  app.use("/api/special", specialRoutes); //authorization route

  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  //unknown endpoint error handler middleware
  app.use((req: Request, res: Response) => {
    const error = new Error("Not found");
    console.error(error);
    return res.status(404).json({ message: error.message });
  });

  app.listen(port, host, () =>
    console.log(`Server is running at http//${host}:${port}`)
  );
};
