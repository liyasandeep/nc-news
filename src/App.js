import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";
// import * as API from "./api";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ListRecentArticles from "./components/ListRecentArticles";
import ListAllArticles from "./components/ListAllArticles";
import ListAllTopics from "./components/ListAllTopics";

function App() {
  const [user, setUser] = useState("tickle122");

  return (
    <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<ListRecentArticles />}></Route>
              <Route path="/articles" element={<ListAllArticles />}></Route>
              <Route
                path="/topics/:topicName"
                element={<ListAllArticles />}
              ></Route>
              <Route path="/topics" element={<ListAllTopics />}></Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
