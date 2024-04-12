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
        const updatedBlog = { title, author, body };

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
                <label>Blog Title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog Body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog Author:</label>
                <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                {!isPending && <button>Update Blog</button>}
                {isPending && <button disabled>Updating Blog...</button>}
            </form>
        </div>
    );
}

export default Update;
