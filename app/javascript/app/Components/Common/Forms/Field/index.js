import React from 'react'

/* Basic Field component to wrap form inputs with */

const Field = ({children}) => {
  return(
    <div className="mb-4 flex flex-col">
      {children}
    </div>
  )
}

/*
 * Horizontal field for layout of form inputs and labels in a horizontal fashion

 * Example usage:
    <HorizontalField>
      <ColumnSmall>
        <label>Some label name</label>
      </ColumnSmall>
      <ColumnLarge>
        <input
          name="name"
          type="text"
        />
      </ColumnLarge>
    </HorizontalField>
*/

const HorizontalField = ({children}) => {
  return(
    <div className="mt-4 flex flex-col">
      <div className="flex flex-row">
        {children}
      </div>
    </div>
  )
}

/* Small Column for use with HorizontalField and ColumnLarge */

const ColumnSmall = ({children}) => {
  return(
    <div className="w-1/4">
      {children}
    </div>
  )
}

/* Large Column for use with HorizontalField and ColumnSmall */

const ColumnLarge = ({children}) => {
  return(
    <div className="w-3/4">
      {children}
    </div>
  )
}


export {
  Field,
  HorizontalField,
  ColumnSmall,
  ColumnLarge,
}
