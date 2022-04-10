import React from 'react';

function ProgressBar({progress, isOver, isSmall}) {

  const progressInt = parseFloat(progress)
  const overStyle = isOver ? "bg-stratosRed" : "bg-trueGreen";
  const barSize = isSmall ? "h-3" : "h-6"; 

  return(
      <div className={`overflow-hidden ${barSize} mb-1 text-xs flex rounded-full bg-outlineGray`}>
        <div 
          style={{width: progress}} 
          className={`${overStyle} ProgressBar`}>
        </div>
      </div>
  )
}

export default ProgressBar;