import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    }
  })
  return axiosInstance;
}

export default axiosWithAuth;