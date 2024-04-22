import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Home from '../src/Home';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../src/useFetch', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    data: [
      { id: 1, title: 'First Blog' },
      { id: 2, title: 'Second Blog' },
      { id: 3, title: 'Third Blog' }
    ],
    isLoading: false,
    error: null
  }))
}));

describe('Home component', () => {
  it('should filter blogs when searching by title', async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const searchInput = screen.getByPlaceholderText('Search by title...');
    fireEvent.change(searchInput, { target: { value: 'Second' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('Second Blog')).toBeInTheDocument();
      expect(screen.queryByText('First Blog')).not.toBeInTheDocument();
      expect(screen.queryByText('Third Blog')).not.toBeInTheDocument();
    });
  });

  it('should display "No results found" message when no matching blogs found', async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const searchInput = screen.getByPlaceholderText('Search by title...');
    fireEvent.change(searchInput, { target: { value: 'Non-existent' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('No results found.')).toBeInTheDocument();
    });
  });
});
