import React, { Fragment, useState, useEffect } from "react";
import Form from "./components/Form";
import Song from "./components/Song";
import Info from "./components/Info";

import axios from "axios";

function App() {
  // Define the state
  const [searchLyrics, saveSearchLyrics] = useState({});
  const [lyrics, saveLyrics] = useState("");
  const [info, saveInfo] = useState({});

  useEffect(() => {
    if (Object.keys(searchLyrics).length === 0) return;

    const consultApiLyrics = async () => {
      const { artist, song } = searchLyrics;
      const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;

      const [lyrics, information] = await Promise.all([
        axios(url),
        axios(url2),
      ]);

      saveLyrics(lyrics.data.lyrics);
      saveInfo(information.data.artists[0]);

      // saveLyrics(result.data.lyrics);
    };
    consultApiLyrics();
  }, [searchLyrics, info]);

  return (
    <Fragment>
      <Form saveSearchLyrics={saveSearchLyrics} />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={info} />
          </div>
          <div className="col-md-6">
            <Song lyrics={lyrics} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
