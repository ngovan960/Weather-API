import axios from "axios";

export const getWeather = async (req, res) => {
  try {
    const cityCode = req.params.cityCode;
    console.log(cityCode);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
