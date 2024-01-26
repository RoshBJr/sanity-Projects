// src/components/AllPosts.js

import React, { useEffect, useState } from "react";
import {sanityClient} from "../client.js";
import Filter from "./Filter.jsx";
import SinglePost from "./SinglePost.jsx";
import { motion, AnimatePresence } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};
  
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "category"]| order(title){
          _id,
          title
      }`
  ).then(data => {
      setCategory(data[0]._id);
  }).catch(console.error);

    sanityClient
      .fetch(
        `*[_type == "post"]{
        title,
        slug,
        "categories": categories[]->_id,
        mainImage{
        asset->{
          _id,
          url
        }
      }
    }`
      )
      .then((data) => {
        setAllPosts(data);
      })
      .catch(console.error);
  }, []);
  
  function singlePost(post, index) {
    
    return <motion.div className="" exit={{scale: 0}} key={`${index}`} initial={{  rotate: 180, scale: 0 }}
    animate={{ rotate: 0, scale: 1}} transition={{ease: "easeInOut", duration: .4, bounce: "spring"}}
    >
      <SinglePost
        slug={ post.slug.current}
        index={index}
        imgUrl={post.mainImage.asset.url}
        title={post.title}
      />
    </motion.div>
  }

  return (
    <div className="bg-green-100 min-h-screen p-12">
      <div className="mx-auto w-full">
        <h2 className="text-5xl flex justify-center cursive">
          Historical Figures
        </h2>
        <h3 className="text-xl text-gray-600 flex justify-center mb-12">
          Welcome and read about these intriguing Characters!
        </h3>
        <Filter setCat={setCategory}/>
          <div
            className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            <AnimatePresence>
              {allPostsData &&
                allPostsData.map((post, index) => (
                  post.categories.includes(category)
                  ?
                  singlePost(post,index)
                  :
                  ""
                ))}
              </AnimatePresence>
          </div>

      </div>
    </div>
  );
}