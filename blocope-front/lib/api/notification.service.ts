const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://blocbackfront.onrender.com/bloc/api';

export const notificationService = {
  async getAll(page?: number, limite?: number) {
    const res = await fetch(`${API_URL}/notifications-cpa?page=${page || 1}&limite=${limite || 10}`, {
      headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
  },
  async getUnreadCount() {
    const res = await fetch(`${API_URL}/webhook-notification/unread/count`, {
      headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
  },
};
