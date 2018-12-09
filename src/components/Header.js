import React from 'react'

const Header = ({ title, children }) => (
  <header className="Header">
    <h3>{title}</h3>
    {children}
  </header>
)

export { Header }
