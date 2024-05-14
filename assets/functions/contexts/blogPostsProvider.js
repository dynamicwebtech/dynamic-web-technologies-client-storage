/**
 *
 *  This is the Blog Posts Provider context
 *
 */

import React, { createContext, useContext, useState, useEffect } from "react";

const BlogPostsContext = createContext();

export const BlogPostsProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch("/api/getBlogPosts");
      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data);
      } else {
        console.error("Failed to fetch blog posts");
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  return (
    <BlogPostsContext.Provider value={blogPosts}>
      {children}
    </BlogPostsContext.Provider>
  );
};

export const useBlogPosts = () => useContext(BlogPostsContext);
