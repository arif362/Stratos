import React from 'react'
import { useQuery } from 'react-query'
import { client as apiClient } from 'utils/api'
import Xarrow, {Xwrapper} from 'react-xarrows';

const TaskGrid = ({currentPhase, currentMod}) => {   

  const roles =  ['Owner (Client)', 'Director', 'Consultant', 'Architect / Engineer', 'Contractor']

  async function getSteps() {
    const response = await apiClient.get('/phases/' + currentPhase + '/components/' + currentMod + '/steps')
    return response.data
  }
  const { isLoading, data: stepQuery} = useQuery('api/phases/' + currentPhase + '/components/' + currentMod + '/steps', getSteps, {enabled: !!currentMod})

  const stepIdArray = []
  const tasksArray = []

  if(stepQuery) {
    stepQuery.forEach(step => {
      stepIdArray.push(step.id)
    })
  }

  async function getTasks() {
    for (let i = 0; i < stepIdArray.length; i++) {
      const response = await apiClient.get('/phases/' + currentPhase + '/components/' + currentMod + '/steps/' + stepIdArray[i] + '/tasks')
      response.data.forEach(task => {
        tasksArray.push(task)
      }
      )
    }
    return tasksArray
  }

  const { isLoading: isLoadingTasks, data: tasksQuery} = useQuery('api/phases/' + currentPhase + '/components/' + currentMod + '/steps/' + stepIdArray + '/tasks', getTasks, {enabled: !!getSteps})


  function drawArrows() {
    const tasks = tasksQuery

    return (tasks.map((task, i) => {

      let predecessorTasks
      if(task.attributes["previous-tasks"] === 0){
        predecessorTasks = null
      } else {
        predecessorTasks = task.attributes["previous-tasks"] 
      }

      if (predecessorTasks) {
        return predecessorTasks.map(predecessorTask => {
          const lastTask = tasks.find((t) => { return  t.attributes["uid"] === predecessorTask.parentId })

          // let startXOffset = -5
          // let endXOffset = -5
          //  console.log (predecessorTask.startAnchor, "This is lastTask")
         
          
          // console.log (predecessorTask, "Predessor")
          // console.log (task.attributes["uid"], "To Object")
          let temp1 =  Math.abs(parseInt (task.attributes["uid"]) - predecessorTask.parentId)
          console.log ("Box: ", task.attributes["uid"], temp1, "Difference")
         
          let lastTaskToString = lastTask.attributes["uid"].toString()

          if  (temp1 >=  499) {
              let taskToString = task.attributes["uid"].toString()   
              return (
               <Xarrow 
                start={lastTaskToString}
                end={taskToString}
                headSize={6} // 3
                // tailSize={3} // 3
                showHead = {true}
                showTail = {false}
                strokeWidth={1}
                path="smooth"
                color="black"
                curveness={0.65}
                _cpx1Offset={15} // Beginning for Arrow
                _cpx2Offset={15} // End for Arrow
                _extendSVGcanvas={30}
                startAnchor={predecessorTask.startAnchor}
                endAnchor={predecessorTask.endAnchor}
              />
              ) 
            // For top to bottom and bottom too top that cross step Columns, the style needs to be curved rather than straight
            } else if(predecessorTask.startAnchor == "bottom" || predecessorTask.startAnchor == "top" || predecessorTask.endAnchor == "top" || predecessorTask.endAnchor == "bottom"  ) {
                let taskToString = task.attributes["uid"].toString() 
                  return (
                   <Xarrow 
                    start={lastTaskToString}
                    end={taskToString}
                    headSize={6} 
                    // tailSize={3} // 3
                    showHead = {true}
                    showTail = {false}
                    strokeWidth={1}
                    path="smooth"
                    color="black"
                    curveness={0}
                    _cpx1Offset={0} // Beginning for Arrow
                    _cpx2Offset={0} // End for Arrow
                    _extendSVGcanvas={20}
                    startAnchor={predecessorTask.startAnchor}
                    endAnchor={predecessorTask.endAnchor}

                  />
                ) 
              
            } else if(predecessorTask.startAnchor == "left" && predecessorTask.endAnchor == "left" ) {
              let taskToString = task.attributes["uid"].toString() 
                return (
                 <Xarrow 
                  start={lastTaskToString}
                  end={taskToString}
                  headSize={6} 
                  // tailSize={3} // 3
                  showHead = {true}
                  showTail = {false}
                  strokeWidth={1}
                  path="smooth"
                  color="black"
                  curveness={1.0}
                  _cpx1Offset={-50} // Beginning for Arrow
                  _cpx2Offset={-35} // End for Arrow
                  _extendSVGcanvas={20}
                  startAnchor={predecessorTask.startAnchor}
                  endAnchor={predecessorTask.endAnchor}

                />
              ) 
              
               } else {
              let taskToString = task.attributes["uid"].toString() 
                  return (
                   <Xarrow 
                    start={lastTaskToString}
                    end={taskToString}
                    headSize={6} 
                    // tailSize={3} // 3
                    showHead = {true}
                    ShowTail = {false}
                    strokeWidth={1}
                    path="smooth"
                    color="black"
                    curveness={0.75}
                    _cpx1Offset={25} // Beginning for Arrow
                    _cpx2Offset={25} // End for Arrow
                    _extendSVGcanvas={20}
                    startAnchor={predecessorTask.startAnchor}
                    endAnchor={predecessorTask.endAnchor}
                  />
                ) 
            }
          })
        } 
    }))
  }

  const getTaskColor = (status) => {
    switch (status) {
      case 1: // 'not-started'
        return 'bg-outlineGray'
      case 2: // 'completed'
        return 'bg-trueGreen'
      case 3: // 'edit'
        return 'bg-darkGray text-white'
      case 4: // 'Note'
        return 'bg-stratosOrange text-white'
    }
  }

  return (
    <section><Xwrapper>
      <table id="taskGrid" className="mt-8 w-full" style={{position: "relative"}}>
        <thead>
          <tr>
            {isLoading ? <td><span>Loading...</span></td> : 
                <>
                <td className="w-10 border border-lightGray"></td>
                {stepQuery.map((step, i) => {
                  return (<th key={i} id={step.id} className="p-3 text-center bg-outlineGray border border-lightGray">{step.attributes["name"]}</th>)
                })}
              </>
            }
          </tr>
        </thead>
        <tbody>
          {isLoading ? null : 
              roles.map((role, i) => {
                return (
                  <tr className="h-44 border border-lightGray">
                    <th key={i} className="p-3 bg-outlineGray border border-lightGray"><div className="w-10 -rotate-90 whitespace-nowrap">{role}</div></th>
                    {stepQuery.map(step => {
                      return(
                        <td className="p-2 border-r border-lightGray">
                          {isLoadingTasks ? null : 
                              tasksQuery.map((task, n) => {

                                if (task.attributes["assignee"] == role && task.attributes["step-id"] == step.id) {
                                  const offset = i
                                  return (
                                    <div 
                                      id={task.attributes["uid"]} 
                                      style={{position: "relative", left: `${offset}px`}} 
                                      className={`p-1 m-5 text-center text-sm border border-darkGray ${getTaskColor(task.attributes["status"])}`}
                                      >{task.attributes["name"]}</div>
                                  )
                                }
                              })
                          }
                                </td>
                      )
                    })}
                              </tr>
                )
              })  
          }
        </tbody>
      {isLoading || isLoadingTasks ? null : drawArrows()}
      </table>
    </Xwrapper></section>
  )


}

export default TaskGrid;