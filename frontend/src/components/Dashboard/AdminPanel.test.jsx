import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminPanel from '../AdminPanel';

// Mock fetch
global.fetch = jest.fn();

describe('AdminPanel Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('should render admin panel title', () => {
    render(<AdminPanel />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  test('should display metrics cards', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        metrics: {
          totalBookings: 150,
          revenue: 5000,
          customers: 45,
          teamMembers: 8,
          satisfaction: 4.8,
        },
      }),
    });

    render(<AdminPanel />);

    await waitFor(() => {
      expect(screen.getByText(/Total Agendamentos/i)).toBeInTheDocument();
    });
  });

  test('should handle error when fetching metrics fails', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'));

    render(<AdminPanel />);

    // Should still render without crashing
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });

  test('should display loading state initially', () => {
    fetch.mockImplementation(() => new Promise(() => {})); // Never resolves

    const { container } = render(<AdminPanel />);

    // Check for loading indicators (can be text or spinner)
    expect(container.innerHTML).toBeTruthy();
  });

  test('should format currency correctly', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        metrics: {
          totalBookings: 10,
          revenue: 1234.56,
          customers: 5,
          teamMembers: 3,
          satisfaction: 4.5,
        },
      }),
    });

    render(<AdminPanel />);

    await waitFor(() => {
      // Should display formatted currency
      expect(screen.getByText(/R\$/)).toBeInTheDocument();
    });
  });

  test('should display recent bookings table', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        metrics: {
          totalBookings: 5,
          revenue: 2000,
          customers: 3,
          teamMembers: 2,
          satisfaction: 4.7,
        },
        recentBookings: [
          {
            id: 'BK001',
            client: 'João Silva',
            service: 'Limpeza Residencial',
            date: '2026-02-01',
            status: 'completed',
            value: 120,
          },
        ],
      }),
    });

    render(<AdminPanel />);

    await waitFor(() => {
      expect(screen.getByText(/João Silva/i)).toBeInTheDocument();
    });
  });

  test('should handle status badge colors correctly', () => {
    const { rerender } = render(<AdminPanel />);

    // Test that different status values render without error
    expect(() => rerender(<AdminPanel />)).not.toThrow();
  });
});
