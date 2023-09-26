import axios from "axios";

const axiosCon = axios.create({
  baseURL: "http://192.168.0.101:8000",
});

export default axiosCon;
