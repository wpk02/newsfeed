import { categoriesIds } from "./utils.js"
import { Articles } from "./Articles.js"
import { Navigation } from "./Navigation.js"

export const App = () => {
  const [category, setCategory] = React.useState('index')
  const [articles, setArticles] = React.useState({ items: [], categories: [], sources: [] })

  const onnNavClick = (e) => {
    e.preventDefault()
    setCategory(e.currentTarget.dataset.href)
  }

  React.useEffect(() => {
    fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + categoriesIds[category] || '')
      .then(response => response.json())
      .then((response) => {
        setArticles(response)
      })
  }, [category])

  return (
    <React.Fragment>
      <header className="header">
        <div className="container">
          <Navigation placement="header" className='header__navigation' onnNavClick={onnNavClick} currentCategory={category} />
        </div>
      </header>

      <main className="main">
        <Articles articles={articles} />
      </main>

      <footer className="footer">
        <div className="container">
          <Navigation placement="footer" className='footer__navigation' onnNavClick={onnNavClick} currentCategory={category} />
          <div className="footer__column">
            <p className="footer__text">
              Сделано на Frontend курсе в{" "}
              <a href="https://karpov.courses/frontend" target="_blank" className="footer__link">Karpov.Courses</a>
            </p>
            <p className="footer__copyright">© 2021</p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  )
}