export const apiConfig = {
  baseURL: 'https://aqa-course-project.app/',
  endpoints: {
    Login: '/api/login/',
    Products: '/api/products/',
    'Product By Id': (id: string) => `/api/products/${id}/`,
    Customers: 'api/customers/',
    'Get Customer By Id': (id: string) => `api/customers/${id}/`,
    'Get Order By Id': (id: string) => `api/orders/${id}/`,
    'Order Delivery': 'api/orders/delivery/',
    'Order Receive': 'api/orders/receive/',
    'Order Status': 'api/orders/status',
    'Order Comments': 'api/orders/comments',
  },
};
