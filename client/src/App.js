import React from 'react';
// We use Route in order to define the different routes of our application
// import { useNavigate } from "react-router";
import { Route, Routes} from "react-router-dom";
 // We import all the components we need in our app
import Navbar from "./components/navbar";
import Login from "./components/login";
import Admin from "./components/admin"
import AgentList from "./components/agentList";
import Edit from "./components/edit";
import Create from "./components/create";
import Transaction from "./components/transaction";
import UnauthorizedPage from "./components/unauthorized";
import SessionTokenValidator from './components/sessionTokenValidator';
const StaticHTML = () => {
  return <iframe title="home" src="/home.html" overflow="hidden" border="0" width="100%" height="800px" align-self="center " position="absolute" top="0" left="0"></iframe>
}
const App = () => {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<StaticHTML />} />
        <Route exact path="/authenticate" element={<Login />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route exact path="/admin" element={<SessionTokenValidator><Admin /></SessionTokenValidator>} />
            <Route path="/admin/list" element={<SessionTokenValidator><AgentList /></SessionTokenValidator>} />
            <Route path="/admin/edit/:id" element={<SessionTokenValidator><Edit /></SessionTokenValidator>} />
            <Route path="/admin/create" element={<SessionTokenValidator><Create /></SessionTokenValidator>} />
            <Route path="/admin/transaction" element={<SessionTokenValidator><Transaction /></SessionTokenValidator>} />
      </Routes>
    </div>
  );
};



export default App;
