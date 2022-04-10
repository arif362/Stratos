import React from 'react'; 
import { Link } from "react-router-dom"
import moment from "moment"
import Section from 'Components/Common/Section';
import { risksURL } from "utils/urls"

function Schedule({ title }) {
  
  const projectData = [
    {id: 1, category: "Project Definition", startDate: "3/22/22", endDate: "5/12/22", progress: '50%', riskEndDate: '5/21/22'}, 
    {id: 2, category: "Design", startDate: "11/30/22", endDate: "3/12/23", progress: "90%", riskEndDate: "4/15/23"},
    {id: 3, category: "Bid / Award", startDate: "6/2/22", endDate: "11/12/22", progress: "20%", riskEndDate: "1/20/23"},
    {id: 4, category: "Pre Construction", startDate: "8/2/22", endDate: "8/12/23", progress: "20%"},

    // {id: 1, category: "Project Definition", startDate: "1/22/22", endDate: "5/12/22", progress: '50%'}, 
    // {id: 2, category: "Design", startDate: "4/30/23", endDate: "8/12/23", progress: "90%", riskEndDate: "9/15/23"},
    // {id: 3, category: "Bid / Award", startDate: "6/2/23", endDate: "11/12/23", progress: "20%", riskEndDate: "1/20/24"},
    // {id: 4, category: "Pre Construction", startDate: "8/2/22", endDate: "8/12/23", progress: "20%"},
  ]

  const findStartDate = (data) => {
    const onlyStartDates = data.map(category => {
      return category["startDate"]
    })
    const orderedStartDates = onlyStartDates.sort((a, b) => {
      return Date.parse(a) - Date.parse(b);
    })

    return orderedStartDates[0]; 
  }
  
  const findEndDate = (data) => {
    let onlyEndDates = [] 
    const EndDates = data.map(category => {
      onlyEndDates.push(category["endDate"])
      if(category["riskEndDate"]){
        onlyEndDates.push(category["riskEndDate"])
      }
     return onlyEndDates
    })

    const orderedEndDates = onlyEndDates.sort((a, b) => {
     return Date.parse(b) - Date.parse(a);
    })

    return orderedEndDates[0]
  }
  
    let dates = {}
    const monthRange = (startDate, endDate) => {
      const start = startDate.split("/")
      const end = endDate.split("/")
      const startYear = parseInt(start[2])
      const endYear = parseInt(end[2])
      
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    //List months between start and end date of project
    for(let i = startYear; i <= endYear; i++){
      const startMonth = i === startYear ? parseInt(start[0]) - 1 : 0;
      const endMonth = i != endYear ? 11 : parseInt(end[0]) - 1;
      for(let j = startMonth; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1){
        const month = j + 1;
        const fullDate = [ month, "01", i ].join("/")
        const quarter = moment(fullDate).format("Q")

            if((month === 1 || 2 || 3) && (!dates[`Qtr ${quarter}, 20${i}`])){
              dates[`Qtr ${quarter}, 20${i}`] = []
            } 
            else if(!Object.values(dates[`Qtr ${quarter}, 20${i}`]).includes(fullDate)){
              dates[`Qtr ${quarter}, 20${i}`].push(fullDate)
            }
     
            if((month === 4 || 5 || 6) && (!dates[`Qtr ${quarter}, 20${i}`])){
              dates[`Qtr ${quarter}, 20${i}`] = []
            } 
            else if(!Object.values(dates[`Qtr ${quarter}, 20${i}`]).includes(fullDate)){
              dates[`Qtr ${quarter}, 20${i}`].push(fullDate)
            }

            if((month === 7 || 8 || 9) && (!dates[`Qtr ${quarter}, 20${i}`])){
              dates[`Qtr ${quarter}, 20${i}`] = []
            } 
            else if(!Object.values(dates[`Qtr ${quarter}, 20${i}`]).includes(fullDate)){
              dates[`Qtr ${quarter}, 20${i}`].push(fullDate)
            }

            if((month === 10 || 11 || 12) && (!dates[`Qtr ${quarter}, 20${i}`])){
              dates[`Qtr ${quarter}, 20${i}`] = []
            } 
            else if(!Object.values(dates[`Qtr ${quarter}, 20${i}`]).includes(fullDate)){
              dates[`Qtr ${quarter}, 20${i}`].push(fullDate)
            }
      }
    }

    //Add beginning months to unfinished project quarters
    if(Object.values(dates)[0].length === 2){
      const split = Object.values(dates)[0][0].split("/")
      const splitInt = parseInt(split[0])
      const firstMonth = splitInt - 1; 

      const fullFirst = [firstMonth, "01", split[2]].join("/")

      Object.values(dates)[0].unshift(fullFirst)

    } else if (Object.values(dates)[0].length === 1 ){
      const split = Object.values(dates)[0].toString().split("/")
      const splitInt = parseInt(split[0])
      const firstMonth = splitInt - 1; 
      const secondMonth = splitInt - 2; 

      const fullFirst = [firstMonth, "01", split[2]].join("/")
      const fullSecond = [secondMonth, "01", split[2]].join("/")

      Object.values(dates)[0].unshift(fullSecond, fullFirst)
    }


    //Add ending months to unfinished project quarters
    const lastQuarter = dates[Object.keys(dates)[Object.keys(dates).length -1]]

    if(lastQuarter.length === 2){
      const split = lastQuarter[1].split("/")
      const splitInt = parseInt(split[0])
      const lastMonth = splitInt + 1; 

      const fullLast = [lastMonth, "01", split[2]].join("/")
      lastQuarter.push(fullLast)
    } else if (lastQuarter.length === 1){
      const split = lastQuarter[0].toString().split("/")
      const splitInt = parseInt(split[0])
      const secondLastMonth = splitInt + 1; 
      const LastMonth = splitInt + 2; 

      const fullSecondLast = [secondLastMonth, "01", split[2]].join("/")
      const fullLast = [LastMonth, "01", split[2]].join("/")
      lastQuarter.push(fullSecondLast, fullLast)
    }

    return (
      <div className="flex flex-row w-full items-center">
      {Object.entries(dates).map((quarter, i) => {
        return (
          <div className="flex flex-col w-full items-center">
            <h1>{quarter[0]}</h1>
            <ul className="flex flex-row w-full space-x-2 justify-evenly">
              {quarter[1].map((date, i) => {
                const fullDate = new Date(date)
                return <li key={i}>{monthNames[fullDate.getMonth()]}</li>
              })}
            </ul>
          </div>
        )
      })}
    </div>
    )
  }

  const durationInDays = (start, end)  => {
    const startDay = new Date(start)
    const endDay = new Date(end)
    
    const difference = startDay.getTime() - endDay.getTime();
    
    const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    const formatPositive = Math.abs(totalDays);
    
    return formatPositive
  }
  
  const getRows = (data) => {

    const startMonth = Object.values(allDates)[0][0]
    const endMonth = allDates[Object.keys(allDates)[Object.keys(allDates).length -1]].pop()

    const fullDisplayedProjectInDays = durationInDays(startMonth, endMonth)

    const startBlankDays = durationInDays(startMonth, projectStart)
    const endBlank = Math.round((durationInDays(endMonth, projectEnd) / fullDisplayedProjectInDays) * 100) + "%"

    return (
      <ul>
        {data.map(row => {

          const categoryPercent = Math.round((durationInDays(row["startDate"], row["endDate"]) / fullDisplayedProjectInDays) * 100) + "%"

          const categoryStart = Math.round(((durationInDays(row["startDate"], projectStart) + startBlankDays )/ fullDisplayedProjectInDays) * 100) + "%"

          const riskPercent = Math.round((durationInDays(row["endDate"], row["riskEndDate"]) / fullDisplayedProjectInDays) * 100) + "%"

          return (
            <ul key={row["id"]} className="flex flex-row space-x-3">
              <li className="w-1/6 pr-3 border-r border-lightGray text-stratosGray text-right sticky">{row["category"]}</li>
                <li className="h-4 w-5/6 rounded-full bg-outlineGray flex flex-row overflow-x-auto">
                  {!row["riskEndDate"] ? 
                      <div
                      style={{width: categoryPercent, marginLeft: categoryStart, marginRight: endBlank}} 
                      className="h-4 flex rounded-full bg-trueGreen">
                    </div> :
                    <>
                      <div
                        style={{width: categoryPercent, marginLeft: categoryStart}} 
                        className="h-4 flex rounded-l-full bg-trueGreen">
                      </div>
                      <Link 
                        to={risksURL()}
                        style={{width: riskPercent, marginRight: endBlank}}
                        className="border border-stratosRed rounded-r-full">
                    </Link>
                    </>
                    }
                  </li> 
            </ul>
            )
          })}
      </ul>
      )
    }
    
    const projectStart =  findStartDate(projectData)
    const projectEnd = findEndDate(projectData)
    const columns = monthRange(projectStart, projectEnd)
    const allDates = dates
    const rows = getRows(projectData)

    
    return(
      <Section>
        <div className="flex justify-between mb-3">
        <h1 className="Section-h1">{title}</h1>
        <section className="flex space-x-4">
          <div className="flex flex-row">
            <div className="bg-trueGreen w-8 h-3 m-1 text-white rounded-full">.</div>
            <p className="text-sm text-lightGray">BASE Schedule</p>
          </div>
          <div className="flex flex-row">
            <div className="bg-stratosBlue w-8 h-3 m-1 text-white rounded-full">.</div>
            <p className="text-sm text-lightGray">Approved Extension</p>
          </div>
          <div className="flex flex-row">
            <div className="border border-stratosRed w-8 h-3 m-1 text-white rounded-full">.</div>
            <p className="text-sm text-lightGray">DELAY Risk</p>
          </div>
        </section>
      </div>
      
      <section className="flex flex-row w-full">
        <span className="w-1/6"></span>
        <div className="flex w-5/6 flex-row">{columns}</div>
      </section>
      <div>{rows}</div>
    </Section>
  )
}

export default Schedule; 