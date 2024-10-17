import "./styles.css";
import { useState, useEffect } from "react";
export default function App() {
  const [customMessage, setCustomMessage] = useState("...");
  const [signalIndex, setSignalIndex] = useState(0);
  const [animalImages, setAnimalImages] = useState();
  const [animal, changeAnimal] = useState(0);

  const signalNames = ["alpha", "bravo", "delta", "sigma", "cappa", "new"];

  const handleMessageUpdate = (e) => {
    setCustomMessage(e.target.value);
  };

  const handleLeftArrow = () => {
    setSignalIndex(Math.max(0, signalIndex - 1));
  };

  const handleRightArrow = () => {
    setSignalIndex(Math.min(signalIndex + 1, signalNames.length - 1));
  };

  const handleUpdateAnimal = () => {
    let increment = animal + 1;
    changeAnimal(increment);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://api.thecatapi.com/v1/images/search?limit=1", {
        "x-api-key":
          "live_xM6seM1yj987EDu84Cnsvrs5S91sQ4gkI43cURX542uoLBBSJJ3SRM7Kwy6jRli9",
      })
        .then(async (res) => {
          let data = await res.json();
          console.log({ data });
          setAnimalImages(data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [animal]);

  return (
    <div className="App">
      <div>
        Enter a name here:
        <br />
        <textarea
          id="message-box"
          onChange={(e) => handleMessageUpdate(e)}
          value={customMessage}
        ></textarea>
        {customMessage == "..." ? (
          ""
        ) : (
          <div>Hi, {customMessage}, how are you today?</div>
        )}
      </div>
      <div id="item-flex">
        <button onClick={() => handleLeftArrow()}>Left</button>
        <ul id="signals">
          {signalNames.slice(signalIndex, signalIndex + 3).map((signal) => {
            return <span key={signal}>{signal}</span>;
          })}
        </ul>
        <button onClick={() => handleRightArrow()}>Right</button>
      </div>
      <div className="animal-images">
        <br />
        <button onClick={() => handleUpdateAnimal()}>Get New Cat!</button>
        {animalImages
          ? animalImages.map((animalImageData) => {
              return <img src={animalImageData.url} alt="" />;
            })
          : ""}
      </div>
    </div>
  );
}
