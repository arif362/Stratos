import React from 'react'

/*
  Use in conjuction with ./Columns/{Wide|Narrow}

  ex: import { Wide as ColumnWide, Narrow as ColumnNarrow } from './Columns' #use absolute path
  ...
  <ContentTwoColumn>
    <ColumnWide>
      whatever content needs to be in the larger wide column
    </ColumnWide>
    <ColumnNarrow>
      whatever content needs to be in the smaller narrow column
    </ColumnNarrow>
  </ContentTwoColumn>
*/

function ContentTwoColumn({children}) {
  return(
    <>
      <div className="grid grid-cols-6 gap-3">
        {children}
      </div>
    </>
  )
}

const WideColumn = ({children}) => {
  return(
    <>
      <div className="col-span-4">
        {children}
      </div>
    </>
  )
}

const NarrowColumn = ({children}) => {
  return(
    <>
      <div className="col-span-2">
        {children}
      </div>
    </>
  )
}

export default ContentTwoColumn;
export { WideColumn, NarrowColumn }