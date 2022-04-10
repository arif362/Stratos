import React, { useState } from 'react'

const Collapsible = ({ open, children, title, style }) => {

    const [ isOpen, setIsOpen ] = useState(open)

    const handleOpen = () => {
        setIsOpen((prev) => !prev)
    }
    return(
        <section className={style}>
          <div>
            <div className="p-3 flex flex-row space-x-3">
              <h6 className="Section-h1">{title}</h6>
              <button type="button" className="font-bold text-lightGray" onClick={handleOpen}>
                {!isOpen ? (
                  <h1>V</h1> //until we can put icons
                ) : (
                  <h1>X</h1>
                )}
              </button>
            </div>
          </div>
          <div >
            <div>{isOpen && <div className="gray-border">{children}</div>}</div>
          </div>
      </section>
    )
}

export default Collapsible; 