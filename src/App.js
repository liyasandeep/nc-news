import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ListRecentArticles from "./components/ListRecentArticles";
import ListAllArticles from "./components/ListAllArticles";

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
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
