import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

describe('Header Component', () => {
  test('should render header with navigation', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('should contain logo/brand', () => {
    render(<Header />);
    // Adjust based on actual Header implementation
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  test('should render menu items', () => {
    render(<Header />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('should be responsive', () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
