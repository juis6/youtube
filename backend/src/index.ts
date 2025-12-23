import "dotenv/config";
import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { prisma } from "./config/database";
import authRoutes from "./routes/auth.routes";
import apiRoutes from "./routes/api.routes";
import { ErrorMiddleware } from "./middleware/error.middleware";

class Server {
  private app: Application;
  private readonly port: number;
  private readonly frontendUrl: string;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "3000", 10);
    this.frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(morgan("tiny"));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: this.frontendUrl,
        credentials: true,
      })
    );
  }

  private initializeRoutes(): void {
    this.app.get("/", (req, res) => {
      res.status(200).json({
        success: true,
        message: "YouTube Video Search API with Authentication",
      });
    });

    this.app.use("/auth", authRoutes);
    this.app.use("/api", apiRoutes);
  }

  private initializeErrorHandling(): void {
    this.app.use(ErrorMiddleware.notFound);
    this.app.use(ErrorMiddleware.handle);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server is running on http://localhost:${this.port}`);
      console.log(`📡 Frontend URL: ${this.frontendUrl}`);
    });

    process.on("SIGINT", async () => {
      console.log("\n🛑 Shutting down gracefully...");
      await prisma.$disconnect();
      process.exit(0);
    });
  }
}

const server = new Server();
server.start();
