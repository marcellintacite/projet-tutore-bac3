import axios from "axios";

const axiosCon = axios.create({
  // baseURL: "http://192.168.100.33:8000",
  baseURL: "https://ratio-nais-desc-22-23.onrender.com",
});

export default axiosCon;
