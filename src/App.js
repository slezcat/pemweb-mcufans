import "./App.css";
import Form from "./Pages/Form";
import { Routes, Route, useNavigate } from "react-router-dom";
import Table from "./Pages/Table";
import Edit from "./Pages/Edit";
import Home from "./Pages/Home";
import React from "react";
import { Navbar } from "flowbite-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./config";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState("no user");
  const { displayName, uid, email } = user;
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => (user ? setUser(user) : setUser("")));

    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/list" element={<Table />} />
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<Form />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  );
}

export default App;
