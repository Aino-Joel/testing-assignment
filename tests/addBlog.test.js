import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import Create from '../src/Create';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: jest.fn() }), 
}));

describe('Create component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with input fields', async() => {
    const { getByLabelText } = await act(async () => {
      return render(<Create />);
    });

    expect(getByLabelText('Blog Title:')).toBeInTheDocument();
    expect(getByLabelText('Blog Body:')).toBeInTheDocument();
    expect(getByLabelText('Blog Author:')).toBeInTheDocument();
  });

  test('updates state variables on user input', async() => {
    const { getByLabelText } = await act(async () => {
      return render(<Create />);
    });

    fireEvent.change(getByLabelText('Blog Title:'), { target: { value: 'Test Title' } });
    fireEvent.change(getByLabelText('Blog Body:'), { target: { value: 'Test Body' } });
    fireEvent.change(getByLabelText('Blog Author:'), { target: { value: 'Test Author' } });

    expect(getByLabelText('Blog Title:').value).toBe('Test Title');
    expect(getByLabelText('Blog Body:').value).toBe('Test Body');
    expect(getByLabelText('Blog Author:').value).toBe('Test Author');
  });

  test('submits form with correct data', async () => {
    const mockFetch = jest.fn(() => Promise.resolve());
    global.fetch = mockFetch;

    const historyMock = createMemoryHistory();
    jest.spyOn(historyMock, 'push');

    const { getByLabelText, getByText } = await act(async () => {
      return render(<Create />);
    });

    fireEvent.change(getByLabelText('Blog Title:'), { target: { value: 'Test Title' } });
    fireEvent.change(getByLabelText('Blog Body:'), { target: { value: 'Test Body' } });
    fireEvent.change(getByLabelText('Blog Author:'), { target: { value: 'Test Author' } });

    await act(async () => {
      fireEvent.click(getByText('Add Blog'));
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith('http://localhost:8000/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('"title":"Test Title","author":"Test Author","body":"Test Body"'),
        });
      });
    });

    expect(mockFetch).toHaveBeenCalled();
    // expect(mockFetch).not.toHaveBeenCalledTimes(0);
    // expect(mockFetch).toHaveBeenLastCalledWith();
    await waitFor(() => expect(window.location.pathname).toBe('/'));
  });

  // test('disables submit button when isPending is true', async() => {
  //   const { getByText } = render(<Create />);
  //   fireEvent.click(getByText('Add Blog'));
  //   expect(getByText('Adding Blog...')).toBeDisabled();
  // });
});
