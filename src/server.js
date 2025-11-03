import express from "express";
import dotenv from "dotenv";
import weatherRoute from "./routes/weather/weatherRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/weather", weatherRoute);

app.get("/", (req, res) => {
  res.send("hello word");
});

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
