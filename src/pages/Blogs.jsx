import React from 'react';

const Blogs = () => {
  // Sample data to make the page look realistic
  const blogPosts = [
    { id: 1, title: 'Getting Started with Reactsss', excerpt: 'Learn the basics of components and hooks.' },
    { id: 2, title: 'Bootstrap Tips', excerpt: 'How to use utility classes for rapid UI development.' },
    { id: 3, title: 'Modern Web Design', excerpt: 'Exploring the latest trends in 2026.' }
  ];

  return (
    <div className="container py-5">
      {/* Header Section */}
      <header className="pb-3 mb-4 border-bottom">
        <h1 className="display-4 fw-bold text-dark">
          Blogs page is working
        </h1>
      </header>

      {/* Hero Section */}
      <div className="p-5 mb-4 bg-primary text-white rounded-3 shadow">
        <div className="container-fluid py-5">
          <h2 className="display-6 fw-bold">Welcome to the Feed</h2>
          <p className="col-md-8 fs-4">
            Browse through our latest articles and technical insights. 
            Everything here is styled with Bootstrap utility classes.
          </p>
          <button className="btn btn-outline-light btn-lg" type="button">
            Read Featured Post
          </button>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="row align-items-md-stretch">
        {blogPosts.map((post) => (
          <div key={post.id} className="col-md-4 mb-4">
            <div className="h-100 p-4 bg-light border rounded-3 shadow-sm">
              <h3>{post.title}</h3>
              <p className="text-muted">{post.excerpt}</p>
              <button className="btn btn-sm btn-outline-secondary" type="button">
                View details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer-style section */}
      <footer className="pt-3 mt-4 text-muted border-top">
        &copy; 2026 My React App
      </footer>
    </div>
  );
};

export default Blogs;


// export default function Blogs() {
//   return (
//     <div className="container mt-4">
//       <h2>Blogs Page</h2>
//     </div>
//   );
// }