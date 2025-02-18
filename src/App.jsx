import React from "react";
import Home from "./pages/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import "./App.css";

export default function App() {
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
}
