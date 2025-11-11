import api from './api';

export const orderService = {
  // Create order from cart
  createOrder: async (paymentMethod = 'COD', address = '') => {
    try {
      const response = await api.post('/order/createOrder', {
        payment_method: paymentMethod,
        address,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get user orders
  getMyOrders: async () => {
    try {
      const response = await api.get('/order/myOrders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },
};

