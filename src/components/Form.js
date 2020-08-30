import React, { useState } from "react";

const Form = ({ saveSearchLyrics }) => {
  const [search, saveSearch] = useState({
    artist: "",
    song: "",
  });
  const [error, saveError] = useState(false);

  const { artist, song } = search;

  // Function to each input to read its content
  const updateState = (e) => {
    saveSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  // Consult the APIs
  const searchInfo = (e) => {
    e.preventDefault();

    if (artist.trim() === "" || song.trim() === "") {
      saveError(true);
      return;
    }
    saveError(false);
    // All good, pass to the main component
    saveSearchLyrics(search);
  };

  return (
    <div className="bg-info">
      {error ? (
        <p className="alert alert-danger text-center p-2">
          All fields are required
        </p>
      ) : null}
      <div className="container">
        <div className="row">
          <form
            onSubmit={searchInfo}
            className="col card text-white bg-transparent mb-5 pt-5 pb-2"
          >
            <fieldset>
              <legend className="text-center">Lyrics Search</legend>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Artist</label>
                    <input
                      type="text"
                      className="form-control"
                      name="artist"
                      placeholder="Artist Name"
                      onChange={updateState}
                      value={artist}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Lyrics</label>
                    <input
                      type="text"
                      className="form-control"
                      name="song"
                      placeholder="Lyrics Name"
                      onChange={updateState}
                      value={song}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-warning float-right">
                Search
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
