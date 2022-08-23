import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";

function PublicRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PublicRoutes;
