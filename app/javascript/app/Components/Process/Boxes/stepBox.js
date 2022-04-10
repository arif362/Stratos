import React from 'react'

const StepBox = ({currentStep, stepClick, children}) => {

    return (
        <div onClick={() => stepClick(children)} 
            className={`
                p-2 
                mt-8
                w-40
                h-20
                text-center
                font-heading 
                flex
                items-center
                justify-center
                border-4 border-darkGray 
                uppercase 
                ${currentStep === children ? "bg-darkGray text-white" :  " bg-stratosOrange text-white" }`}>
            <h2>{children}</h2>
        </div>
    )
}

export default StepBox; 