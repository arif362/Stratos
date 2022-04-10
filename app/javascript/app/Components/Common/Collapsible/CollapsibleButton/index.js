import React, { useState } from 'react'

const CollapsibleButton = ({ open, children, title, buttonStyle, contentStyle }) => {

    const [ isOpen, setIsOpen ] = useState(open)

    const handleOpen = () => {
        setIsOpen((prev) => !prev)
    }
    return(
        <section>
            <h6 onClick={handleOpen} className={buttonStyle}>{title}</h6>
            <div>{isOpen && <div className={`${!contentStyle ? "border border-stratosOrange" : contentStyle}`}>{children}</div>}</div>
        </section>
    )
}

export default CollapsibleButton;