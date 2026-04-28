const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: Record<string, unknown>;
  token?: string;
}

async function apiRequest<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const fetchOptions: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  if (method === 'GET') {
    (fetchOptions as any).next = { revalidate: 60 };
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, fetchOptions);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(error.error || `Error ${response.status}`);
  }
  
  return response.json();
}

export interface User {
  email: string;
  name?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
}

export interface Product {
  id: string;
  objectID?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
}

export interface SearchResult {
  hits: Product[];
  nbHits?: number;
  total?: number;
  page?: number;
  nbPages?: number;
  offset?: number;
  limit?: number;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  productId: string;
  productName: string;
  price: number;
  status: 'pending' | 'paid' | 'failed';
  mpPreferenceId?: string;
  mpPaymentId?: string;
  mpInitPoint?: string;
  createdAt: string;
}

export interface CreateOrderResponse {
  orderId: string;
  initPoint: string;
}

export const api = {
  auth: {
    sendCode: (email: string) => 
      apiRequest<{ message: string }>('/auth', { method: 'POST', body: { email } }),
    
    verifyCode: (email: string, code: string) => 
      apiRequest<{ token: string }>('/auth/token', { method: 'POST', body: { email, code } }),
  },
  
  user: {
    getMe: (token: string) => 
      apiRequest<User>('/me', { token }),
    
    updateMe: (token: string, data: Partial<User>) => 
      apiRequest<User>('/me', { method: 'PATCH', token, body: data }),
    
    updateAddress: (token: string, address: User['address']) => 
      apiRequest<User>('/me/address', { method: 'PATCH', token, body: address }),
  },
  
  products: {
    search: (query: string, offset = 0, limit = 10) => 
      apiRequest<SearchResult>(`/search?q=${encodeURIComponent(query)}&offset=${offset}&limit=${limit}`),
    
    getById: (id: string) => 
      apiRequest<Product>(`/products/${id}`),
  },
  
  orders: {
    create: (token: string, productId: string) => 
      apiRequest<CreateOrderResponse>(`/order?productId=${productId}`, { method: 'POST', token }),
    
    getMyOrders: (token: string) => 
      apiRequest<Order[]>('/me/orders', { token }),
    
    getById: (token: string, orderId: string) => 
      apiRequest<Order>(`/order/${orderId}`, { token }),
  },
};

export default api;
