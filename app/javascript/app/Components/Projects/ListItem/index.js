import React from 'react';
import { Link } from 'react-router-dom'; 
import BadgeCircle from 'Components/Common/BadgeCircle';
import ProgressBar from 'Components/Common/ProgressBar';

function ListItem({item}) {

  const projectPercentage = Math.floor((70/100) * 100);
  const projectIsOverBudget = projectPercentage > 100;
  const formattedCost =  `${projectPercentage.toString()}%`;

  // TODO Make styling dynamic based on percentage of days left in project. Waiting on how data will be returned back from API 
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const remainingProjectDays = Math.abs(item.attributes['due-date'] - date);

  let budgetLabelStyle = 'text-trueGreen';
  let budgetLabelText = `On Budget: \$${70}k`;

  if (projectIsOverBudget) {
    budgetLabelStyle = 'text-stratosRed';
    budgetLabelText = `Over Budget: ${projectPercentage - 100}% / \$${70 - 100}k`;
  }

  return(
      <article className="grid grid-cols-6 gap-3">
        <div className="bg-blue-400 text-center">Image</div>
        <section className="flex flex-col items-center justify-center">
          <h3 className="text-xl text-darkGray font-semibold text-center">{item.attributes['name']}</h3>
          <h4 className="bg-transparent text-stratosGray py-0.5 px-4 m-1 border border-stratosGray rounded">Construction</h4>
        </section>
        <section>
            <h4 className="text-left text-xs font-semibold inline-block text-lightGray">Progress vs. Authorized Schedule</h4>
            <ProgressBar isSmall={true}/>
            <p className="text-right text-xs text-lightGray">Completion Date <br/>{item.attributes["due-date"]}</p> 
            <h4 className="text-trueGreen text-xs font-semibold py-1 px-2">On Schedule</h4>
            <h4 className="text-stratosRed text-xs font-semibold py-1 px-2">Behind Schedule</h4>
        </section>
        <section>
            <h4 className="text-left text-xs font-semibold inline-block text-lightGray">Current Forecast vs. Authorized Schedule</h4>
            <ProgressBar progress={formattedCost} isOver={projectIsOverBudget} isSmall={true}/>
            <div className="flex justify-between">
                <p className="text-xs text-lightGray">${70}k</p>
                <p className="text-xs text-lightGray">${100}k</p>
            </div>
            <h4 className={`${budgetLabelStyle} text-xs font-semibold py-1 px-2`}>
              {budgetLabelText}
            </h4>
        </section>
        <BadgeCircle />
        <section className="flex flex-col justify-center space-y-3">
            <Link 
                className="text-sm underline orange-semibold"
                to={`/projects/${item.id}`}>
                <h3>View Full Project</h3>
              </Link>
              <Link 
                className="text-sm underline orange-semibold"
                to={`/projects/${item.id}`}>
                <h3>View Executive Report</h3>
              </Link>
        </section>
      </article>
  )
}

export default ListItem