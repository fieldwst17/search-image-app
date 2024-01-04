import { useState } from "react";
import "./App.css";
import Picture from "./components/picture";

function App() {
  const [word, setWord] = useState("");
  const [photos, setPhotos] = useState([]);
  const key = "S9e1dQ4bi47XQ_1ViGQ9lRa5PQiFtE2f76_n8oH3_00";

  async function searchImage(e) {
    e.preventDefault();
    if (!word) {
      alert("ป้อนชื่อรูปภาพ");
    } else {
      //เรียกใช้งาน API
      await fetchImageFromAPI();
    }
  }

  async function fetchImageFromAPI() {
    const url = `https://api.unsplash.com/search/photos?page=1&query=${word}&client_id=${key}&per_page=15`;
    const res = await fetch(url);
    const data = await res.json();
    const result = data.results;

    if (result.length == 0) {
      alert("ไม่พบภาพที่ค้นหา");
      setWord("");
    } else {
      // แสดงข้อมูลรูปภาพ
      setPhotos(result);
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
      {/* Show Image */}
      <div className="search-result">
        {photos.map((data, index) => {
          return <Picture {...data} key={index}/>;
        })}
      </div>
    </div>
  );
}

export default App;
