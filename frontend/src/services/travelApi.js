import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Sends the user query to the FastAPI backend travel agent endpoint.
 * @param {string} query - The travel request query entered by the user.
 * @returns {Promise<{response: string}>} - The agent's response object.
 */
export const askTravelAssistant = async (query) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/travel`, {
      query,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Unable to connect to Travel Assistant service. Please verify backend is running.');
  }
};
