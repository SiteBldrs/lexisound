import React from "react";

import "./header.scss";
import { BooksIcon, HistoryIcon } from "constants/icons";

export const HeaderComponent = () => {
  return (
    <header className="header_container flex items-center justify-between">
      <div
        className="header_logo flex items-center"
        title="LexiSound Dictionary"
      >
        <span>
          <BooksIcon />
        </span>
        <h2>LexiSound</h2>
      </div>
      <div title="History" className="history_toggle">
        <HistoryIcon />
      </div>
    </header>
  );
};
