import axios from "axios";

export const getWeather = async (req, res) => {
  const redisClient = req.redisClient;
  const cityCode = req.params.cityCode;

  const cacheKey = "weather:" + cityCode;
  const time = 60 * 60 * 12;
  try {
    //Kiem tra cache trong redis
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Data from Redis Cache");
      return res.json(JSON.parse(cachedData));
    }
    console.log("Call API Weather");
    const apiKey = process.env.API_KEY;
    const baseUrl = process.env.BASE_URL;
    const apiUrl = `${baseUrl}${cityCode}?unitGroup=metric&key=${apiKey}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Luu vao redis

    await redisClient.setEx(cacheKey, time, JSON.stringify(data));

    res.json(data);
  } catch (err) {
    console.error("Error fetching weather data: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
