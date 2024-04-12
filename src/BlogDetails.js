import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const BlogDetails = () => {
    const { id } = useParams();
    const { data:blog, error, isLoading } = useFetch('http://localhost:8000/blogs/'+id);
    const history = useHistory();

    const handleClick = () => {
        fetch('http://localhost:8000/blogs/'+ blog.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/')
        })
    }

    return ( 
        <div className="blog-details">
            { isLoading && <div>Loading...</div>}
            { error && <div>{error}</div>}
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written By: { blog.author }</p>
                    <div>{ blog.body }</div>
                    <button onClick={handleClick}>Delete</button>
                    <Link to={`/blogs/${id}/update`}><button>Update</button></Link>
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;