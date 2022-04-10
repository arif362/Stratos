/*
/**
* Helpful Mirage Links
*
* https://miragejs.com/docs/getting-started/introduction/
* https://miragejs.com/docs/workflow-tips/
* https://dev.to/alexgurr/turning-a-react-app-into-a-pwa-with-offline-detection-service-workers-and-theming-142i
*
*/
 
import Rails from '@rails/ujs'
import { isNull } from 'lodash'
import { createServer, Model, JSONAPISerializer } from 'miragejs'
 
export function makeMirageServer({ environment = 'test' }) {
 return createServer({
   environment,
   serializers: {
     application: JSONAPISerializer,
   },
   models: {
     project: Model,
     risk: Model,
     phases: Model,
     components: Model,
     steps: Model,
     tasks: Model,
     contacts: Model,
     schedule: Model,
   },
 
   routes() {
        
     this.get("/api/phases", (schema, request) => {
       return schema.phases.all()
     })
 
     this.get('/api/tasks', (schema, request) => {
       return schema.tasks.all()
     })
     this.get("/api/tasks/:id", (schema, request) => {
       return schema.tasks.find(request.params.id)
     })
 
     this.patch("/api/tasks/:id", (schema, request) => {
       let attrs = this.normalizeRequestAttrs(request)
       let task = schema.tasks.find(request.params.id)
       task.update(attrs)
       return task
     })
 
     this.get("/api/phases/:id/components", (schema, request) => {
       return schema.components.where({phaseid: request.params.id})
     })
    
     this.get('/api/steps', (schema, request) => {
       return schema.steps.all()
     })
    
     this.get("/api/phases/:id/components/:id/steps", (schema, request) => {
       return schema.steps.where({processComponentId: request.params.id})
     })
    
     this.post("/api/steps", (schema, request) => {
       return schema.steps.create(JSON.parse(request.requestBody))
     })
 
     this.get('/api/tasks', (schema, request) => {
       return schema.tasks.all()
     })
     this.get('/api/phases/:id/components/:id/steps/:id/tasks', (schema, request) => {
       return schema.tasks.where({stepId: request.params.id})
     })
     this.post("/api/tasks", (schema, request) => {
       return schema.tasks.create(JSON.parse(request.requestBody))
     })
 
     this.get('/api/schedule', (schema, request) => {
       return schema.schedule.all()
     })
 
 
     this.passthrough()
   },
   seeds(server) {
 
     // -------- PHASES ---------
     server.create('phase', {
       id: 10,
       name: 'PREDESIGN',
       project_id: 1
     })
     server.create('phase', {
       id: 20,
       name: 'DESIGN TEAM SELECTION',
       project_id: 1
     })
     server.create('phase', {
       id: 30,
       name: 'DESIGN ACTIVITIES',
       project_id: 1
     })
     server.create('phase', {
       id: 40,
       name: 'NON-DESIGN ACTIVITIES',
       project_id: 1
     })
     server.create('phase', {
       id: 50,
       name: 'CONTRACTOR SELECTION',
       project_id: 1
     })
     server.create('phase', {
       id: 60,
       name: 'CONSTRUCTION PHASE',
       project_id: 1
     })
 
    //
    //
    //
    // ALL PHASES ARE COMPLETE
    //
    //
    //
 
// -------- MODS ---------
// PREDESIGN > components/mods --- COMPLETE
     server.create('component', {
       id: 1010,
       uid: 1010,
       name: 'Need Identification',
       phaseid: 10
     })
 
     server.create('component', {
       id: 1020,
       uid: 1020,
       name: 'Need Validation',
       phaseid: 10
     })
 
     server.create('component', {
       id: 1030,
       uid: 1030,
       name: 'Project Definition',
       phaseid: 10
     })
 
//DESIGN TEAM SELECTION > components/mods --- COMPLETE
     server.create('component', {
       id: 2010,
       uid: 2010,
       name: 'IDENTIFY DESIGN TEAM & CONTRACTUAL GROUPING',
       phaseid: 20
     })
 
     server.create('component', {
       id: 2020,
       uid: 2020,
       name: 'TEAM MEMBER SELECTION PROCESS',
       phaseid: 20
     })
     server.create('component', {
       id: 2030,
       uid: 2030,
       name: 'FEE NEGOTIATION FOR EACH TEAM MEMBER',
       phaseid: 20
     })
 
// DESIGN ACTIVITIES > components/mods --- COMPLETE
     server.create('component', {
       id: 3010,
       uid: 3010,
       name: 'INITIAL DESIGN TEAM MEETING',
       phaseid: 30
     })
    
     server.create('component', {
       id: 3020,
       uid: 3020,
       name: 'SCHEMATIC DESIGN',
       phaseid: 30
     })
 
     server.create('component', {
       id: 3030,
       uid: 3030,
       name: 'SD REVIEW AND APPROVAL',
       phaseid: 30
     })
 
     server.create('component', {
       id: 3040,
       uid: 3040,
       name: 'DESIGN DEVELOPMENT',
       phaseid: 30
     })
 
     server.create('component', {
       id: 3050,
       uid: 3050,
       name: 'DD REVIEW AND APPROVAL',
       phaseid: 30
     })
 
     server.create('component', {
       id: 3060,
       uid: 3060,
       name: 'CONSTRUCTION DOCUMENTS',
       phaseid: 30
     })
 
     server.create('component', {
       id: 3070,
       uid: 3070,
       name: 'CONSTRUCTION DOCUMENT REVIEW AND APPROVAL',
       phaseid: 30
     })
 
// NON-DESIGN ACTIVITIES > components/mods --- COMPLETE
     server.create('component', {
       id: 4010,
       uid: 4010,
       name: 'PROJECT ENVIRONMENT OVERVIEW',
       phaseid: 40
     })
 
     server.create('component', {
       id: 4020,
       uid: 4020,
       name: 'EXTERNAL PARTICIPANTS SELECTION OF MANAGEMENT',
       phaseid: 40
     })
 
     server.create('component', {
       id: 4030,
       uid: 4030,
       name: 'OWNERS INFLUENCERS',
       phaseid: 40
     })
 
     server.create('component', {
       id: 4040,
       uid: 4040,
       name: 'OTHER EXTERNAL INFLUENCERS',
       phaseid: 40
     })
 
// CONTRACTOR SELECTION > components/mods --- COMPLETE
     server.create('component', {
       id: 5010,
       uid: 5010,
       name: 'SELECTION OF BIDDERS',
       phaseid: 50
     })
 
     server.create('component', {
       id: 5015,
       uid: 5015,
       name: 'CONTRACTOR BIDDING',
       phaseid: 50
     })
 
     server.create('component', {
       id: 5020,
       uid: 5020,
       name: 'CONTRACT NEGOTIATIONS',
       phaseid: 50
     })
 
     server.create('component', {
       id: 5030,
       uid: 5030,
       name: 'PERMITS',
       phaseid: 50
     })
 
     server.create('component', {
       id: 5040,
       uid: 5040,
       name: 'INITIAL PROJECT MEETING',
       phaseid: 50
     })
 
//CONSTRUCTION PHASE > components/mods --- COMPLETE
  
     server.create('component', {
       id: 6010,
       uid: 6010,
       name: 'POST-AWARD PRE-CONSTRUCTION',
       phaseid: 60
     })
 
     server.create('component', {
       id: 6020,
       uid: 6020,
       name: 'ONGOING PROJECT MANAGEMENT',
       phaseid: 60
     })
 
     server.create('component', {
       id: 6030,
       uid: 6030,
       name: 'PROJECT CLOSEOUT AND OCCUPANCY',
       phaseid: 60
     })
    
     //
     //
     //
     // ALL COMPONENTS ARE COMPLETE
     //
     //
     //
 
 
    
// -------- STEPS ---------     
// step for Mod: 1010 Need Identification --- COMPLETE
     server.create('step', {
       id: 101010,
       name: 'Need Identification',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 1010,
     })
 
//steps for Mod: 1020 Need Validation --- COMPLETE
     server.create('step', {
       id: 102010,
       name: 'Assemble Owner Need Validation Team',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 1020,
     })
 
     server.create('step', {
       id: 102020,
       name: 'Owner Need Assessment',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 1020,
     })
 
// steps for Mod: 1030 Project Definition --- COMPLETE
     server.create('step', {
       id: 103010,
       name: 'Assemble Project Definition Team',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 1030,
     })
 
     server.create('step', {
       id: 103020,
       name: 'Project Modeling (Identify)' ,
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 1030,
     })
 
     server.create('step', {
       id: 103025,
       name: 'Project Modeling (Document)',
       starts_at: ' 31/12/22',
       ends_at: ' 31/12/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 1030,
     })
 
 
     server.create('step', {
       id: 103030,
       name: 'Definition of Optimum Scope',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 1030,
     })
 
     server.create('step', {
       id: 103040,
       name: 'Approve Project Definition',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 1030,
     })
 
     // ALL STEPS AND COMPONENTS FOR PREDESIGN ARE ADDED
 
// steps for Mod: 2010 Identify Design Team and Contractual Grouping --- COMPLETE
     server.create('step', {
       id: 201010,
       name: 'Identify Required Consultants',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 2010,
     })
 
     server.create('step', {
       id: 201020,
       name: 'Identify Required Contractor Participation',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 2010,
     })
 
     server.create('step', {
       id: 201030,
       name: 'Delivery Systems Contractual Groupings',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 2010,
     })
 
// steps for Mod: 2020 Team Member Selection Process --- COMPLETE    
     server.create('step', {
       id: 202010,
       name: 'Estabish Criteria',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 2020,
     })
 
     server.create('step', {
       id: 202020,
       name: 'Develop Request for Qualifications',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 2020,
     })
 
     server.create('step', {
       id: 202030,
       name: 'Advertise/Issue Request for Qualifications',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 2020,
     })
 
     server.create('step', {
       id: 202040,
       name: 'Ranking Process',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 2020,
     })
 
     server.create('step', {
       id: 202050,
       name: 'Interview Process',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 2020,
     })
 
// steps for Mod: 2030 Fee Negotiation for Each Team Member --- COMPLETE     
     server.create('step', {
       id: 203010,
       name: 'Address Major Issues',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 2030,
     })
 
     server.create('step', {
       id: 203020,
       name: 'Entering into Fee Agreement',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 2030,
     })
 
     server.create('step', {
       id: 203030,
       name: 'Legal Review',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 2030,
     })
 
     server.create('step', {
       id: 203040,
       name: 'Contract Finalization',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 2030,
     })
 
     server.create('step', {
       id: 203050,
       name: 'Contract Signature',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 2030,
     })
 
     // ALL STEPS AND COMPONENTS FOR DESIGN TEAM SELECTION ARE ADDED
 
// steps for Mod: 3010 Intial Design Team Meeting --- COMPLETE
 
     server.create('step', {
       id: 301010,
       name: 'Restate Owner Project Goals',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3010,
     })
 
     server.create('step', {
       id: 301020,
       name: 'Focus on Risk',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3010,
     })
 
     server.create('step', {
       id: 301030,
       name: 'Overview of Project Management Plan',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3010,
     })
 
     server.create('step', {
       id: 301040,
       name: 'Review Communication Process',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3010,
     })
 
     server.create('step', {
       id: 301050,
       name: 'Review Critical Design Controllers',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3010,
     })
 
     server.create('step', {
       id: 301060,
       name: 'Review Design Influencers',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3010,
     })
 
// steps for Mod: 3020 Design Team Selection --- COMPLETE
    
     server.create('step', {
       id: 302010,
       name: 'Ongoing Design Meetings',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3020,
     })
 
     server.create('step', {
       id: 302020,
       name: 'Ongoing Project Control',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3020,
     })

     server.create('step', {
      id: 302025,
      name: ' ',
      starts_at: '11/11/22',
      ends_at: '12/11/22',
      completed_at: null,
      updated_at: null,
      user_role_id: 10,
      processComponentId: 3020,
    })
 
// steps for Mod: 3030 SD Review and Approval --- COMPLETE     
     server.create('step', {
       id: 303010,
       name: 'Design Submittal Review',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3030,
     })
 
     server.create('step', {
       id: 303020,
       name: 'Final Review Meeting With Owner Signoff',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3030,
     })
 
     server.create('step', {
       id: 303030,
       name: 'Notice to Proceed with Next Phase of Design',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3030,
     })
 
// steps for Mod: 3040 Design Development --- COMPLETE     
 
     server.create('step', {
       id: 304010,
       name: 'Ongoing Design Meetings',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3040,
     })
 
     server.create('step', {
       id: 304020,
       name: 'Ongoing Project Control',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3040,
     })

     server.create('step', {
      id: 304025,
      name: ' ',
      starts_at: '11/11/22',
      ends_at: '12/11/22',
      completed_at: null,
      updated_at: null,
      user_role_id: 10,
      processComponentId: 3040,
    })
 
// steps for Mod: 3050 Review and Approval --- COMPLETE     
 
     server.create('step', {
       id: 305010,
       name: 'Design Submittal Review',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3050,
     })
 
     server.create('step', {
       id: 305020,
       name: 'Final Review Meeting With Owner Signoff',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3050,
     })
 
     server.create('step', {
       id: 305030,
       name: 'Notice to Proceed with Next Phase of Design',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3050,
     })
 
// steps for Mod: 3060 Construction Documents --- COMPLETE
 
     server.create('step', {
       id: 306010,
       name: 'Ongoing Design Meetings',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3060,
     })
 
     server.create('step', {
       id: 306020,
       name: 'Ongoing Project Control',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3060,
     })
     
     server.create('step', {
      id: 306025,
      name: ' ',
      starts_at: '11/11/22',
      ends_at: '12/11/22',
      completed_at: null,
      updated_at: null,
      user_role_id: 10,
      processComponentId: 3060,
    })
 
// steps for Mod: 3070 CD Review and Approval --- COMPLETE     
 
     server.create('step', {
       id: 307010,
       name: 'Design Submittal Review',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3070,
     })
 
     server.create('step', {
       id: 307020,
       name: 'Final Review Meeting With Owner Signoff',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3070,
     })
 
     server.create('step', {
       id: 307030,
       name: 'Notice to Proceed with Next Phase of Design',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 3070,
     })
 
// steps for Mod: 4010 Project Environment Overview --- COMPLETE
 
     server.create('step', {
       id: 401010,
       name: 'Genderal Economic and Market Condition Overview',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 4010,
     })
 
     server.create('step', {
       id: 401020,
       name: 'Recognition/Monitoring of Unforeseeable Acts of God. Labor Strikes etc',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 4010,
     })
 
// steps for Mod: 4020 External Participants-Selection of Management --- COMPLETE
 
     server.create('step', {
       id: 402010,
       name: 'Non-Construction Participants',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 4020,
     })
 
     server.create('step', {
       id: 402020,
       name: 'Outside Consultants',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 4020,
     })
 
// steps for Mod: 4030 Owner's Influencers --- COMPLETE    
 
     server.create('step', {
       id: 403010,
       name: 'Other Project Influencers (Staff, Finance, Legal, etc)',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 4030,
     })
    
     server.create('step', {
       id: 403020,
       name: 'Government',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 4030,
     })
 
     server.create('step', {
       id: 403030,
       name: 'Community',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 4030,
     })
 
// steps for Mod: 4040 Other External Influencers --- COMPLETE
 
     server.create('step', {
       id: 404010,
       name: 'Adjacent Owners',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 4040,
     })
 
     server.create('step', {
       id: 404020,
       name: 'Utilities',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 4040,
     })
 
// steps for Mod: 5010 Selection of Bidders --- COMPLETE   
    
     server.create('step', {
       id: 501010,
       name: 'Establish Criteria',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5010,
     })
 
     server.create('step', {
       id: 501020,
       name: 'Develop Request for Qualifications',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5010,
     })
 
     server.create('step', {
       id: 501030,
       name: 'Advertise and Issue Request for Qualifications',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5010,
     })
 
     server.create('step', {
       id: 501040,
       name: 'Ranking Process',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5010,
     })
 
     server.create('step', {
       id: 501050,
       name: 'Interview Process',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5010,
     })
 
     server.create('step', {
       id: 501060,
       name: 'Select Qualified Bidders',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5010,
     })
 
// steps for Mod: 5015 Contractor Bidding --- COMPLETE     
 
     server.create('step', {
       id: 501510,
       name: 'Issue Bid Documents',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5015,
     })
 
     server.create('step', {
       id: 501520,
       name: 'Pre-Bid Meeting',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5015,
     })
 
     server.create('step', {
       id: 501530,
       name: 'Addenda',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5015,
     })
 
     server.create('step', {
       id: 501540,
       name: 'Bids Due',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5015,
     })
 
     server.create('step', {
       id: 501550,
       name: 'Analyze Bids',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5015,
     })
 
// steps for Mod: 5020 Contractor Negotiations --- COMPLETE     
 
     server.create('step', {
       id: 502010,
       name: 'Scope Review',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5020,
     })
 
     server.create('step', {
       id: 502020,
       name: 'Negotiation Final Costs',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5020,
     })
 
     server.create('step', {
       id: 502030,
       name: 'Prepare Contract',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5020,
     })
 
     server.create('step', {
       id: 502040,
       name: 'Contract Review',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5020,
     })
 
     server.create('step', {
       id: 502050,
       name: 'Finalize and Execute Contract',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5020,
     })
 
// steps for Mod: 5030 Permits --- COMPLETE
 
     server.create('step', {
       id: 503010,
       name: 'Permit Application',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5030,
     })
 
     server.create('step', {
       id: 503020,
       name: 'Permit Application Format',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5030,
     })
 
     server.create('step', {
       id: 503030,
       name: 'Permit Denial',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5030,
     })
 
     server.create('step', {
       id: 503040,
       name: 'Expediting the Permit Process',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5030,
     })
 
     server.create('step', {
       id: 503050,
       name: 'Obtain Permit',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5030,
     })
 
// steps for Mod: 5040 Initial Project Meeting --- COMPLETE     
 
     server.create('step', {
       id: 504010,
       name: 'Initial Project Meeting',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 5040,
     })
 
// steps for Mod: 6010 Post-Award Pre-Construction --- COMPLETE    
 
     server.create('step', {
       id: 601010,
       name: 'Mobilization',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 6010,
     })
 
     server.create('step', {
       id: 601015,
       name: 'Subcontractor Selection and Approval',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 6010,
     })
 
     server.create('step', {
       id: 601020,
       name: 'Commence Construction',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 6010,
     })
 
// steps for Mod: 6020 Ongoing Project Management --- COMPLETE     
 
     server.create('step', {
       id: 602010,
       name: 'Interim Project Monitoring',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 6020,
     })
 
     server.create('step', {
       id: 602020,
       name: 'Payment Process',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 6020,
     })
 
     server.create('step', {
       id: 602030,
       name: 'Change Order of Process',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 6020,
     })
 
// steps for Mod: 6030: Project Closeout and Occupancy --- COMPLETE
 
     server.create('step', {
       id: 603010,
       name: 'Project Closeout',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 6030,
     })
 
     server.create('step', {
       id: 603020,
       name: 'Occupancy',
       starts_at: '11/11/22',
       ends_at: '12/11/22',
       completed_at: null,
       updated_at: null,
       user_role_id: 10,
       processComponentId: 6030,
     })
 
 
// Tasks for Step: 101010 Need Identification > Mod: 1010 Need Identification
server.create('task',{
 uid: 10101001,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Identify Project Need',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 1,
 assignee: 'Owner (Client)',
 stepId: 101010,
 step_name: 'Need Identification',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks: 0,
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
server.create('task',{
 uid: 10101002,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Appoint OSG',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 2,
 assignee: 'Director',
 stepId: 101010,
 step_name: 'Need Identification',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks: [
   {
      parentId: 10101001,
      startAnchor: "bottom",
      endAnchor: "top"
   },
  ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
 
// Tasks for Step: 102010 Assemble Owner Need Validation Team > Mod: 1020 Need Validation
server.create('task',{
 uid: 10201001,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Assemble Owner Need Validation Team',
 //yes this task name is the same as its step name ^^
 due_date: '11/22/33',
 critical: false,
 assignee_id: 1,
 assignee: 'Owner (Client)',
 stepId: 102010,
 step_name: 'Assemble Owner Need Validation Team',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks: 0,
created_at: 'NULL',
updated_at: 'NULL',
project_id: 1,
 task_approved_by: 2
})
 
//Tasks for Step: 102020 Owner Need Assessment  > Mod: 1020 Need Validation
server.create('task',{
 uid: 10202001,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Review source of need perception',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 5,
 assignee: 'Contractor',
 stepId: 102020,
 step_name: 'Owner Need Assessment',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks: [
   {
      parentId: 10201001,
      startAnchor: "right",
      endAnchor: "left"
   },
  ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
server.create('task',{
 uid: 10202002,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Test need addressing decision factors',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 5,
 assignee: 'Contractor',
 stepId: 102020,
 step_name: 'Owner Need Assessment',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks:[
   {
      parentId: 10202001,
      startAnchor: "bottom",
      endAnchor: "top"
   },
  ],
created_at: 'NULL',
updated_at: 'NULL',
project_id: 1,
 task_approved_by: 2
})
 
 
server.create('task',{
 uid: 10202003,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Determine & weight decision factors',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 5,
 assignee: 'Contractor',
 stepId: 102020,
 step_name: 'Owner Need Assessment',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks:[
   {
     parentId: 10202002,
     startAnchor: "bottom",
     endAnchor: "top"
 
   },
  ],
created_at: 'NULL',
updated_at: 'NULL',
project_id: 1,
 task_approved_by: 2
})
 
 
server.create('task',{
 uid: 10202004,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Establish a need validation benchmark',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 5,
 assignee: 'Contractor',
 stepId: 102020,
 step_name: 'Owner Need Assessment',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks: [
   {
     parentId: 10202003,
     startAnchor: "bottom",
     endAnchor: "top"
 
   },
  ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
task_approved_by: 2
})
 
server.create('task',{
 uid: 10202005,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Recommend for or against preparation of project definition',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 5,
 assignee: 'Contractor',
 stepId: 102020,
 step_name: 'Owner Need Assessment',
 template_file_id: 'file1',
  previousTasks: [
   {
      parentId: 10202004,
      startAnchor: "bottom",
      endAnchor: "top"
 
   },
  ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_manager: 3,
 task_approved_by: 2
})
 
server.create('task',{
 uid: 10202006,
 Status: 2,
 Impact: 1,
 Ranking: 1,
 name: 'Authorize project definition',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 1,
 assignee: 'Owner (Client)',
 stepId: 102020,
 step_name: 'Owner Need Assessment',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks:[
   {
     parentId:10202005,
     startAnchor: "right",
     endAnchor: "right"
   },
  ],
created_at: 'NULL',
updated_at: 'NULL',
project_id: 1,
 task_approved_by: 2
})
 
// Tasks for Step: 103010 Assemble Project Definition Team > Mod: 1030 Project Definition
server.create('task',{
 uid: 10301001,
 Status: 3,
 Impact: 1,
 Ranking: 1,
 name: 'Assemble Internal Project Definition Team',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 1,
 assignee: 'Owner (Client)',
 stepId: 103010,
 step_name: 'Assemble Project Definition Team',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks: [
   {
      parentId: 10301002,
      startAnchor: "top",
      endAnchor: "bottom"
   },
  ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
 
server.create('task',{
 uid: 10301002,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Identify expertise required for project definition',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 2,
 assignee: 'Director',
 stepId: 103010,
 step_name: 'Assemble Project Definition Team',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks: 0,
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
 
server.create('task',{
 uid: 10301003,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Qualify & retain Outside Team Members',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 2,
 assignee: 'Director',
 stepId: 103010,
 step_name: 'Assemble Project Definition Team',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks:[
   {
      parentId: 10301002,
      startAnchor: "bottom",
      endAnchor: "top"
   },
  ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})

// Tasks for Step: 103020 Project Modeling (Identify) > Mod: 1030 Project Definition
server.create('task',{
 uid: 10302001,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Review & Accept project definition',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 1,
 assignee: 'Owner (Client)',
 stepId: 103020,
 step_name: 'Project Modeling (Identify)',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks: [
   {
      parentId: 10301001,
      startAnchor: "right",
      endAnchor: "left"
   },
   {
      parentId: 10302507,
      startAnchor: "top",
      endAnchor: "bottom"
   },
  ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
server.create('task',{
 uid: 10302002,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Identify Needs',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 2,
 assignee: 'Director',
 stepId: 103020,
 step_name: 'Project Modeling (Identify)',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks: [
   {
     parentId: 10302001,
     startAnchor: "bottom",
     endAnchor: "top"
  },
  {
     parentId: 10302507,
     startAnchor: "left",
     endAnchor: "right"
   },
  ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
server.create('task',{
 uid: 10302003,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Feasibility',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 2,
 assignee: 'Director',
 stepId: 103020,
 step_name: 'Project Modeling (Identify)',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks:[
   {
     parentId: 10302002,
     startAnchor: "bottom",
     endAnchor: "top"
  },
  ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
 
server.create('task',{
 uid: 10302004,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Identify external project influencers',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 2,
 assignee: 'Director',
 stepId: 103020,
 step_name: 'Project Modeling (identify)',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks:[
   {
     parentId: 10302003,
     startAnchor: "bottom",
     endAnchor: "top"
  }
  ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
server.create('task',{
 uid: 10302005,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Identify non-design & construction project participants',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 2,
 assignee: 'Director',
 stepId: 103020,
 step_name: 'Project Modeling (Identify)',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks:[
   {
     parentId: 10302004,
     startAnchor: "bottom",
     endAnchor: "top"
  },
  ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
server.create('task',{
 uid: 10302006,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Identify project intangibles & logistical issues',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 2,
 assignee: 'Director',
 stepId: 103020,
 step_name: 'Project Modeling (Identify)',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks: [
   {
      parentId: 10302005,
      startAnchor: "bottom",
      endAnchor: "top"
   },
   {
      parentId: 10302512,
      startAnchor: "left",
      endAnchor: "right"
   },
   {
    parentId: 10302013,
    startAnchor: "top",
    endAnchor: "bottom"
 },
  ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})

server.create('task',{
  uid: 10302013,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Perform Project Programming & Feasibility Activities',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 3,
  assignee: 'Consultant',
  stepId: 103020,
  step_name: 'Project Modeling (Identify)',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:[
    {
      parentId: 10301003,
      startAnchor: "bottom",
      endAnchor: "left"
    },
    {
      parentId: 10302014,
      startAnchor: "top",
      endAnchor: "bottom"
    },
   ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })
  
 server.create('task',{
  uid: 10302014,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Perform Project Programming & Feasibility Activities',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 4,
  assignee: 'Architect / Engineer',
  stepId: 103020,
  step_name: 'Project Modeling (Identify)',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks: [
    {
      parentId: 10301003,
      startAnchor: "bottom",
      endAnchor: "left"
    },
   ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })
   
// Tasks for Step: 103025 Project Modeling (Document) > Mod: 1030 Project Definition
server.create('task',{
 uid: 10302507,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Create Documentation',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 2,
 assignee: 'Director',
 stepId: 103025,
 step_name: 'Project Modeling (Document)',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks:[
   {
      parentId: 10302002,
      startAnchor: "right",
      endAnchor: "left"
   }
  ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
server.create('task',{
 uid: 10302508,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Cost Model',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 2,
 assignee: 'Director',
 stepId: 103025,
 step_name: 'Project Modeling (Document)',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks: [
   {
      parentId: 10302507,
      startAnchor: "bottom",
      endAnchor: "top"
   }  
 ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
server.create('task',{
 uid: 10302509,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Schedule',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 2,
 assignee: 'Director',
 stepId: 103025,
 step_name: 'Project Modeling (Document)',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks: [
   {
      parentId: 10302508,
      startAnchor: "bottom",
      endAnchor: "top"
   }       
 ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
 
server.create('task',{
 uid: 10302510,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Risk Strategy',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 2,
 assignee: 'Director',
 stepId: 103025,
 step_name: 'Project Modeling (Document)',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks:[
   {
      parentId: 10302509,
      startAnchor: "bottom",
      endAnchor: "top"
   }  
 ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
 
server.create('task',{
 uid: 10302511,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Delivery System',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 2,
 assignee: 'Director',
 stepId: 103025,
 step_name: 'Project Modeling (Document)',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks: [
   {
      parentId: 10302510,
      startAnchor: "bottom",
      endAnchor: "top"
   }       
 ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
 
server.create('task',{
 uid: 10302512,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Support Project Definition Activities as needed',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 3,
 assignee: 'Consultant',
 stepId: 103025,
 step_name: 'Project Modeling (Document)',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks:[
   {
      parentId: 10302006,
      startAnchor: "right",
      endAnchor: "left"
   },
   {
      parentId: 10302511,
      startAnchor: "bottom",
      endAnchor: "top"
   },        
 ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
//Tasks for Step: 103030 Definition of Optimum Scope > Mod Project Definition
server.create('task',{
 uid: 10303001,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Document project definition',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 2,
 assignee: 'Director',
 stepId: 103030,
 step_name: 'Definition of Optimum Scope',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks: [
   {
      parentId: 10302001,
      startAnchor: "right",
      endAnchor: "top"
   },    
 ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
//Tasks for Step: 103040 Approve Project Definition > Mod Project Definition
server.create('task',{
 uid: 10304001,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Review all information and reports by Owner',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 1,
 assignee: 'Owner (Client)',
 stepId: 103040,
 step_name: 'Approve Project Definition',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks:[
   {
      parentId: 10303001,
      startAnchor: "right",
      endAnchor: "left"
   },    
 ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
server.create('task',{
 uid: 10304002,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Accept that the goals will fulfill the identified need',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 1,
 assignee: 'Owner (Client)',
 stepId: 103040,
 step_name: 'Approve Project Definition',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks: [
   {
      parentId: 10304001,
      startAnchor: "bottom",
      endAnchor: "top"
   },    
 ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
 
server.create('task',{
 uid: 10304003,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Decide to implement the project',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 1,
 assignee: 'Owner (Client)',
 stepId: 103040,
 step_name: 'Approve Project Definition',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks: [
   {
      parentId: 10304002,
      startAnchor: "bottom",
      endAnchor: "top"
   },    
 ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
 
server.create('task',{
 uid: 10304004,
 Status: 1,
 Impact: 1,
 Ranking: 1,
 name: 'Send notification to proceed',
 due_date: '11/22/33',
 critical: false,
 assignee_id: 1,
 assignee: 'Owner (Client)',
 stepId: 103040,
 step_name: 'Approve Project Definition',
 template_file_id: 'file1',
 task_manager: 3,
 previousTasks: [
   {
      parentId: 10304003,
      startAnchor: "bottom",
      endAnchor: "top"
   },    
 ],
 created_at: 'NULL',
 updated_at: 'NULL',
 project_id: 1,
 task_approved_by: 2
})
 
 //Tasks for Step: 201010 Approve Project Definition > Mod Project Definition
 server.create('task',{
  uid: 20101001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Identify Required Consultants',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Owner (Client)',
  stepId: 201010,
  step_name: 'Identify Required Consultants',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks: 0,    
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })
  
 server.create('task',{
  uid: 20102001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Identify Necessary Contractors for Delivery System',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Owner (Client)',
  stepId: 201020,
  step_name: 'Identify Required Contractor Participation',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20101001,
       startAnchor: "right",
       endAnchor: "left"
    },    
  ],    
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20103001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Identify other specialist organization for delivery system',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Owner (Client)',
  stepId: 201030,
  step_name: 'Delivery Systems Contractual Groupings',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20102001,
       startAnchor: "right",
       endAnchor: "left"
    },    
  ],    
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })
//Tasks for Step: 202010 Approve Project Definition > Mod Project Definition
server.create('task',{
  uid: 20201001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Review and Approve Contractual Grouping & Selection Criteria',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Owner (Client)',
  stepId: 202010,
  step_name: 'Establish Criteria',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20201002,
       startAnchor: "top",
       endAnchor: "bottom"
    },    
  ],        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20201002,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Identify Selection Criteria',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 202010,
  step_name: 'Establish Criteria',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks: 0,        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })
   
 server.create('task',{
  uid: 20202001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Approve Request for Qualifications',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Owner (Client)',
  stepId: 202020,
  step_name: 'Develop Request for Qualifications',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20202002,
       startAnchor: "top",
       endAnchor: "bottom"
    },    
  ],        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20202002,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Develop Request for Qualifications',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 202020,
  step_name: 'Develop Request for Qualifications',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20201001,
       startAnchor: "right",
       endAnchor: "left"
    },    
  ],        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20203000,
  Status: 4,
  Impact: 1,
  Ranking: 1,
  name: 'Note: Private vs. Public',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 202030,
  step_name: 'Advertise & Issue Request for Qualifications',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks: 0,
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })


 server.create('task',{
  uid: 20203001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Advertise for Request for Qualifications',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 202030,
  step_name: 'Advertise & Issue Request for Qualifications',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20202001,
       startAnchor: "right",
       endAnchor: "left"
    },    
  ],        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20203002,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Issue Request for Qualifications',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 202030,
  step_name: 'Advertise & Issue Request for Qualifications',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20203001,
       startAnchor: "bottom",
       endAnchor: "top"
    },    
  ],        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })
 
 server.create('task',{
  uid: 20204001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Ranking Review Meeting with Owner',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Owner (Client)',
  stepId: 202040,
  step_name: 'Ranking Process',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20204003,
       startAnchor: "right",
       endAnchor: "right"
    },    
  ],        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })



 server.create('task',{
  uid: 20204002,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Receive RFQ’s',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 202040,
  step_name: 'Ranking Process',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20203002,
       startAnchor: "right",
       endAnchor: "left"
    },    
  ],        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20204003,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Summarize RFQ’s',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 202040,
  step_name: 'Ranking Process',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20204002,
       startAnchor: "bottom",
       endAnchor: "top"
    },    
  ],        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20204004,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Schedule Interviews & notify short listed',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 202040,
  step_name: 'Ranking Process',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20204001,
       startAnchor: "left",
       endAnchor: "left"
    },    
  ],        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20204005,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Send notification letter to non-selected respondents as to the status',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 202040,
  step_name: 'Ranking Process',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20204004,
       startAnchor: "bottom",
       endAnchor: "top"
    },    
  ],        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20205001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Conduct interviews',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Owner (Client)',
  stepId: 202050,
  step_name: 'Interview Process',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20205004,
       startAnchor: "right",
       endAnchor: "right"
    },    
  ],        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20205002,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Select Design Team Member',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Owner (Client)',
  stepId: 202050,
  step_name: 'Interview Process',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20205001,
       startAnchor: "bottom",
       endAnchor: "top"
    },    
  ],        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20205003,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Send notification to all interviewees',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Owner (Client)',
  stepId: 202050,
  step_name: 'Interview Process',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20205002,
       startAnchor: "bottom",
       endAnchor: "top"
    },    
  ],        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20205004,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Prepare for interviews',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 202050,
  step_name: 'Interview Process',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20204004,
       startAnchor: "right",
       endAnchor: "left"
    },    
  ],        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

// Steps for 020-030 "Fee Negotiation for Each Team Member"

server.create('task',{
  uid: 20301001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Identify draft contract including special conditions',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 203010,
  step_name: 'Address Major Issues',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  0,        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20301002,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Outline scope definition statement',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 203010,
  step_name: 'Address Major Issues',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks: 0,        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20301003,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Finalize deliverables under the agreement',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 203010,
  step_name: 'Address Major Issues',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks: 0,        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20301004,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'List any exclusions',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 203010,
  step_name: 'Address Major Issues',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:0,        
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20302001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Receive & review proposals (including comments on contract)',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 203020,
  step_name: 'Entering into Fee Agreement',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20301001,
       startAnchor: "right",
       endAnchor: "left"
    },    
    {
       parentId: 20301002,
       startAnchor: "right",
       endAnchor: "left"
    },         
    {
       parentId: 20301003,
       startAnchor: "right",
       endAnchor: "left"
    },    
    {
       parentId: 20301004,
       startAnchor: "right",
       endAnchor: "left"
    },    
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20303001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Owner to agree on contract terms with design team member',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Owner (Client)',
  stepId: 203030,
  step_name: 'Legal Review',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20303002,
       startAnchor: "top",
       endAnchor: "bottom"
    },    
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20303002,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Negotiate contract including fees',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 203030,
  step_name: 'Legal Review',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20303001,
       startAnchor: "left",
       endAnchor: "left"
    }, 
    {
      parentId: 20302001,
      startAnchor: "right",
      endAnchor: "left"
   },    
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20304001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Forward final contract to consultant',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 203040,
  step_name: 'Contract Finalization',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20303001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 20305001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Sign contract by all parties',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 203050,
  step_name: 'Contract Signature',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 20304001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })


//  3010 "Initial Design Team Meeting"

 server.create('task',{
  uid: 30101001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Confirm Owner Project Goals',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Owner (Client)',
  stepId: 301010,
  step_name: 'Restate Owner Project Goals',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30101002,
       startAnchor: "top",
       endAnchor: "bottom"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30101002,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Define for the design team the criteria for a successful project',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 301010,
  step_name: 'Restate Owner Project Goals',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  0,
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30102001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Hold risk management meeting',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 301020,
  step_name: 'Focus on Risk',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30101001,
       startAnchor: "right",
       endAnchor: "top"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30103001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Establish the team and explain roles',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 301030,
  step_name: 'Overview of Project Management Plan',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30102001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30103002,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Discuss and agree on master schedule & deliverable',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 301030,
  step_name: 'Overview of Project Management Plan',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30103001,
       startAnchor: "bottom",
       endAnchor: "top"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })


 server.create('task',{
  uid: 30104001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Establish the project communication method',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 301040,
  step_name: 'Review Communication Process',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30103001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30104002,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Identify & establish key meetings',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 301040,
  step_name: 'Review Communication Process',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30104001,
       startAnchor: "bottom",
       endAnchor: "top"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30105001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Review the critical design controllers',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 301050,
  step_name: 'Review Critical Design Controllers',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30104002,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30106001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Review critical design influencers',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 301060,
  step_name: 'Review Design Influencers',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30105001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

//  3020 "Schematic Design (SD)"

server.create('task',{
  uid: 30201001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Conduct and document regular project design meeting',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 302010,
  step_name: 'Ongoing Design Meetings',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  0,
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })


 server.create('task',{
  uid: 30202001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Cost Review',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 302020,
  step_name: 'Ongoing Project Control',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30201001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30202002,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Schedule Review',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 302020,
  step_name: 'Ongoing Project Control',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30201001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30202003,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Risk Review',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 302020,
  step_name: 'Ongoing Project Control',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30201001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30202004,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Value Engineering',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 302020,
  step_name: 'Ongoing Project Control',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30201001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30202005,
  Status: 4,
  Impact: 1,
  Ranking: 1,
  name: 'Schematic Design Architect Activities',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Architect / Engineer',
  stepId: 302020,
  step_name: 'Ongoing Project Control',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:   [
    {
       parentId: 30202503,
       startAnchor: "left",
       endAnchor: "right"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30202501,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Review Interim Project Update',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Owner (Client)',
  stepId: 302025,
  step_name: ' ',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:   [
    {
       parentId: 30202502,
       startAnchor: "top",
       endAnchor: "bottom"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30202502,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Interim Project Update',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 302025,
  step_name: ' ',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks: [
    {
       parentId: 30202001,
       startAnchor: "right",
       endAnchor: "left"
    },
    {
      parentId: 30202002,
      startAnchor: "right",
      endAnchor: "left"
   },   
   {
      parentId: 30202003,
      startAnchor: "right",
      endAnchor: "left"
    },
    {
      parentId: 30202004,
      startAnchor: "right",
      endAnchor: "left"
    },
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30202503,
  Status: 4,
  Impact: 1,
  Ranking: 1,
  name: 'Schematic Design Architect Activities',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Architect / Engineer',
  stepId: 302025,
  step_name: ' ',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30202005,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

//  3030 "SD Review and Approval"

server.create('task',{
  uid: 30301001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Receive & Review Submittal',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 303010,
  step_name: 'Design Submittal Review',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  0,
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30301002,
  Status: 4,
  Impact: 1,
  Ranking: 1,
  name: 'Schematic Design Architect Activities',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Architect / Engineer',
  stepId: 303010,
  step_name: 'Design Submittal Review',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks: 0,
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })
 
 server.create('task',{
  uid: 30302001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Owner to Review and Approve Design Submittal',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Owner (Client)',
  stepId: 303020,
  step_name: 'Final Review Meeting with Owner Signoff',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:   [
    {
       parentId: 30301001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30302002,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Revise Design Submittal',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Architect / Engineer',
  stepId: 303020,
  step_name: 'Final Review Meeting with Owner Signoff',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:   [
    {
       parentId: 30302001,
       startAnchor: "bottom",
       endAnchor: "top"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30303001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Send Notice to Proceed with Next Design Phase',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 303030,
  step_name: 'Notice to Proceed with Next Phase of Design',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:   [
    {
       parentId: 30302001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })



//  3040 "Schematic Design (DD)"

server.create('task',{
  uid: 30401001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Conduct and document regular project design meeting',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 304010,
  step_name: 'Ongoing Design Meetings',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  0,
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })


 server.create('task',{
  uid: 30402001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Cost Review',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 304020,
  step_name: 'Ongoing Project Control',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30401001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30402002,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Schedule Review',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 304020,
  step_name: 'Ongoing Project Control',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30401001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30402003,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Risk Review',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 304020,
  step_name: 'Ongoing Project Control',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30401001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30402004,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Value Engineering',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 304020,
  step_name: 'Ongoing Project Control',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30401001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30402005,
  Status: 4,
  Impact: 1,
  Ranking: 1,
  name: 'Schematic Design Architect Activities',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Architect / Engineer',
  stepId: 304020,
  step_name: 'Ongoing Project Control',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:   [
    {
       parentId: 30402503,
       startAnchor: "left",
       endAnchor: "right"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30402501,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Review Interim Project Update',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Owner (Client)',
  stepId: 304025,
  step_name: ' ',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:   [
    {
       parentId: 30402502,
       startAnchor: "top",
       endAnchor: "bottom"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30402502,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Interim Project Update',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 304025,
  step_name: ' ',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks: [
    {
       parentId: 30402001,
       startAnchor: "right",
       endAnchor: "left"
    },
    {
      parentId: 30402002,
      startAnchor: "right",
      endAnchor: "left"
   },   
   {
      parentId: 30402003,
      startAnchor: "right",
      endAnchor: "left"
    },
    {
      parentId: 30402004,
      startAnchor: "right",
      endAnchor: "left"
    },
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30402503,
  Status: 4,
  Impact: 1,
  Ranking: 1,
  name: 'Schematic Design Architect Activities',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Architect / Engineer',
  stepId: 304025,
  step_name: ' ',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30402005,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })


//***********&* */
//  3070 "CD Review and Approval"

server.create('task',{
  uid: 30501001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Receive & Review Submittal',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 305010,
  step_name: 'Design Submittal Review',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  0,
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30501002,
  Status: 4,
  Impact: 1,
  Ranking: 1,
  name: 'Schematic Design Architect Activities',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Architect / Engineer',
  stepId: 305010,
  step_name: 'Design Submittal Review',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks: 0,
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })
 
 server.create('task',{
  uid: 30502001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Owner to Review and Approve Design Submittal',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Owner (Client)',
  stepId: 305020,
  step_name: 'Final Review Meeting with Owner Signoff',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:   [
    {
       parentId: 30501001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30502002,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Revise Design Submittal',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Architect / Engineer',
  stepId: 305020,
  step_name: 'Final Review Meeting with Owner Signoff',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:   [
    {
       parentId: 30502001,
       startAnchor: "bottom",
       endAnchor: "top"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30503001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Send Notice to Proceed with Next Design Phase',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 305030,
  step_name: 'Notice to Proceed with Next Phase of Design',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:   [
    {
       parentId: 30502001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })


//  3060 "Schematic Design (CD)"

server.create('task',{
  uid: 30601001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Conduct and document regular project design meeting',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 306010,
  step_name: 'Ongoing Design Meetings',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  0,
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })


 server.create('task',{
  uid: 30602001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Cost Review',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 306020,
  step_name: 'Ongoing Project Control',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30601001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30602002,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Schedule Review',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 306020,
  step_name: 'Ongoing Project Control',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30601001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30602003,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Risk Review',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 306020,
  step_name: 'Ongoing Project Control',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30601001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30602004,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Value Engineering',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 306020,
  step_name: 'Ongoing Project Control',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30601001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30602005,
  Status: 4,
  Impact: 1,
  Ranking: 1,
  name: 'Schematic Design Architect Activities',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Architect / Engineer',
  stepId: 306020,
  step_name: 'Ongoing Project Control',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:   [
    {
       parentId: 30602503,
       startAnchor: "left",
       endAnchor: "right"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30602501,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Review Interim Project Update',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Owner (Client)',
  stepId: 306025,
  step_name: ' ',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:   [
    {
       parentId: 30602502,
       startAnchor: "top",
       endAnchor: "bottom"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30602502,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Interim Project Update',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 306025,
  step_name: ' ',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks: [
    {
       parentId: 30602001,
       startAnchor: "right",
       endAnchor: "left"
    },
    {
      parentId: 30602002,
      startAnchor: "right",
      endAnchor: "left"
   },   
   {
      parentId: 30602003,
      startAnchor: "right",
      endAnchor: "left"
    },
    {
      parentId: 30602004,
      startAnchor: "right",
      endAnchor: "left"
    },
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30602503,
  Status: 4,
  Impact: 1,
  Ranking: 1,
  name: 'Schematic Design Architect Activities',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Architect / Engineer',
  stepId: 306025,
  step_name: ' ',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  [
    {
       parentId: 30602005,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })



//  3070 "DD Review and Approval"

server.create('task',{
  uid: 30701001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Receive & Review Submittal',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 307010,
  step_name: 'Design Submittal Review',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:  0,
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30701002,
  Status: 4,
  Impact: 1,
  Ranking: 1,
  name: 'Schematic Design Architect Activities',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Architect / Engineer',
  stepId: 307010,
  step_name: 'Design Submittal Review',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks: 0,
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })
 
 server.create('task',{
  uid: 30702001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Owner to Review and Approve Design Submittal',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Owner (Client)',
  stepId: 307020,
  step_name: 'Final Review Meeting with Owner Signoff',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:   [
    {
       parentId: 30701001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30702002,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Revise Design Submittal',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Architect / Engineer',
  stepId: 307020,
  step_name: 'Final Review Meeting with Owner Signoff',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:   [
    {
       parentId: 30702001,
       startAnchor: "bottom",
       endAnchor: "top"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })

 server.create('task',{
  uid: 30703001,
  Status: 1,
  Impact: 1,
  Ranking: 1,
  name: 'Send Notice to Proceed with Next Design Phase',
  due_date: '11/22/33',
  critical: false,
  assignee_id: 1,
  assignee: 'Director',
  stepId: 307030,
  step_name: 'Notice to Proceed with Next Phase of Design',
  template_file_id: 'file1',
  task_manager: 3,
  previousTasks:   [
    {
       parentId: 30702001,
       startAnchor: "right",
       endAnchor: "left"
    },   
  ],
  created_at: 'NULL',
  updated_at: 'NULL',
  project_id: 1,
  task_approved_by: 2
 })


   }
 })
}
