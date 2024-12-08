import { create } from 'zustand';
import { Quote, QuoteItem } from '../types';

interface QuotesState {
  quotes: Quote[];
  addQuote: (quote: Quote) => void;
  updateQuote: (id: string, quote: Partial<Quote>) => void;
  deleteQuote: (id: string) => void;
  calculateTotals: (items: QuoteItem[]) => { subtotal: number; tax: number; total: number };
}

export const useQuotesStore = create<QuotesState>((set, get) => ({
  quotes: [],
  addQuote: (quote) => set((state) => ({ quotes: [...state.quotes, quote] })),
  updateQuote: (id, updatedQuote) =>
    set((state) => ({
      quotes: state.quotes.map((quote) =>
        quote.id === id ? { ...quote, ...updatedQuote } : quote
      ),
    })),
  deleteQuote: (id) =>
    set((state) => ({
      quotes: state.quotes.filter((quote) => quote.id !== id),
    })),
  calculateTotals: (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * 0.1; // 10% tax rate
    return {
      subtotal,
      tax,
      total: subtotal + tax,
    };
  },
}));