import React from 'react'
import { client as apiClient } from 'utils/api';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import Button from 'Components/Common/Button';
import CollapsibleButton from 'Components/Common/Collapsible/CollapsibleButton'; 
import {
  Field,
  FieldError,
  ErrorText
} from 'Components/Common/Forms';

function Form() {
  const endpoint = "/process/phases"
  const { register, handleSubmit, reset, formState: {errors} } = useForm();

  async function postForm(data) {
    const { identifier, name, description } = data

    return await apiClient.post(endpoint, {
      process_phase: {
        project_id: 1, // hardcoded for now - React Context API to pass this down after requesting from API
        parent_id: 1, // ^ same
        template_id: 1,  // ^ same
        name: name,
        identifier: identifier,
        description: description,
      }
    })
  }
  const { isLoading, mutateAsync: sendData } = useMutation(postForm);

  const onSubmit = async (data, e) => {
    console.log('submit')
    try {
      const response = await sendData(data)
      reset()
      e.target.reset()
      console.log(response)
    }
    catch (error) {
      throw new Error(error)
    }
  }
  
  
  async function getPhases() {
    const response = await apiClient.get('/phases')
    return response.data
  }
  const phaseQuery = useQuery('api/phases', getPhases)

  
  return (
    <>
      <h2 className="Section-h1">Phases</h2>
      <h3>Select a preset Phase:</h3>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        {phaseQuery.isLoading ? <p>Loading...</p> : 
          phaseQuery.data.length ? phaseQuery.data.map(phase => {
          return (
             
                <label htmlFor={phase.attributes["name"]} className="w-full my-1 p-4 text-center font-heading uppercase border border-outlineGray hover:bg-backgroundGray peer-checked:bg-red-500">
                  <input 
                    id={phase.attributes["name"]} 
                    name={phase.attributes["name"]} 
                    value={phase.attributes["name"]} 
                    className="appearance-none peer"
                    type="checkbox" 
                    ></input>
                  {phase.attributes["name"]}
                </label>

              )
            }) : ""
            }
        <CollapsibleButton title="+Add Custom Phase" buttonStyle="w-full my-1 p-4 text-center text-gray-400 font-heading uppercase border border-outlineGray hover:bg-backgroundGray hover:text-darkGray focus:text-darkGray" contentStyle="p-3">
          <Field>
            <input
              id="identifier"
              type="text"
              placeholder="Identifier"
              {...register("identifier", {required: true})}
              className={!errors.identifier ? "input-text" : 'input-text-error'}
            />
            <FieldError>
              { errors.identifier?.type === 'required' &&
                <ErrorText>Identifier is required</ErrorText>
              }
            </FieldError>
          </Field>

          <Field>
            <input
              id="name"
              type="text"
              placeholder="Phase Name"
              {...register("name", {required: true})}
              className={!errors.name ? "input-text" : 'input-text-error'}
            />
            <FieldError>
              { errors.name?.type === 'required' &&
                <ErrorText>Phase Name is required</ErrorText>
              }
            </FieldError>
          </Field>
  
          <Field>
            <textarea
              id="description"
              placeholder="Description"
              {...register("description", {required: true})}
              className={!errors.description ? "h-20 input-text" : 'h-20 input-text-error'}>
            </textarea>
            <FieldError>
              { errors.description?.type === 'required' &&
                <ErrorText>Description is required</ErrorText>
              }
            </FieldError>
          </Field>
        </CollapsibleButton>
        </div>
        <section className="mt-4 flex justify-end">
          <Button buttonStyle={"orange-solid-button"}>Save</Button>
        </section>
      </form>
    </>

  )
}

export default Form