import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import * as fs from 'fs';
import styles from '../styles/Home.module.css'
import Link from 'next/link';



export default function Home(props) {
  const [blogs, setBlogs] = useState(props.allBlogs);

  // console.log(styles)
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="keywords" content="nextjs, huntingcoder blog, hunting coder" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Script src='/sc.js' strategy="lazyOnload"></Script> */}

      <main className={styles.main}>
        <div className={styles.imagewrap}>
          {/* <Image className={styles.myImg} src="/homeimg.jfif" width={237} height={158}/> */}
          <img className={styles.myImg} src="https://media.istockphoto.com/photos/love-working-from-home-picture-id1182641010?s=612x612"  />
        </div>
       


        {/* <div className={`${styles1.con} ${styles2.con}`}> */}
        <div>
         
          <div className={styles.container}>
    <main className={styles.main}>4 <h2 className={styles.h2} >LATEST BLOG</h2>
        {blogs.map((blogitem) => {
            return <div key={blogitem.slug} className={styles.card} >
                 <h3 className={styles.blogItemh3}>{blogitem.title}</h3>
                 <img className={styles.image} src={blogitem.img} width={550} height={200} />

                <p className={styles.blogItemp}>{blogitem.metadesc.substr(0, 140)}...</p>
                <Link href={`/blogpost/${blogitem.slug}`}>
                    <button className={styles.btn}>Read more...</button>
                   </Link>
            </div>
        })}
    </main>
</div>
        </div>
      </main>

      
     
    </div>
  )
}

export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogdata");
  let myfile;
  let allBlogs = [];
  for (let index = 0; index < data.length; index++) {
      const item = data[index];
      console.log(item)
      myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
      allBlogs.push(JSON.parse(myfile))
  }

  return {
      props: { allBlogs }, // will be passed to the page component as props
  }
}