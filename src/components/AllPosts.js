// src/components/AllPosts.js

import React, { useEffect, useState } from "react";
import {sanityClient} from "../client.js";
import Filter from "./Filter.jsx";
import SinglePost from "./SinglePost.jsx";
import { motion, AnimatePresence } from "framer-motion";

export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState(null);
  const [displayPosts, setDisplayPosts] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
        title,
        slug,
        "categories": categories[]->title,
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
        setDisplayPosts(data);
      })
      .catch(console.error);
  }, []);
  
  const singlePost = (post, index) => {
    return (<motion.div
    exit={{scale: 0, rotate: -180}} 
    key={`${index}`} 
    initial={{  rotate: 180, scale: 0 }}
    animate={{ rotate: 0, scale: 1}} 
    transition={{ease: "easeInOut", duration: .3, bounce: "spring"}}
    >
      <SinglePost
        slug={ post.slug.current}
        index={index}
        imgUrl={post.mainImage.asset.url}
        title={post.title}
      />
    </motion.div>);
  }

  const useScrollPos = () => {
    const [scrollPos, setScrollPos] = useState(0);

    useEffect(() => {
      const updatePos = () => {
        setScrollPos(window.scrollY);
      }
      window.addEventListener("scroll", updatePos);

      return () => window.removeEventListener("scroll", updatePos);
    },[]);
    return scrollPos;
  }

  const scrollTop = () => {
    let scrlIterator = 0;
    let intId = setInterval(() => {
      if(window.scrollY == 0) return window.clearInterval(intId)
      scrlIterator++;
      window.scrollBy(0, -scrlIterator)
    }, 5)
  }

  const scrollPos = useScrollPos();


  return (
    <div className="bg-green-100 min-h-screen p-12">
        <AnimatePresence>
          <motion.div
            onClick={scrollTop}
            className={`z-50 cursor-pointer transform ${scrollPos >= 480 ? 'scale-1': 'scale-0'} duration-100 fixed right-0 bottom-0 mb-10 mr-10 p-5 bg-black rounded hover:bg-gray-700 hover:duration-200`}>
              <span className="cursive text-xl text-white">Top</span>
          </motion.div>
        </AnimatePresence> 

      <div className="mx-auto w-full">
        <h2 className="text-5xl flex justify-center cursive">
          Historical Figures
        </h2>
        <h3 className="mt-5 text-center text-xl text-gray-600 flex justify-center mb-12">
          Welcome and read about these intriguing Characters!
        </h3>
        <Filter 
          allPostsData={allPostsData}
          setDisplayPosts={setDisplayPosts}
        />
          <div
            className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            <AnimatePresence>
              {
                displayPosts && 
                displayPosts.map((post, index) => {
                  return singlePost(post,index)
                })
              }
            </AnimatePresence>
          </div>

      </div>
    </div>
  );
}