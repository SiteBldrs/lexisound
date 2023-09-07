import React, { useEffect, useRef, useState } from "react";

import "./layouts.scss";
import {
  ErrorComponent,
  HeaderComponent,
  InputComponent,
  LoadingWordComponent,
  WordComponent,
} from "components";
import { fetchWord } from "utils";

let defaultWord = "game";

export const AppLayout = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [results, setResults] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(defaultWord);

  const audioRef = useRef(null);

  const handlePlayAudio = (url) => {
    if (!isPlaying) {
      audioRef.current.src = url;
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    setIsLoading(true);
    setIsError(null);
    fetchWord(defaultWord)
      .then((data) => {
        setResults(data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsError(`${searchValue} could not be found`);
        } else {
          setIsError(error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchWord = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(null);
    setResults(null); // Clear previous results

    try {
      const data = await fetchWord(searchValue);
      setResults(data);
    } catch (error) {
      if (error.response.status === 404) {
        setIsError(`${searchValue} could not be found`);
      } else {
        setIsError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const wordProps = {
    results: results,
    isPlaying,
    handlePlayAudio,
    handleAudioEnded,
    audioRef,
  };

  const inputProps = {
    searchValue,
    setSearchValue,
    isLoading,
    handleSearchWord,
  };

  return (
    <div className="app_container flex col">
      <HeaderComponent />
      <InputComponent {...inputProps} />
      {isError ? (
        <ErrorComponent isError={isError} />
      ) : isLoading ? (
        <LoadingWordComponent />
      ) : (
        <WordComponent {...wordProps} />
      )}
    </div>
  );
};
