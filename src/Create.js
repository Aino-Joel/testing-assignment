import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, author, body};

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('New Blog Added');
            setIsPending(false);
            // history.go(-1);
            // history.push('/');
        });

        
    }

    return ( 
        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={ handleSubmit }>
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
                { !isPending && <button>Add Blog</button> }
                { isPending && <button disabled>Adding Blog...</button> }
            </form>
        </div>
     );
}
 
export default Create;