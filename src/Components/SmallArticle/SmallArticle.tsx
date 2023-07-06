import React, { FC } from "react";
import "./SmallArticle.css";
import { beautifyDate } from "../../utils";

interface Props {
  title: string;
  source: string;
  date: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const SmallArticle: FC<Props> = ({ title, source, date, onClick }) => {
  return (
    <article className="small-article">
      <h2 className="small-article__title" onClick={onClick}>
        {title}
      </h2>
      <span className="article-date">{source}</span>
      <span className="article-source">{beautifyDate(date)}</span>
    </article>
  );
};
