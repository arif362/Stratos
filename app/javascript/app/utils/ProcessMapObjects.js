

export function phases() {

  let phases = [
  { Phases: 
    ["PREDESIGN", "DESIGN TEAM SELECTION","DESIGN ACTIVITIES","NON-DESIGN ACTIVITIES","CONTRACTOR SELECTION","CONSTRUCTION PHASE"] 
  }
  ]

  return phases[0].Phases

};



export function phasesData() {

  let phasesData = [
  {
  "PREDESIGN": 
  ['Need Identification', 'Need Validation','Project Definition'],
  "DESIGN TEAM SELECTION": 
  ['Identify Design Team and Contractual Grouping', 'Team Member Selection Process', 'Fee Negotiation for Each Team Member'],
  "DESIGN ACTIVITIES": 
  ['Initial Design Team Meeting', 'Schematic Design','Schematic Design Review and Approval','Design Development', 'Design Development Review and Approval', "Construction Documents", "Construction Documents Review and Approval"],
  "NON-DESIGN ACTIVITIES":
  ['Project Environment Overview', 'External Participants-Selection of Management','Owners Influencers','Other External Influencers'],
  "CONTRACTOR SELECTION": 
  ['Selection of Bidders', 'Contractor Bidding', 'Contract Negotiations' , 'Permits', 'Initial Project Meeting'],
  "CONSTRUCTION PHASE": 
  ['Post-Award Pre-Construction', 'Ongoing Project Management','Project Closeout and Occupancy']
  }
]

  return phasesData[0]

};



export function modProcessData(){

let modProcessData = [
{
  'Need Identification': 
  ['Need Identification'],
  'Need Validation': 
  ['Assemble Owner Need Validation Team', 'Owner Need Assesment'], 
  'Project Definition': 
  ['Assemble Project Definition Team', 'Project Modeling', 'Definition of Optimum Scope', 'Approve Project Definition'],
  'Identify Design Team and Contractual Grouping' : 
  ['Identify Required Consultants','Identify Required Contractor Participation', 'Delivery Systems Contractual Groupings', ],
  'Team Member Selection Process' : 
  ['Establish Criteria', 'Develop Request for Qualifications', 'Advertise / Issue Request for Qualifications', 'Ranking Process', 'Interview Process'],
  'Fee Negotiation for Each Team Member' : 
  ['Address Major Issues', 'Entering into Fee Agreement', 'Legal Review', 'Contract Finalization', 'Contract Signature'],
  'Initial Design Team Meeting' : 
  ['Restate Owner Project Goals', 'Focus on Risk', 'Overview of Project Management Plan', 'Review Communication Process', 'Review Critical Design Controllers', 'Review Design Influencers'],
  'Schematic Design' : 
  [ "Ongoing Design Meetings", "Ongoing Project Control"],
  'Schematic Design Review and Approval' : 
  ['Design Submittal Review', 'Final Review Meeting with Owner Signoff', 'Notice to Proceed with Next Phase of Design'],
  'Design Development' : 
  ['Ongoing Design Meetings', 'Ongoing Project Control'], 
  'Design Development Review and Approval' : 
  ['Design Submittal Review', 'Final Review Meeting with Owner Signoff', 'Notice to Proceed with Next Phase of Design'],
  'Construction Documents' : 
  ['Ongoing Design Meetings', 'Ongoing Project Control'],
  'Construction Documents Review and Approval' : 
  ['Design Submittal Review', 'Final Review Meeting with Owner Signoff', 'Notice to Proceed with Next Phase of Design'],
  'Project Environment Overview' : 
  ['General Economic and Market Condition Overview', 'Recognition / Monitoring of Unforeseeable Acts of God. Labor Strikes, etc.'],
  'External Participants-Selection of Management' : 
  ['Non-Construction Participants', 'Outside Consultants'],
  'Owners Influencers' : 
  ['Other Project Influencers (Staff, Finanace, Legal, etc.)', 'Government', 'Community'],
  'Other External Influencers' : 
  ['Adjacent Owners', 'Utilities'],
  'Selection of Bidders' : 
  ['Establish Criteria', 'Develop Request for Qualifications', 'Advertise and Issue Request for Qualifications', 'Ranking Process', 'Interview Process', 'Select Qualified Bidders'],
  'Contractor Bidding' : 
  ['Issue Bid Documents', 'Pre-Bid Meeting', 'Addenda', 'Bids Due', 'Analyze Bids'],
  'Contract Negotiations' : 
  ['Scope Review', 'Negotiate Final Costs', 'Prepare Contract', 'Contract Review', 'Finalize and Execute Contract'],
  'Permits' : 
  ['Permit Application', 'Permit Application Format', 'Permit Denial', 'Expediting the Permit Process', 'Obtain Permit'],
  'Initial Project Meeting' : 
  ['Initial Project Meeting'],
  'Post-Award Pre-Construction' : 
  ['Mobilization', 'Subcontractor Selection & Approval', 'Commence Construction'],
  'Ongoing Project Management' : 
  ['Interim Project Monitoring', 'Payment Process', 'Change Order Process'],
  'Project Closeout and Occupancy' : 
  ['Project Closeout', 'Occupancy']
  }
]

return modProcessData[0]

};



