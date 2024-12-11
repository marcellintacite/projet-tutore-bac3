import { base_url } from "@/data/url";
import axios from "axios";

const axiosCon = axios.create({
  // baseURL: base_url,
  baseURL: base_url,
});

export default axiosCon;
