import { create } from 'zustand';
import { Client } from '../types';

interface ClientsState {
  clients: Client[];
  addClient: (client: Client) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  getClientById: (id: string) => Client | undefined;
}

export const useClientsStore = create<ClientsState>((set, get) => ({
  clients: [],
  addClient: (client) => set((state) => ({ clients: [...state.clients, client] })),
  updateClient: (id, updatedClient) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === id ? { ...client, ...updatedClient } : client
      ),
    })),
  deleteClient: (id) =>
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id),
    })),
  getClientById: (id) => get().clients.find((client) => client.id === id),
}));