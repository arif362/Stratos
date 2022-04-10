import React from 'react'

const BadgeSquare = ({ children, taskCount }) => {

    return (
        <div className="p-3 bg-darkGray h-40 w-80">
            <h2 className="p-1 text-white text-center border border-transparent border-b-stratosGray">{children}</h2>
            <h3 className="pt-3 text-center text-6xl text-stratosOrange">{taskCount}</h3>
        </div>
    )
}


export default BadgeSquare; 