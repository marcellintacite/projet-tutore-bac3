import { base_url } from "@/data/url";
import axios from "axios";

const axiosCon = axios.create({
  // baseURL: base_url,
  baseURL: "https://ratio-nais-desc-22-23.onrender.com",
});

export default axiosCon;
