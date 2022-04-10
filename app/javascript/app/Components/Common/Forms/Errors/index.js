import React from 'react'

/* Container block element for a single validation error on a Form */

const FieldError = ({children}) => {
  return(
    <>
      <div>
        {children}
      </div>
    </>
  )
}

/* Span text element for validation error text on a Form */
const ErrorText = ({children}) => {
  return(
    <>
      <span className="form-error-text">
        {children}
      </span>
    </>
  )
}



export {
  FieldError,
  ErrorText
}