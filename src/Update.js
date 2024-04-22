import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const Update = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        // Fetch the existing blog data based on the ID
        fetch(`http://localhost:8000/blogs/${id}`)
            .then(response => response.json())
            .then(data => {
                setTitle(data.title);
                setBody(data.body);
                setAuthor(data.author);
            })
            .catch(error => console.error('Error fetching blog:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedBlog = { title, body, author };

        setIsPending(true);

        // Update the existing blog data
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedBlog)
        }).then(() => {
            console.log('Blog Updated');
            setIsPending(false);
            history.push('/');
        }).catch(error => {
            console.error('Error updating blog:', error);
            setIsPending(false);
        });
    }

    return (
        <div className="create">
            <h2>Update Blog</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Blog Title:</label>
                <input 
                    id='title'
                    type="text" 
                    required
                    value={ title }
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor='body'>Blog Body:</label>
                <textarea
                    id='body'
                    required
                    value={ body }
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label htmlFor='author'>Blog Author:</label>
                <input
                    id='author'
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                {!isPending && <button type='submit'>Update Blog</button>}
                {isPending && <button disabled>Updating Blog...</button>}
            </form>
        </div>
    );
}

export default Update;
