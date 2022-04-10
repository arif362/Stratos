import React from 'react'

const BadgeCircle = ({items}) => {
  return(
    <section className="grid justify-items-center text-lightGray border-r border-l border-lightGray"> 
        <h4 className="text-center">My Critical Tasks</h4>
        <div className="bg-lightGray rounded-full p-3 w-12 h-12 text-center">
            <h4 className="text-lg orange-semibold">9</h4>
        </div>
    </section>
  )
}

export default BadgeCircle; 