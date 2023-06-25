import React from "react"
import { categoriesNames } from "../../utils.js"
import './Navigation.css'
import logo from "../../images/logo.svg"

export const Navigation = ({ onnNavClick, currentCategory, className = '', placement = 'header' }) => {
  return (
    <nav className={`navigation grid navigation--${placement} ${className}`}>
      <a onClick={onnNavClick} href="#" className="navigation__logo" data-href="index">
        <img className="navigation__image" src={logo} alt="Логотип" />
      </a>
      <ul className="navigation__list">
        {['index', 'fashion', 'tech', 'politics', 'sport'].map((item) => {
          return (
            <li className="navigation__item" key={item}>
              <a
                onClick={onnNavClick}
                className={`navigation__link ${currentCategory === item ? 'navigation__link--active' : ''}`}
                data-href={item}
                href="#"
              >
                {categoriesNames[item]}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
