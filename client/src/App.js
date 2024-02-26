import React from 'react';
// We use Route in order to define the different routes of our application
// import { useNavigate } from "react-router";
import { Route, Routes, useLocation } from "react-router-dom";
 // We import all the components we need in our app
import Navbar from "./components/navbar";
import Login from "./components/login"
import RecordList from "./components/agentList";
import Edit from "./components/edit";
import Create from "./components/create";
import UnauthorizedPage from "./components/unauthorized";
const StaticHTML = () => {
  return <iframe title="home" src="/home.html" overflow="hidden" border="0" width="100%" height="800px" align-self="center " position="absolute" top="0" left="0"></iframe>
}
const App = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const isLoggedIn = localStorage.getItem("token");
  // const isAdminPage = location.pathname.startsWith('/admin');
  
  // if (!isLoggedIn && isAdminPage) {
  //   navigate("/authenticate");
  // }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<StaticHTML />} />
        <Route exact path="/authenticate" element={<Login />} />
        <Route exact path="/admin" element={<RecordList />} />
        <Route path="/admin/edit/:id" element={<Edit />} />
        <Route path="/admin/create" element={<Create />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </div>
  );
};



export default App;
