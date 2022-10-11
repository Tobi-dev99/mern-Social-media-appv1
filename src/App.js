import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Profile from "./pages/Profile/Profile";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import UserLayout from "./pages/UsersLayout/UserLayout";
import Home from "./pages/home/Home";
import RequireAuth from "./components/RequireAuth";
import Search from "./pages/Search/Search";
import SelectedUser from "./pages/SelectedUser/SelectedUser";
import EditProfile from "./pages/Profile/EditProfile/EditProfile";
import CreatePost from "./pages/Profile/CreatePost/CreatePost";
import EditPost from "./components/Posts/Post/EditPost/EditPost";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/create" element={<CreatePost />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
          <Route path="search" element={<Search />} />
          <Route path="home" element={<Home />} />
          <Route path="user/:userId" element={<SelectedUser />} />
        </Route>
        <Route path="/user" element={<UserLayout />}></Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
