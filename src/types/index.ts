export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
}

export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Quote {
  id: string;
  clientId: string;
  number: string;
  date: string;
  dueDate: string;
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'declined';
  notes?: string;
}