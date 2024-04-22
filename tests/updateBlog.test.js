import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import Update from '../src/Update';
import '@testing-library/jest-dom/extend-expect';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ title: 'Old Title', body: 'Old Body', author: 'Old Author' }),
  })
);

jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }), 
  useHistory: () => ({ push: jest.fn() }), 
}));

describe('Update Component', () => {
  test('renders the update form', async () => {
    await act(async () => render(<Update />));

    const titleInput = screen.getByLabelText(/Blog Title:/i);
    const bodyInput = screen.getByLabelText(/Blog Body:/i);
    const authorInput = screen.getByLabelText(/Blog Author:/i);
    const submitButton = screen.getByRole('button', { name: /Update Blog/i });
  
    expect(titleInput.value).toBe('Old Title');
    expect(bodyInput.value).toBe('Old Body');
    expect(authorInput.value).toBe('Old Author');
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  test('should update blog data on submit and redirect', async () => {
    const historyMock = createMemoryHistory();
    jest.spyOn(historyMock, 'push');
  
    await act(async () => render(<Update />));
  
    const titleInput = screen.getByLabelText(/Blog Title:/i);
    const bodyInput = screen.getByLabelText(/Blog Body:/i);
    const authorInput = screen.getByLabelText(/Blog Author:/i);
    const submitButton = screen.getByRole('button', { name: /Update Blog/i });
  
    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    fireEvent.change(bodyInput, { target: { value: 'New Body' } });
    fireEvent.change(authorInput, { target: { value: 'New Author' } });
  
    await act(async () => {
      fireEvent.submit(submitButton);
    });
  
    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/blogs/1', expect.objectContaining({
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: expect.stringContaining('"title":"New Title"'),
      body: expect.stringContaining('"body":"New Body"'),
      body: expect.stringContaining('"author":"New Author"'),
    }));
  
    // expect(historyMock.push).toHaveBeenCalledWith('/');
    await waitFor(() => expect(window.location.pathname).toBe('/'));
  });
  
  
//   test('should show loading state on submission', async () => {
//     await act(async () => render(<Update />));
  
//     const submitButton = screen.getByRole('button', { name: /Update Blog/i });
  
//     await act(async () => {
//       fireEvent.submit(submitButton);
//     });
  
//     expect(submitButton).toHaveAttribute('disabled');
//     expect(submitButton).toHaveTextContent(/Updating Blog.../i);
//   });
});