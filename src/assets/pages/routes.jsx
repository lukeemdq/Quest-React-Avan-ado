import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Posts } from "./posts";
import { Post } from "./post";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Posts />} />
        <Route exact path="/pokemon/:name" element={<Post/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
