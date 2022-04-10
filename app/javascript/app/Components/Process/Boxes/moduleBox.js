import React from 'react'

const ModuleBox = ({id, currentMod, modClick, children}) => {


    return (
    <div className="flex flex-col items-center relative">
        <div onClick={() => modClick(id)} 
            className={`
                p-2 
                mt-8
                z-10
                w-40
                h-24
                text-center
                font-heading 
                flex
                items-center
                justify-center
                border-4 border-darkGray 
                uppercase 
                ${currentMod === id ? "bg-darkGray text-white" :  " bg-white text-darkGray" }`}>
            <h2>{children}</h2>
        </div>
        <span className={currentMod === id ? "h-6 w-6 inline-block absolute -bottom-3 bg-stratosOrange rotate-45 z-0" : ""}></span>
    </div>
    )
}

export default ModuleBox; 


