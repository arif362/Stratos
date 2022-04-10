import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { client as apiClient } from 'utils/api';
import { allProjects as projectsQueryKey } from 'utils/queryKeys';
import List from 'Components/Projects/List';
import Section from 'Components/Common/Section';
import Button from 'Components/Common/Button';
import BadgeSquare from 'Components/Common/BadgeSquare';

function Index() {

  async function getProjects() {
    const response = await apiClient.get("/projects")
    return response.data
  }

  const query = useQuery(projectsQueryKey, getProjects)

	return(
		<React.Fragment>
      <Section>
      <div className="flex justify-between">
        <h1 className="Section-h1">Project Summary</h1>
        <Link to="/projects/new">
          <Button buttonStyle={'orange-solid-button'}>
            Create New Project
          </Button>
        </Link>
      </div>
        { query.isLoading
          ? <p>Loading projects ...</p>
          : <List items={query.data} />
        }
      </Section>
      <Section>
        <h1 className="Section-h1">My Tasks</h1>
        <section className="p-3 flex flex-row justify-evenly">
          <BadgeSquare taskCount={7}>Over Due</BadgeSquare>
          <BadgeSquare taskCount={12}>Due Today</BadgeSquare>
          <BadgeSquare taskCount={29}>Total Pending</BadgeSquare>
        </section>
      </Section>
      <Section>
        <h2>Quick Notes</h2>
      </Section>
		</React.Fragment>
	)
}

export default Index
