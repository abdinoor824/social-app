import Image from "next/image";
import styles from "./postcard.module.css";
import Link from "next/link";

const PostCard = ({ post, handleDelete }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          {post.img && (
            <Image
              src={post.img}
              alt={post.title || "Post image"}
              fill
              className={styles.img}
            />
          )}
        </div>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.desc}</p>
        <Link className={styles.link} href={`/blog/${post._id}`}>
          READ MORE
        </Link>
        {/* <button
          onClick={() => handleDelete(post._id)}
          className={styles.deleteBtn}
        >
          Delete
        </button> */}
      </div>
    </div>
  );
};

export default PostCard;
