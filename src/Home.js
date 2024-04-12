import React, { useState } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const {
    data: blogs,
    isLoading,
    error,
  } = useFetch("http://localhost:8000/blogs");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const results = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
    console.log(searchResults)
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="home">
      <div>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {searchResults.length === 0 && <div>{blogs && <BlogList blogs={blogs} title="All Blogs!" />}</div>}
      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((blog, index) => (
              <li key={index}>{blog.title}</li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
