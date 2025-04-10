import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import CreateUser from "./components/CreateUser";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/edit/:id" element={<EditUser />} />
      <Route path="/create" element={<CreateUser />} />
    </Routes>
  );
};

export default App;
