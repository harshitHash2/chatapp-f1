import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
// import Search from "./components/Search";
import Signup from "./components/Signup";
import Test from "./components/Test";
import Search from "./components/Search";
import UserProfile from "./components/UserProfile";
import SearchUser from "./components/SearchUser";
import AllChats from "./components/AllChats";
import ChatScreen from "./components/ChatScreen";
// import UserProfile from "./components/UserProfile";

function App() {
  return (
    
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/signup" element={<Signup />}>
            {" "}
          </Route>
          <Route exact path="/login" element={<Login />}>
            {" "}
          </Route>
          {/* <Route exact path="/" element={<Test />}> */}
          <Route exact path="/" element={<Test />}>
            {" "}
          </Route>
          <Route exact path="/search" element={<Search />}>
            {" "}
          </Route>
          <Route exact path="/profile" element={<UserProfile />}>
            {" "}
          </Route>
          <Route exact path="/searchuser" element={<SearchUser />}>
            {" "}
          </Route>
          <Route exact path="/allchats" element={<AllChats />}>
            {" "}
          </Route>
          <Route exact path="/chatting" element={<ChatScreen />}>
            {" "}
          </Route>
        </Routes>
      </Router>
      </div>
      );
    
  
}

export default App;
