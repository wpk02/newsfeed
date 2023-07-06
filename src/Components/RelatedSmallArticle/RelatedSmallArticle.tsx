import React, { FC } from "react";
import "./RelatedSmallArticle.css";

interface Props {
  image: string;
  category: string;
  title: string;
  source: string;
}

export const RelatedSmallArticle: FC<Props> = ({
  image,
  category,
  title,
  source,
}) => {
  return (
    <article className="related-small-article">
      <img className="related-small-article__image" src={image} />
      <div className="related-small-article__content">
        <span className="article-category related-small-article__category">
          {category}
        </span>
        <h2 className="related-small-article__title">{title}</h2>
        <span className="article-source related-small-article__source">
          {source}
        </span>
      </div>
    </article>
  );
};
