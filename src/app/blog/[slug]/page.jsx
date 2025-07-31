'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./singlepost.module.css";

const SinglePostPage = ({ params }) => {
 const id = params.slug;
  const { data: session } = useSession();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/${id}`);
        const data = await res.json();
        setPost(data);
        console.log("Fetched post:", data);
console.log("Image path:", data.img);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch("/api/post", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: id }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Failed to delete post.");
      } else {
        alert("Post deleted.");
        router.push("/blog");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting post");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  const isOwner = session?.user?.id === post.userId;

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        {post.img && (
        <Image
  src={post.img}
  alt={post.title}
  fill
  className={styles.img}
  unoptimized
/>
        )}
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Image
            src={session?.user?.image || "/avator.png"}
            alt="Author"
            width={50}
            height={50}
            className={styles.avatar}
          />
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Author</span>
            <span className={styles.detailValue}>{session?.user?.name || "Unknown"}</span>
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>

        {isOwner && (
          <button
            className={styles.deleteBtn}
            onClick={handleDelete}
            style={{
              background: "crimson",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              marginTop: "20px",
              cursor: "pointer",
            }}
          >
            Delete Post
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePostPage;
