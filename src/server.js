import express from "express";
import dotenv from "dotenv";
import weatherRoute from "./routes/weather/weatherRoute.js";
import { createClient } from "redis";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const redisClient = createClient({
  url: `redis://${process.env.REDIS_URL}:${process.env.REDIS_PORT}`,
});

redisClient
  .connect()
  .then(() => console.log("Connected to Redis"))
  .catch((err) => console.log("Redis connection error: ", err));

app.use((req, res, next) => {
  req.redisClient = redisClient;
  next();
});
app.use("/weather", weatherRoute);

app.get("/", (req, res) => {
  res.send("hello word");
});

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
