import { useState } from "react";
import "./App.css";
import Picture from "./components/Picture";

function App() {
  const [word, setWord] = useState("");
  const [photos, setPhotos] = useState([]);
  async function searchImage(e) {
    e.preventDefault();
    if (!word) {
      alert("ป้อนชื่อรูปภาพ");
    } else {
      //เรียกใช้งาน API
      await fetchImageFromAPI();
      console.log(import.meta.env);
    }
  }

  async function fetchImageFromAPI() {
    const url = `${import.meta.env.VITE_API_URL}?page=1&query=${word}&client_id=${import.meta.env.VITE_API_KEY}&per_page=15`;
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
