import { Routes, Route } from "react-router-dom";
import AppBar from "./AppBar";
import BiblioData from "./BiblioData";
import Config from "./Config";
import Form from "./Form";

export default function Root() {
  return (
    <div>
      <AppBar />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/config" element={<Config />} />
        <Route path="/" element={<BiblioData />} />

      </Routes>
    </div>
  );
}
