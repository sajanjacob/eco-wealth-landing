import axios from "axios";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_API_ACCESS_KEY
  }
});
const adminApiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY
  }
});
export default apiClient;
export { adminApiClient };