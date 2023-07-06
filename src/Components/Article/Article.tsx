import React, { FC } from "react";
import "./Article.css";
import { RelatedSmallArticle } from "../RelatedSmallArticle/RelatedSmallArticle";
import { SingleLineTitleArticle } from "../SingleLineTitleArticle/SingleLineTitleArticle";
import {
  ArticleItemAPI,
  Articles,
  Categories,
  RelatedArticlesAPI,
  Sources,
} from "../../types";
import { beautifyDate } from "../../utils";

interface Props {
  id: number;
  categories: Categories[];
  sources: Sources[];
}

export const Article: FC<Props> = ({ id, categories, sources }) => {
  const [articleItem, setArticleItem] = React.useState<ArticleItemAPI | null>(
    null
  );
  const [relatedArticles, setRelatedArticles] = React.useState<
    Articles[] | null
  >(null);

  React.useEffect(() => {
    fetch(`https://frontend.karpovcourses.net/api/v2/news/full/${id}`)
      .then((response) => response.json())
      .then(setArticleItem);
  });
  React.useEffect(() => {
    fetch(
      `https://frontend.karpovcourses.net/api/v2/news/related/${id}?count=9`
    )
      .then((response) => response.json())
      .then((response: RelatedArticlesAPI) => {
        setRelatedArticles(response.items);
      });
  });

  if (articleItem === null || relatedArticles === null) {
    return null;
  }

  return (
    <section className="article-page">
      <article className="article">
        {articleItem.image.length ? (
          <section
            className="article__hero"
            style={{
              backgroundImage: `url(${articleItem.image})`,
            }}
          >
            <div className="container article__hero-content">
              <div className="grid">
                <h1 className="article__hero-title">{articleItem.title}</h1>
              </div>

              <div className="grid">
                <span className="article-category article__category">
                  {articleItem.category.name}
                </span>
                <span className="article-date article__date">
                  {beautifyDate(articleItem.date)}
                </span>
              </div>
            </div>
          </section>
        ) : null}

        <div className="grid container article__main">
          <div className="article__content">
            {!articleItem.image.length && (
              <div className="article__title-container">
                <h1 className="article__title">{articleItem.title}</h1>

                <div className="grid">
                  <span className="article-category article__category">
                    {articleItem.category.name}
                  </span>
                  <span className="article-date article__date">
                    {beautifyDate(articleItem.date)}
                  </span>
                </div>
              </div>
            )}
            <p>{articleItem.description}</p>
          </div>

          <div className="article__small-column">
            {relatedArticles.slice(3, 9).map((item) => {
              const category = categories.find(
                ({ id }) => item.category_id === id
              );
              const source = sources.find(({ id }) => item.source_id === id);
              return (
                <RelatedSmallArticle
                  key={item.id}
                  title={item.title}
                  image={item.image}
                  category={category?.name || ""}
                  source={source?.name || ""}
                />
              );
            })}
          </div>
        </div>
      </article>

      <section className="article-page__related-articles">
        <div className="container">
          <h2 className="article-page__related-articles-title">
            Читайте также:
          </h2>

          <div className="grid article-page__related-articles-list">
            {relatedArticles.slice(0, 3).map((item) => {
              const category = categories.find(
                ({ id }) => item.category_id === id
              );
              const source = sources.find(({ id }) => item.source_id === id);
              return (
                <SingleLineTitleArticle
                  key={item.id}
                  title={item.title}
                  image={item.image}
                  category={category?.name || ""}
                  source={source?.name || ""}
                  text={item.description}
                />
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};
