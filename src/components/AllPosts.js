// src/components/AllPosts.js

import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import Filter from "./Filter.jsx";
import SinglePost from "./SinglePost.jsx";

export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState(null);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
        title,
        slug,
        categories[0]{
          _ref
        },
        mainImage{
        asset->{
          _id,
          url
        }
      }
    }`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);
  
  function singlePost(post, index) {
    return <SinglePost
      key={index}
      slug={ post.slug.current}
      index={index}
      imgUrl={post.mainImage.asset.url}
      title={post.title}
    />
  }

  return (
    <div className="bg-green-100 min-h-screen p-12">
      <div className="mx-auto w-full">
        <h2 className="text-5xl flex justify-center cursive">Blog Posts</h2>
        <h3 className="text-lg text-gray-600 flex justify-center mb-12">
          Welcome to my blog posts page!
        </h3>
        <Filter setCat={setCategory}/>
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
          {allPostsData &&
            allPostsData.map((post, index) => (
              category === "all"
              ?
              singlePost(post, index)
              :
              category !== post.categories._ref
              ?
              null
              :
              singlePost(post,index)
            ))}
        </div>
      </div>
    </div>
  );
}