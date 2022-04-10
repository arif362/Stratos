import React from 'react'; 
import Section from 'Components/Common/Section';

function ProcessMapOverview() {

  return(
    <Section>
      <div className="flex justify-between">
        <h1 className="Section-h1">Create Process Map</h1>
        <section className="flex space-x-4">
          <div className="flex flex-row">
            <div className="bg-trueGreen w-8 h-3 m-1 text-white">.</div>
            <p className="text-sm text-lightGray">Complete</p>
          </div>
          <div className="flex flex-row">
            <div className="bg-stratosBlue w-8 h-3 m-1 text-white">.</div>
            <p className="text-sm text-lightGray">In-Progress</p>
          </div>
          <div className="flex flex-row">
            <div className="bg-lightGray w-8 h-3 m-1 text-white">.</div>
            <p className="text-sm text-lightGray">Not Started</p>
          </div>
        </section>
      </div>
      <section className="p-2 my-4 divide-x  border border-outlineGray grid grid-cols-6">
        <div className="bg-trueGreen h-11">.</div>
        <div className="bg-stratosBlue">.</div>
        <div className="bg-stratosBlue">.</div>
        <div className="bg-stratosBlue">.</div>
        <div className="bg-lightGray">.</div>
        <div className="bg-lightGray">.</div>
      </section>
      <section className="p-2 grid grid-cols-6">
        <p className="text-xs font-bold text-stratosOrange">Pre-Design</p>
        <p className="text-xs font-bold text-stratosOrange">Design Team Selection</p>
        <p className="text-xs font-bold text-stratosOrange">Design Activities</p>
        <p className="text-xs font-bold text-stratosOrange">Non-Design Activities</p>
        <p className="text-xs font-bold text-lightGray">Contractor Selection</p>
        <p className="text-xs font-bold text-lightGray">Construction Phase</p>
      </section>
    </Section>
  )
}

export default ProcessMapOverview; 