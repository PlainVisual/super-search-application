import axios from "axios";

async function checkServer() {
  try {
    const response = await axios.get('https://frontend-educational-backend.herokuapp.com/api/test/all');
    console.log('Server is running:', response.data);
    return true;
  } catch (error) {
    console.error('Error checking server:', error);
    return false;
  }
}

export { checkServer };