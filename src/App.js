import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import AllPosts from "./components/AllPosts.js";
import OnePost from "./components/OnePost.jsx";

function App() {
  return (
      <div>
        <Routes>
          <Route element={<AllPosts/>} path="/" exact />
          <Route element={<OnePost/>} path="/:slug" />
        </Routes>
      </div>
  );
}
export default App;