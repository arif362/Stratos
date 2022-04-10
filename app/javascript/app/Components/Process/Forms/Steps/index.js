import React from 'react'
import { client as apiClient } from 'utils/api'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import Button from 'Components/Common/Button'
import {
  Field,
  HorizontalField,
  ColumnSmall,
  ColumnLarge,
  FieldError,
  ErrorText
} from 'Components/Common/Forms'

function Form(props) {
  const endpoint = "/process/steps"
  const { isLoading, mutateAsync: sendData } = useMutation(postForm);
  const { register, handleSubmit, reset, formState: {errors} } = useForm();

  async function postForm(data) {
    const { identifier, name, description } = data
    return await apiClient.post(endpoint, {
      process_step: {
        project_id: 1, // hardcoded for now - React Context API to pass this down after requesting from API
        parent_id: 4,  // ^ same
        template_id: 1,
        name: name,
        identifier: identifier,
        description: description,
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
      <h2 className="Section-h1">Steps</h2>
      <h3>Add Custom Step</h3>
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

      <section className="mt-4 flex justify-end">
        <Button buttonStyle={"orange-solid-button"}>Save</Button>
      </section>
      <br /><br />
      <h3>Or select a preset Step:</h3>
      ...
    </form>

  )
}

export default Form