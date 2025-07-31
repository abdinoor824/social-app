import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Creative Thoughts Agency.</h1>
        <p className={styles.desc}>
         we transform abstract ideas into captivating realities. Our passion for innovation meets a deep understanding of storytelling, design, and strategy. Whether you're launching a brand, refreshing your identity, or dreaming big—we're here to make it happen.
        </p>
        <div className={styles.buttons}>
          <Link href="/create" className={styles.button}>Create Post</Link>
        
          {/* <button className={styles.button}>Learn More</button> */}
          <button className={styles.button}>Contact</button>
        </div>
        <div className={styles.brands}>
          <Image src="/brands.png" alt="" fill className={styles.brandImg}/>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/hero.gif" alt="" fill className={styles.heroImg}/>
      </div>
    </div>
  );
};

export default Home;
