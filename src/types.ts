export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  socket: string;
  power: number;
  color_temperature: number;
  brightness: number;
  shape: string;
  description?: string;
  price: number;
  quantity: number;
  category_id: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_full_name: string;
  phone_number: string;
  total_amount: number;
  order_state_id: number;
  payment_state_id: number;
  delivery_type_id: number;
  delivery_address: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface Request {
  id: string;
  phone: string;
  client: string;
  description: string;
  status: string;
}

export interface ReferenceData {
  id: number;
  name: string;
  description?: string;
}
