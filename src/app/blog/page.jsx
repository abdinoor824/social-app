'use client';

import React, { useEffect, useState } from "react";
import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/post");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      const res = await fetch("/api/post", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      const result = await res.json();
      if (!res.ok) {
        alert("Failed to delete: " + result.message);
      } else {
        setPosts((prev) => prev.filter((post) => post._id !== postId));
        alert("Post deleted.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <div className={styles.post} key={post._id}>
            <PostCard post={post}  />
          </div>
        ))
      ) : (
        <p>No blog posts found.</p>
      )}
    </div>
  );
};

export default BlogPage;
