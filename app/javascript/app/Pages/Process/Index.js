import React, { Component } from 'react'
import { client as apiClient } from 'utils/api';
import Section from 'Components/Common/Section'
import Map from 'Components/Process/Map'
import MapForm from 'Components/Process/Forms/Map'
import PhasesForm from 'Components/Process/Forms/Phases'
import ModulesForm from 'Components/Process/Forms/Modules'
import StepsForm from 'Components/Process/Forms/Steps'
import TasksForm from 'Components/Process/Forms/Tasks'
import
  ContentTwoColumn, { WideColumn, NarrowColumn }
from 'Components/Common/Layout/ContentTwoColumn'


class Index extends Component {


  render() {
    return (
      <ContentTwoColumn>
        <WideColumn>
          <Section>
            <h1 className="Section-h1 mb-2">Process Map</h1>
            <Map />
          </Section>
        </WideColumn>
        <NarrowColumn>
          <Section>
            <MapForm />
          </Section>
          <Section>
            <PhasesForm />
          </Section>
          <Section>
            <ModulesForm />
          </Section>
          <Section>
            <StepsForm />
          </Section>
          <Section>
            <TasksForm />
          </Section>
        </NarrowColumn>
      </ContentTwoColumn>
    )
  }
}
  
  export default Index