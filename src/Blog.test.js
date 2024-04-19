// import React from 'react';
// import { render, fireEvent, waitFor, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import Home from './Home';

// describe('Home', () => {
//   test('handles search correctly', () => {
//     const blogs = [
//       { title: 'First Blog', author: 'Author1', body: '...' },
//       { title: 'Second Blog', author: 'Author2', body: '...' }
//     ];
//     const setSearchResults = jest.fn();
//     render(<Home />);
    
//     fireEvent.change(screen.getByPlaceholderText('Search by title...'), { target: { value: 'First' } });
//     fireEvent.click(screen.getByText('Search'));
    
//     expect(setSearchResults).toHaveBeenCalledWith([blogs[0]]);
//   });

//   test('renders search results correctly', async () => {
//     const blogs = [
//       { title: 'First Blog', author: 'Author1', body: '...' },
//       { title: 'Second Blog', author: 'Author2', body: '...' }
//     ];
//     jest.spyOn(global, 'fetch').mockResolvedValueOnce({ json: () => ({ blogs }) });
//     render(<Home />);
    
//     fireEvent.change(screen.getByPlaceholderText('Search by title...'), { target: { value: 'First' } });
//     fireEvent.click(screen.getByText('Search'));
    
//     await waitFor(() => {
//       expect(screen.getByText('First Blog')).toBeInTheDocument();
//       expect(screen.queryByText('Second Blog')).not.toBeInTheDocument();
//     });
//   });

//   test('handles search button click', () => {
//     const setSearchResults = jest.fn();
//     render(<Home />);
    
//     fireEvent.change(screen.getByPlaceholderText('Search by title...'), { target: { value: 'First' } });
//     fireEvent.click(screen.getByText('Search'));
    
//     expect(setSearchResults).toHaveBeenCalled();
//   });
// });



// Importing components to test and necessary utilities
import Create from "./Create";
import Update from "./Update";
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
    fetchMock.enableMocks();
});

// Your test code here

describe('Blog Functions', () => {
  // Test for adding a new blog
  test('adds a new blog', async () => {
    // Render the component
    const { getByLabelText, getByText } = render(<Create />);

    // Simulate user input
    fireEvent.change(getByLabelText('Blog Title:'), { target: { value: 'Test Blog' } });
    fireEvent.change(getByLabelText('Blog Body:'), { target: { value: 'Test Content' } });
    fireEvent.change(getByLabelText('Blog Author:'), { target: { value: 'Test Author' } });

    // Trigger the form submission
    fireEvent.click(getByText('Add Blog'));

    // Wait for the API call to resolve
    await waitFor(() => expect(window.location.pathname).toBe('/'));
  });

  // // Test for updating a blog
  // test('updates an existing blog', async () => {
  //   // Mock the fetch response
  //   fetch.mockResolvedValueOnce({
  //     json: () => Promise.resolve({ id: 1, title: 'Updated Blog', content: 'Updated Content' }),
  //   });

  //   // Call the function to update a blog
  //   const updatedBlog = await Update(1, 'Updated Blog', 'Updated Content');

  //   // Assert the result
  //   expect(updatedBlog).toEqual({ id: 1, title: 'Updated Blog', content: 'Updated Content' });
  // });

  // Test for deleting a blog
  // test('deletes an existing blog', async () => {
  //   // Mock the API response
  //   deleteBlog.mockResolvedValue(true);

  //   // Call the function to delete a blog
  //   const isDeleted = await deleteBlog(1);

  //   // Assert the result
  //   expect(isDeleted).toBe(true);
  // });

  // // Test for searching a blog
  // test('searches for a blog', async () => {
  //   // Mock the API response
  //   searchBlog.mockResolvedValue([{ id: 1, title: 'Test Blog', content: 'Test Content' }]);

  //   // Call the function to search for a blog
  //   const searchResults = await searchBlog('Test');

  //   // Assert the result
  //   expect(searchResults).toEqual([{ id: 1, title: 'Test Blog', content: 'Test Content' }]);
  // });
});
