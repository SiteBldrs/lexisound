/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useState } from "react";

import "./word.scss";
import { PlayIcon, PauseIcon } from "constants/icons";

export const WordComponent = ({
  results,
  isPlaying,
  handlePlayAudio,
  audioRef,
  handleAudioEnded,
}) => {
  const [filteredAudio, setFilteredAudio] = useState("");
  const meanings = results?.meanings;
  const audioData = results?.phonetics;

  function findAndLogAudioURL(dataArray) {
    const updatedData = dataArray?.map((item) => {
      if (item.audio !== "") {
        setFilteredAudio(item.audio);
      }
      return item;
    });
    return updatedData;
  }

  useEffect(() => {
    findAndLogAudioURL(audioData);
  }, [audioData, filteredAudio]);

  return (
    <div className="word_container flex col">
      <div className="word_result flex col">
        <div className="word_header flex items-center justify-between">
          <div className="word flex col">
            <h1>{results?.word}</h1>
            <p>{results?.phonetic}</p>
          </div>

          {filteredAudio && (
            <button
              className={`word_audio flex items-center justify-center ${
                !filteredAudio && "no audio"
              }`}
              onClick={() => handlePlayAudio(filteredAudio)}
              disabled={isPlaying || !filteredAudio}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
              <audio ref={audioRef} hidden onEnded={handleAudioEnded} />
            </button>
          )}
        </div>

        <div className="meanings_content flex col">
          {meanings?.map((meaning, _key) => (
            <div className="meanings flex col" key={_key}>
              <div className="separator flex items-center relative">
                <h3>{meaning.partOfSpeech}</h3>
                <span className="absolute" />
              </div>

              <div className="definition_content flex col">
                <h3 className="def">Definition:</h3>

                <div className="definitions_lists flex col">
                  {meaning?.definitions?.map((definition, _key2) => (
                    <div className="definitions flex col" key={_key2}>
                      <p>
                        {_key2 + 1}. {definition.definition}
                      </p>

                      {definition.example && (
                        <div className="examples">
                          <h3 className="def">Example:</h3>

                          <p>{definition.example}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {meaning?.synonyms.length !== 0 && (
                <div className="definition_content flex synonyms">
                  <h3 className="def">Synonyms:</h3>
                  <div className="synonyms_content flex items-center">
                    {meaning?.synonyms.map((synonym, _skey) => (
                      <span key={_skey}>{synonym}</span>
                    ))}
                  </div>
                </div>
              )}

              {meaning?.antonyms.length !== 0 && (
                <div className="definition_content flex synonyms">
                  <h3 className="def">Antonyms:</h3>
                  <div className="synonyms_content flex items-center">
                    {meaning?.antonyms.map((antonyms, _akey) => (
                      <span key={_akey}>{antonyms}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const LoadingWordComponent = () => {
  return (
    <div className="word_container flex col isLoading">
      <div className="word_result flex col">
        <div className="word_header flex items-center justify-between">
          <div className="word flex col">
            <h1 />
            <p />
          </div>

          <div className="word_audio"></div>
        </div>

        <div className="meanings_content flex col">
          {Array.from({ length: 5 }).map((_, _key) => (
            <div className="meanings flex col" key={_key}>
              <div className="separator flex items-center">
                <h3 />
                <span />
              </div>

              <div className="definition_content flex col">
                <h3 className="def" />

                <div className="definitions_lists flex col">
                  {Array.from({ length: 2 }).map((_, _key) => (
                    <div className="definitions flex col" key={_key}>
                      <div className="load_content flex col">
                        <p />
                        <p />
                        <p />
                      </div>

                      <div className="examples">
                        <h3 className="def" />

                        <div className="flex col">
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="definition_content flex synonyms">
                <h3 className="def" />
                <div className="synonyms_content flex items-center">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="definition_content flex synonyms">
                <h3 className="def" />
                <div className="synonyms_content flex items-center">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
