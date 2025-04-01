import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import "./App.css";

const blogPosts = [
  { id: "1", title: "React Basics", shortDescription: "Learn the fundamentals of React.", content: "React is a JavaScript library for building user interfaces..." },
  { id: "2", title: "Routing in React", shortDescription: "Understanding React Router.", content: "React Router helps in navigation between different pages in a React app..." },
  { id: "3", title: "React Hooks", shortDescription: "Explore the power of hooks in React.", content: "Hooks let you use state and lifecycle features in functional components..." },
];

const Home = () => (
  <div className="home">
    <h1>Simple Blog</h1>
    <ul>
      {blogPosts.map((post) => (
        <li key={post.id}>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
          <p>{post.shortDescription}</p>
        </li>
      ))}
    </ul>
  </div>
);

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);
  
  if (!post) {
    return <h2>404 - Post Not Found</h2>;
  }

  return (
    <div className="post">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<BlogPost />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
