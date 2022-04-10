import React, { Component } from 'react'
import { client as apiClient } from 'utils/api';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import Button from 'Components/Common/Button';
import Select from 'react-select';

import {
  Field,
  FieldError,
  ErrorText
} from 'Components/Common/Forms';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

function Form(props) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: {errors} } = useForm();

  async function postForm(data) {
    const { first_name, last_name, title, phone } = data
    return await apiClient.post("/contacts", {
      first_name,
      last_name,
      title,
      phone
    })
  }

  const { isLoading, mutateAsync: sendData } = useMutation(postForm);

  const onSubmit = async (data, e) => {
    try {
      await sendData(data)
      await queryClient.refetchQueries(['api/contacts'])
      e.target.reset()
    }
    catch (error) {
      throw new Error(error)
    }
  }

  return(
    <form method="post" className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {/*First Name*/}
      <Field>
        <input
          id="first_name"
          type="text"
          placeholder="First Name"
          {...register("first_name", {required: true})}
          className={!errors.first_name ? "input-text" : 'input-text-error'}
        />
        <FieldError>
          { errors.first_name?.type === 'required' &&
            <ErrorText>First Name is required</ErrorText>
          }
        </FieldError>
      </Field>
      {/*Last Name*/}
      <Field>
        <input
          id="last_name"
          type="text"
          placeholder="Last Name"
          {...register("last_name", {required: true})}
          className={!errors.last_name ? "input-text" : 'input-text-error'}
        />
        <FieldError>
          { errors.last_name?.type === 'required' &&
            <ErrorText>Last Name is required</ErrorText>
          }
        </FieldError>
      </Field>
      {/*Title*/}
      <Field>
        <input
          id="title"
          type="text"
          placeholder="Title"
          {...register("title", {required: true})}
          className={!errors.title ? "input-text" : 'input-text-error'}
        />
        <FieldError>
          { errors.title?.type === 'required' &&
            <ErrorText>Title is required</ErrorText>
          }
        </FieldError>
      </Field>
      {/*Phone*/}
      <Field>
        <input
          id="phone"
          type="text"
          placeholder="Phone"
          {...register("phone", {required: true})}
          className={!errors.phone ? "input-text" : 'input-text-error'}
        />
        <FieldError>
          { errors.phone?.type === 'required' &&
            <ErrorText>Phone is required</ErrorText>
          }
        </FieldError>
      </Field>


      <section className="mt-4 flex justify-end">
        <Button buttonStyle="orange-solid-button">Add</Button>
      </section>
    </form>
  )
}

export default Form
