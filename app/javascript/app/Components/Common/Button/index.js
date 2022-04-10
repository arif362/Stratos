import React from 'react'

const Button = ({ children, buttonStyle }) => {

  return(
    <button className={buttonStyle}>
        <h3>{children}</h3>
    </button>
  )
}

export default Button