import React from 'react';
import { Link } from 'react-router-dom';
import { useQuotesStore } from '../../store/quotes.store';
import { useClientsStore } from '../../store/clients.store';
import { Quote as QuoteIcon, Users, PlusCircle, TrendingUp } from 'lucide-react';

export function Dashboard() {
  const { quotes } = useQuotesStore();
  const { clients } = useClientsStore();

  const totalRevenue = quotes.reduce((sum, quote) => sum + quote.total, 0);
  const pendingQuotes = quotes.filter((quote) => quote.status === 'sent').length;

  const stats = [
    {
      name: 'Total Quotes',
      value: quotes.length,
      icon: QuoteIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Clients',
      value: clients.length,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      name: 'Pending Quotes',
      value: pendingQuotes,
      icon: TrendingUp,
      color: 'bg-yellow-500',
    },
    {
      name: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${stat.color} rounded-md p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Quotes</h2>
            <Link
              to="/quotes/new"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Quote
            </Link>
          </div>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {quotes.slice(0, 5).map((quote) => (
                <li key={quote.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {quote.number}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        ${quote.total.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          quote.status === 'accepted'
                            ? 'bg-green-100 text-green-800'
                            : quote.status === 'sent'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {quote.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Clients</h2>
            <Link
              to="/clients/new"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Client
            </Link>
          </div>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {clients.slice(0, 5).map((client) => (
                <li key={client.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {client.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {client.email}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}