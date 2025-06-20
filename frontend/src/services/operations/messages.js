import { apiConnector } from "../apiConnector";
import { messagesEndpoints } from "../apis";
const {
FETCH_INBOX_MESSAGES,
FETCH_SENT_MESSAGES
} = messagesEndpoints;

export const fetchInboxMessages = async (token) => {
    try {
      const response = await apiConnector("GET", FETCH_INBOX_MESSAGES, null, {
        Authorization: `Bearer ${token}`,
      });
      return response?.data?.data;
    } catch (error) {
      console.error("FETCH_INBOX_MESSAGES ERROR", error);
      return [];
    }
  };

  // services/operations/messages.js
export const fetchSentMessages = async (token) => {
  try {
    const response = await apiConnector("GET", FETCH_SENT_MESSAGES, null, {
      Authorization: `Bearer ${token}`,
    });

    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching sent messages", error);
    return [];
  }
};
