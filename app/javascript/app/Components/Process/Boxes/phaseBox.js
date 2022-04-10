import React from 'react'

const PhaseBox = ({id, currentPhase, phaseClick, children}) => {

    return (
        <div className="flex flex-col items-center relative">
            <div onClick={() => phaseClick(id)} 
                className={`
                    p-3
                    h-20
                    w-32
                    z-10
                    text-lg
                    text-center
                    font-heading 
                    flex
                    items-center
                    justify-center
                    uppercase 
                    shadow-sm
                    ${currentPhase === id ? "bg-darkGray text-white" :  "bg-outlineGray text-lightGray" }`}>
                <h2>{children}</h2>
            </div>
            <span className={currentPhase === id ? "h-6 w-6 inline-block absolute -bottom-3 bg-stratosOrange rotate-45 z-0" : ""}></span>
        </div>
    )
}

export default PhaseBox; 