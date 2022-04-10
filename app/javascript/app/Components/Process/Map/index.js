import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { client as apiClient } from 'utils/api'
import PhaseBox from '../Boxes/phaseBox'
import ModuleBox from '../Boxes/moduleBox'
import TaskGrid from '../Boxes/taskGrid'

function Map(){
  
  async function getPhases() {
    const response = await apiClient.get('/phases')
    return response.data
  }
  const phaseQuery = useQuery('api/phases', getPhases)
  
  async function getMods() {
    const response = await apiClient.get('/phases/' + currentPhase + '/components')
    return response.data
  }

  const [currentPhase, setCurrentPhase] = useState(null)
  const [currentMod, setCurrentMod] = useState(null)


  function phaseClick(id){
    setCurrentPhase(id)
    setCurrentMod(null)
  }

  function modClick(id){
    setCurrentMod(id)
  }

  const { isIdle, data: modQuery } = useQuery('api/phases/' + currentPhase + '/components', getMods, {enabled: !!currentPhase})

  const getTaskForm = (id) => {
    
  }
  

  return(
    <div className="p-1 border-t border-x border-outlineGray">
      <div className="mt-2 flex space-x-2 justify-evenly w-full">
      {phaseQuery.isLoading ? <p>Loading...</p> : 
        phaseQuery.data.length ? phaseQuery.data.map(phase => {
        return (
          <PhaseBox 
              key={phase.id} 
              id={phase.id}
              currentPhase={currentPhase} 
              phaseClick={phaseClick}
              >
              {phase.attributes["name"]}</PhaseBox>
            )
          }) : ""
          }
      </div>
        
      {!modQuery ? null :
      <div className="flex space-evenly flex-wrap w-full">
       {modQuery.map((mod, i) => {
            return (
              <div className="flex items-center">
                <ModuleBox 
                  key={i} 
                  id={mod.attributes["uid"]}
                  currentMod={currentMod} 
                  modClick={modClick}
                  >
                 {mod.attributes["name"]}</ModuleBox>
                  {i === (modQuery.length - 1) ? "" : 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fillRule="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  }
              </div>
            )
          })}
      </div>
      }

      {!currentMod ? null :
        <TaskGrid
          currentPhase={currentPhase}
          currentMod={currentMod}
          getTaskForm={getTaskForm}
        ></TaskGrid>
      }

    </div>
  )
}

export default Map;