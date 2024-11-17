import { useState } from "react";
import ImageSearch from "./components/ImageSearch/ImageSearch";
import { TypeAnimation } from "react-type-animation";

import "./App.css";

function App() {
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [showTypeAnimation, setTypeAnimation] = useState(true);

  return (
    <>
      <div>
        {showTypeAnimation && (
          <>
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed once, initially
                "Search For \nMajestic Mountains",
                1300,
                "Search For \nVibrant Forests",
                1300,
                "Search For \nExpansive Deserts",
                1300,
                "Search For \nThe Best Images",
                1300,
                () => {
                  setShowImageSearch(true);
                  setTypeAnimation(false);
                },
              ]}
              speed={50}
              cursor={false}
              style={{
                fontSize: "2em",
                fontWeight: "bold",
                whiteSpace: "pre-line",
                height: "195px",
                display: "block",
              }}
            />

            <button
              style={{ background: "rgba(250, 190, 0, .8)" }}
              onClick={() => {
                setShowImageSearch(true);
                setTypeAnimation(false);
              }}
              className="search-now"
            >
              Search Now
            </button>
          </>
        )}

        {showImageSearch && <ImageSearch />}
      </div>
    </>
  );
}

export default App;
