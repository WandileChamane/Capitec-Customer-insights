import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import Transactions from '../Transactions';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Helper to create a new QueryClient for each test
const createTestClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

describe('Transactions Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    const queryClient = createTestClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Transactions />
      </QueryClientProvider>
    );

    expect(screen.getByText(/loading transactions/i)).toBeInTheDocument();
  });

  it('renders transactions table after data loads', async () => {
    const mockData = {
      total: 2,
      data: [
        {
          id: '1',
          date: '2025-10-10T00:00:00Z',
          merchant: 'Capitec ATM',
          category: 'Withdrawals',
          amount: 500.5,
        },
        {
          id: '2',
          date: '2025-10-11T00:00:00Z',
          merchant: 'Pick n Pay',
          category: 'Groceries',
          amount: 250.0,
        },
      ],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const queryClient = createTestClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Transactions />
      </QueryClientProvider>
    );

    // Wait until table rows are rendered
    await waitFor(() => expect(screen.getByText(/capitec atm/i)).toBeInTheDocument());

    // Assertions
    expect(screen.getByText(/transactions/i)).toBeInTheDocument();
    expect(screen.getByText(/pick n pay/i)).toBeInTheDocument();
    expect(screen.getByText(/withdrawals/i)).toBeInTheDocument();
    expect(screen.getByText(/zar 500\.50/i)).toBeInTheDocument();
    expect(screen.getByText(/showing 2 of 2/i)).toBeInTheDocument();
  });

  it('handles pagination button clicks', async () => {
    const mockPage1 = { total: 1, data: [{ id: '1', date: '2025-10-12', merchant: 'Checkers', category: 'Groceries', amount: 150.0 }] };
    const mockPage2 = { total: 1, data: [{ id: '2', date: '2025-10-13', merchant: 'Woolworths', category: 'Groceries', amount: 200.0 }] };

    // Mock the first two calls for pages 0 and 1
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockPage1 })
      .mockResolvedValueOnce({ data: mockPage2 });

    const queryClient = createTestClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Transactions />
      </QueryClientProvider>
    );

    // Wait for first page
    await waitFor(() => expect(screen.getByText(/checkers/i)).toBeInTheDocument());

    // Click next to load page 2
    fireEvent.click(screen.getByText(/next/i));

    await waitFor(() => expect(screen.getByText(/woolworths/i)).toBeInTheDocument());
  });
});
