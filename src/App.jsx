import { useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");

  function searchImage(e) {
    e.preventDefault();
    if (!word) {
      alert("ป้อนชื่อรูปภาพ");
    } else {
      //เรียกใช้งาน API
      console.log(word);
    }
  }
  return (
    <div>
      <h1>Search Image API</h1>
      <form onSubmit={searchImage}>
        <input
          type="text"
          placeholder="image name"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default App;
