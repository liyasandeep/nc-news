import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ListRecentArticles from "./components/ListRecentArticles";
import ListAllArticles from "./components/ListAllArticles";
import ListAllTopics from "./components/ListAllTopics";
import SingleArticle from "./components/SingleArticle";

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
              <Route
                path="/articles/:article_id"
                element={<SingleArticle />}
              ></Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
