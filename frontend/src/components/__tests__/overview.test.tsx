import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import Overview from '../Overview';

// Mock axios before importing Overview
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const queryClient = new QueryClient();

describe('Overview', () => {
  it('renders fetched summary data', async () => {
    const mockData = {
      total: 1000,
      avg: 200,
      monthly: [{ month: 'Jan', total: 1000 }],
      topCategories: [{ name: 'Food', total: 1000 }]
    };

    // Mock the API response
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    render(
      <QueryClientProvider client={queryClient}>
        <Overview />
      </QueryClientProvider>
    );

    // Wait for the "Total spent" text to appear
    expect(await screen.findByTestId('total-spent')).toBeInTheDocument();

    // Check that data rendered correctly
    expect(await screen.findByTestId('totals-by-category')).toBeInTheDocument();
    expect(await screen.findByTestId('overview-chart')).toBeInTheDocument();
  });
});
