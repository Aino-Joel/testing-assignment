import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../src/Home';
import Navbar from '../src/Navbar'

// jest.mock('../src/useFetch');

describe('Home Component', () => {
  test('renders search input and button', () => {
    render(<Home />);
    const searchInput = screen.getByPlaceholderText('Search by title...');
    const searchButton = screen.getByText('Search');

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('renders new blog button', () => {
    render(<Navbar />);
    const newBlog = screen.getByRole('link', { name: /new blog/i });
    expect(newBlog).toBeInTheDocument();
  });

  test('renders Heading', () => {
    render(<Navbar />);
    const headingElement = screen.getByRole('heading', { name: /the alpha blog/i });
    expect(headingElement).toBeInTheDocument();
  });

  test('renders homelink', () => {
    render(<Navbar />);
    const homelinkElement = screen.getByRole('link', { name: /home/i });
    expect(homelinkElement).toBeInTheDocument();
  });
});
