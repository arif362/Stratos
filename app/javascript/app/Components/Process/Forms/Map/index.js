import React from 'react'
import { client as apiClient } from 'utils/api';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
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
  const endpoint = "/process/maps"
  const { isLoading, mutateAsync: sendData } = useMutation(postForm);
  const { register, handleSubmit, reset, formState: {errors} } = useForm();

  async function postForm(data) {
    const { identifier, name } = data
    return await apiClient.post(endpoint, {
      process_map: {
        project_id: 1,  // hardcoded for now - React Context API to pass this down after requesting from API
        template_id: 1, // hardcoded for now - React Context API to pass this down after requesting from API
        name: name,
        identifier: identifier
      }
    })
  }

  async function onSubmit(data, e) {
    try {
      const response = await sendData(data)
      console.log(response)
    }
    catch (error) {
      throw new Error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="Section-h1">Create Map</h2>
      <Field>
        <h3>Use Existing Template</h3>
        <select className="input-select">
          <option defaultValue="0000001">Process Template #1</option>
          <option value="0000002">Option 1</option>
          <option value="0000003">Option 2</option>
          <option value="0000004">Option 3</option>
          <option value="0000005">Option 4</option>
        </select>
      </Field>

      <h3>Or start from scratch</h3>
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
          placeholder="Name"
          {...register("name", {required: true})}
          className={!errors.name ? "input-text" : 'input-text-error'}
        />
        <FieldError>
          { errors.name?.type === 'required' &&
            <ErrorText>Name is required</ErrorText>
          }
        </FieldError>
      </Field>

      <section className="mt-4 flex justify-end">
        <Button buttonStyle={"orange-solid-button"}>Save</Button>
      </section>
    </form>
  )
}

export default Form