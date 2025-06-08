import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Posts } from "./posts";
import { Post } from "./post";
import { HeaderGlobal } from "../components/Header/HeaderGlobal";

const AppRoutes = () => {
  return (
    
      <Routes>
        <Route exact path="/" element={<Posts />} />
        <Route exact path="/pokemon/:name" element={<Post/>}/>
      </Routes>
    
  );
};

export { AppRoutes };
