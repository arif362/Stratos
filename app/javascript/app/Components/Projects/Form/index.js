import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { client as apiClient } from 'utils/api';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { allProjects as projectsQueryKey } from 'utils/queryKeys';
import { homeURL, processMapURL } from 'utils/urls';
import Button from 'Components/Common/Button';
import {
  Field,
  HorizontalField,
  ColumnSmall,
  ColumnLarge,
  FieldError,
  ErrorText
} from 'Components/Common/Forms';


function Form(props) {

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync: sendData } = useMutation(postForm);
  const { register, handleSubmit, reset, formState: {errors} } = useForm();

  async function postForm(data) {
    const { identifier, name, description, location } = data
    return await apiClient.post("/projects", {
      identifier: identifier,
      name: name,
      description: description,
      location: location,
      due_date: '08/01/21', // day/month/year
      budget: 100,
      cost: 70
    })
  }

  const notifySuccess = () => toast.success("Project saved successfully!");
  const notifyError = () => toast.error("Project save unsuccessful")

  
  const onSubmit = async (data, e) => {
    try {
      const response = await sendData(data);
      if (response.status === 201) {
        await queryClient.refetchQueries([projectsQueryKey])
        // if('nextStep' button){
          // navigate(processMapURL())
        // } if('save' button) {
          notifySuccess() 
        // }
        reset()
      }
    }
    catch (error) {
      throw new Error(error)
      notifyError(); 
    }
  }

  return(
    <form method="post" className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <HorizontalField>
        <ColumnSmall>
          <label htmlFor="identifier" className="text-stratosGray mr-9">Project ID</label>
        </ColumnSmall>
        <ColumnLarge>
          <input
            id="identifier"
            type="text"
            {...register("identifier", {required: true})}
            className={!errors.identifier ? "input-text" : 'input-text-error'}
          />
          <FieldError>
            { errors.identifier?.type === 'required' &&
              <ErrorText>Identifier is required</ErrorText>
            }
          </FieldError>
        </ColumnLarge>
      </HorizontalField>

      <HorizontalField>
        <ColumnSmall>
          <label htmlFor="name" className="text-stratosGray mr-2">Project Name</label>
        </ColumnSmall>
        <ColumnLarge>
          <input
            id="name"
            type="text"
            {...register("name", {required: true})}
            className={!errors.name ? "input-text" : 'input-text-error'}
          />
          <FieldError>
            { errors.name?.type === 'required' &&
              <ErrorText>Name is required</ErrorText>
            }
          </FieldError>
        </ColumnLarge>
      </HorizontalField>

      <HorizontalField>
        <ColumnSmall>
          <label htmlFor="location" className="text-stratosGray mr-2">Project Location</label>
        </ColumnSmall>
        <ColumnLarge>
          <input
            id="location"
            type="text"
            {...register("location", {required: true})}
            className={!errors.location ? "input-text" : 'input-text-error'}
          />
          <FieldError>
            { errors.location?.type === 'required' &&
              <ErrorText>Location is required</ErrorText>
            }
          </FieldError>
        </ColumnLarge>
      </HorizontalField>

      <Field>
        <textarea
          id="description"
          placeholder="Project Description"
          {...register("description", {required: true})}
          className={!errors.description ? "pl-1 h-20 input-text placeholder-stratosGray" : 'pl-1 h-20 input-text-error placeholder-stratosGray'}>
        </textarea>
        <FieldError>
          { errors.description?.type === 'required' &&
            <ErrorText>Description is required</ErrorText>
          }
        </FieldError>
      </Field>

      <Field>
        <select className="input-select">
          <option defaultValue="Location">User/Contact Assignments </option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
          <option value="Option 4">Option 4</option>
        </select>
      </Field>

      <section className="mt-4 flex justify-end">
        <Link to={homeURL()}>
          <Button buttonStyle={"underline text-stratosGray py-0.5 px-4 m-1"}>Cancel</Button>
        </Link>
        <Button buttonStyle={"gray-transparent-button"}>Save</Button>
        <Button buttonStyle={"orange-solid-button"} >Next Step</Button>
      </section>
    </form>
  )
}

export default Form;
