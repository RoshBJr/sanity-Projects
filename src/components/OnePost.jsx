// src/component/OnePost.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {sanityClient} from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import { AnimatePresence, motion } from "framer-motion";
import SinglePost from "./SinglePost.jsx";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function OnePost() {
  const [postData, setPostData] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
           title,
           slug,
           relatedPosts[]->{
            title,
            slug,
            mainImage {
              asset-> {
                url
              }
            }
           },
           mainImage{
           asset->{
              _id,
              url
            }
          },
          body,
          "name": author->name,
          "authorImage": author->image
       }`
      )
      .then((data) => setPostData(data[0]))
      .catch(console.error);
  }, [slug]);

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

  function singlePost(post, index) {
    return(
      <SinglePost
        key={index}
        slug={ post.slug.current}
        index={index}
        imgUrl={post.mainImage.asset.url}
        title={post.title}
      />
    )
  }

  if (!postData) return <div>Loading...</div>;

  return (
    <div className="bg-gray-200 min-h-screen p-12">
      {
        <AnimatePresence>
          <motion.div
            onClick={scrollTop}
            className={`z-50 cursor-pointer transform ${scrollPos >= 480 ? 'scale-1': 'scale-0'} duration-100 fixed right-0 bottom-0 mb-10 mr-10 p-5 bg-black rounded hover:bg-gray-700 hover:duration-200`}>
              <span className="cursive text-xl text-white">Top</span>
          </motion.div>
        </AnimatePresence> 
      }
      <div className="container shadow-lg mx-auto bg-green-100 rounded-lg">
        <div className="relative">
          <div className="absolute h-full w-full flex items-center justify-center p-8">
            <div className="hover:bg-red-100 duration-200 absolute bg-white bg-opacity-75 rounded top-0 left-0 ml-5 mt-5">
              <a href="/" className="cursive flex items-center p-2 text-2xl">
                Go Back
              </a>
            </div>
            <div className="bg-white bg-opacity-75 rounded p-12">
              <h2 className="cursive text-3xl lg:text-6xl mb-4">
                {postData.title}
              </h2>
              <div className="flex justify-center text-gray-800">
                <img
                  src={urlFor(postData.authorImage).url()}
                  className="w-10 h-10 rounded-full"
                  alt="Author is Kap"
                />
                <h4 className="cursive flex items-center pl-2 text-2xl">
                  {postData.name}
                </h4>
              </div>
            </div>
          </div>
          <img
            className="w-full object-cover object-top rounded-t"
            src={urlFor(postData.mainImage).url()}
            alt=""
            style={{ height: "400px" }}
          />
        </div>
        <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">
          <BlockContent
            blocks={postData.body}
            projectId={sanityClient.projectId}
            dataset={sanityClient.dataset}
          />
        </div>
      </div>
        <h2>Related Posts</h2>
      <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
        {
          postData.relatedPosts.map((post, index) => {
            return(
              singlePost(post, index)
            )
          })
        }
      </div>
    </div>
  );
}