import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useQuotesStore } from '../../store/quotes.store';
import { useClientsStore } from '../../store/clients.store';
import { Quote, QuoteItem, Client } from '../../types';

export function QuoteForm() {
  const navigate = useNavigate();
  const { addQuote, calculateTotals } = useQuotesStore();
  const { clients } = useClientsStore();
  const [clientId, setClientId] = useState('');
  const [items, setItems] = useState<QuoteItem[]>([]);

  const addItem = () => {
    const newItem: QuoteItem = {
      id: crypto.randomUUID(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, updates: Partial<QuoteItem>) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updates };
          updated.amount = updated.quantity * updated.rate;
          return updated;
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { subtotal, tax, total } = calculateTotals(items);
    const quote: Quote = {
      id: crypto.randomUUID(),
      clientId,
      number: `QT-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      items,
      subtotal,
      tax,
      total,
      status: 'draft',
    };
    addQuote(quote);
    navigate('/quotes');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700">Client</label>
        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Item
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, { description: e.target.value })}
                  placeholder="Description"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="w-24">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(item.id, { quantity: parseInt(e.target.value) })
                  }
                  placeholder="Qty"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  min="1"
                />
              </div>
              <div className="w-32">
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) =>
                    updateItem(item.id, { rate: parseFloat(e.target.value) })
                  }
                  placeholder="Rate"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="w-32">
                <input
                  type="number"
                  value={item.amount}
                  readOnly
                  className="block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Quote
        </button>
      </div>
    </form>
  );
}