import { MainArticle } from "./MainArticle.js"
import { SmallArticle } from "./SmallArticle.js"

export const Articles = ({ articles }) => {
  return (
    <section className="articles">
      <div className="container grid">

        <section className="articles__big-column">
          {articles.items.slice(0, 3).map((item) => {
            return (
              <MainArticle
                key={item.title}
                title={item.title}
                image={item.image}
                category={articles.categories.find(c => c.id === item.category_id).name}
                description={item.description}
                source={articles.sources.find(s => s.id === item.source_id).name}
              />
            )
          })}
        </section>

        <section className="articles__small-column">
          {articles.items.slice(3, 12).map((item) => {
            return (
              <SmallArticle
                key={item.title}
                title={item.title}
                source={articles.sources.find(s => s.id === item.source_id).name}
                date={item.date}
              />
            )
          })}
        </section>
      </div>
    </section>
  )
}