export function stepsData(){

let stepsData = [
  {
    'Need Identification': 
    ['Need Identification'],
    'Need Validation': 
    ['Assemble Owner Need Validation Team', 'Owner Need Assesment'],
    'Project Definition': 
    ['Assemble Project Definition Team', 'Project Modeling', 'Definition of Optimum Scope', 'Approve Project Definition'],
    'Identify Design Team and Contractual Grouping' : 
    ['Identify Required Consultants','Identify Required Contractor Participation', 'Delivery Systems Contractual Groupings' ],
    'Team Member Selection Process' : 
    ['Establish Criteria', 'Develop Request for Qualifications', 'Advertise / Issue Request for Qualifications', 'Ranking Process', 'Interview Process'],
    'Fee Negotiation for Each Team Member' : 
    ['Address Major Issues', 'Entering into Fee Agreement', 'Legal Review', 'Contract Finalization', 'Contract Signature'],
    'Initial Design Team Meeting' : 
    ['Restate Owner Project Goals', 'Focus on Risk', 'Overview of Project Management Plan', 'Review Communication Process', 'Review Critical Design Controllers', 'Review Design Influencers'],
    'Schematic Design' : 
    [ "Ongoing Design Meetings", "Ongoing Project Control"],
    'Schematic Design Review and Approval' : 
    ['Design Submittal Review', 'Final Review Meeting with Owner Signoff', 'Notice to Proceed with Next Phase of Design'],
    'Design Development' : 
    ['Ongoing Design Meetings', 'Ongoing Project Control'], 
    'Design Development Review and Approval' : ['Design Submittal Review', 'Final Review Meeting with Owner Signoff', 'Notice to Proceed with Next Phase of Design'],
    'Construction Documents' : 
    ['Ongoing Design Meetings', 'Ongoing Project Control'],
    'Construction Documents Review and Approval' :
     ['Design Submittal Review', 'Final Review Meeting with Owner Signoff', 'Notice to Proceed with Next Phase of Design'],
    'Project Environment Overview' : 
    ['General Economic and Market Condition Overview', 'Recognition / Monitoring of Unforeseeable Acts of God. Labor Strikes, etc.'],
    'External Participants-Selection of Management' : 
    ['Non-Construction Participants', 'Outside Consultants'],
    'Owners Influencers' : 
    ['Other Project Influencers (Staff, Finanace, Legal, etc.)', 'Government', 'Community'],
    'Other External Influencers' : 
    ['Adjacent Owners', 'Utilities'],
    'Selection of Bidders' : 
    ['Establish Criteria', 'Develop Request for Qualifications', 'Advertise and Issue Request for Qualifications', 'Ranking Process', 'Interview Process', 'Select Qualified Bidders'],
    'Contractor Bidding' : 
    ['Issue Bid Documents', 'Pre-Bid Meeting', 'Addenda', 'Bids Due', 'Analyze Bids'],
    'Contract Negotiations' : 
    ['Scope Review', 'Negotiate Final Costs', 'Prepare Contract', 'Contract Review', 'Finalize and Execute Contract'],
    'Permits' : 
    ['Permit Application', 'Permit Application Format', 'Permit Denial', 'Expediting the Permit Process', 'Obtain Permit'],
    'Initial Project Meeting' : 
    ['Initial Project Meeting'],
    'Post-Award Pre-Construction' : 
    ['Mobilization', 'Subcontractor Selection & Approval', 'Commence Construction'],
    'Ongoing Project Management' : 
    ['Interim Project Monitoring', 'Payment Process', 'Change Order Process'],
    'Project Closeout and Occupancy' : 
    ['Project Closeout', 'Occupancy']
}
]

return stepsData[0];

};



export function tasksData(){

  const taskData = [
    
    {
      task1:
      {
        id: 1,
        name: 'task 1', 
        due_date: '11/22/33',
        critical: true, 
        user_id: 2,
        assignee: 'Director', 
        step_id: 1122, 
        step_name: 'Develop Request for Qualifications',
        template_file: 'file1', 
        task_manager: 2, 
        task_approved_by: 2,
      },

     task2: 
      {
        id: 2,
        name: 'task 2', 
        due_date: '12/19/33',
        critical: false, 
        user_id: 1,
        assignee:  'Owner (Client)', 
        step_id: 1234, 
        step_name: 'Ranking Process',
        template_file: 'file2', 
        task_manager: 1, 
        task_approved_by: 1,
      }
    }
  ]
    
    return taskData[0];
};
