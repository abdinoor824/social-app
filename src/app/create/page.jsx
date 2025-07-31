"use client";

import React, { useEffect, useState } from 'react';
import styles from "./create.module.css";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const CreatePost = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/login");
    }
  }, [isLoading, session, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  const formData = new FormData();
  formData.append("title", title);
  formData.append("desc", desc);
  if (image) formData.append("image", image);

  try {
    const res = await fetch("/api/post",  {
      method: "POST",
      body: formData,
       cache: "no-store" ,
    });

    const result = await res.json(); // Try to parse the response


    if (!res.ok) {
      console.error("Error creating post:", result.error || result.message);
      alert(`Error: ${result.error || result.message}`);
    } else {
      router.push("/blog");
      console.log("Post created successfully:", result);
      alert("Post created successfully!");
    }
  } catch (err) {
    console.error("Network or parsing error:", err);
    alert("Something went wrong. Please try again.");
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Create Post</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            name="desc"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            required
          />
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="image">
            <span className={styles.fileLabel}>Upload Image</span>
            {image && <span style={{ marginLeft: 8 }}>{image.name}</span>}
          </label>
          {imagePreview && (
            <div style={{ marginTop: 16 }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: 8 }}
              />
            </div>
          )}
          <button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;