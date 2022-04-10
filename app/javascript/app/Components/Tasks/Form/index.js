import React from 'react'
import { client as apiClient } from 'utils/api';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import DatePicker from "react-datepicker";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

import {
  allTasks as allTasksQueryKey,
  criticalTasks as criticalTasksQueryKey,
  myTasks as myTasksQueryKey,
} from 'utils/queryKeys'
import Button from 'Components/Common/Button';
import {
  Field,
  FieldError,
  ErrorText
} from 'Components/Common/Forms';
import Section from 'Components/Common/Section'

function Form(props) {

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync: sendData } = useMutation(postForm);
  const { control, register, handleSubmit, reset, formState: {errors} } = useForm();

  const notifySuccess = () => toast.success("New Task added successfully!");
  const notifyError = () => toast.error("New task unsuccessful.")

  async function postForm(data) {
    const { name, assigned, details, due_date } = data

    const month = due_date.getMonth() + 1
    const date = due_date.getDate() 
    const year = due_date.getFullYear() 

    const formatDueDate = `${date}/${month}/${year}` 

    return await apiClient.post("/tasks", {
      stepId: props.stepId,
      name: name,
      project_id: 1,
      assigned: assigned,
      assignee: '',
      details: details,
      due_date: formatDueDate,
      critical: 1,
      impact: 1,
      status: 1,
      task_manager: 1,
      task_approved_by: 1,
    })
  }

  const onSubmit = async (data, e) => {
    try {
      await sendData(data)
      await queryClient.refetchQueries([allTasksQueryKey,])
      await queryClient.refetchQueries([criticalTasksQueryKey])
      await queryClient.refetchQueries([myTasksQueryKey])
      notifySuccess()
      reset() 
      e.target.reset()
    }
    catch (error) {
      throw new Error(error)
      notifyError()
    }
  }

  return(
    <Section>
      <h2 className="Section-h1">Add New Task</h2>
    <form method="post" className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {/* <Field>
        <select className="input-select">
          <option defaultValue="Project 1">Project</option>
          <option value="Project 1">Project 1</option>
          <option value="Project 2">Project 2</option>
          <option value="Project 3">Project 3</option>
          <option value="Project 4">Project 4</option>
        </select>
      </Field> */}
      <Field>
        <input
          id="name"
          type="text"
          placeholder="Task Name"
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
        <input
          id="assigned"
          type="text"
          placeholder="Assigned To"
          {...register("assigned", {required: true})}
          className={!errors.assigned ? "input-text" : 'input-text-error'}
        />
        <FieldError>
          { errors.assigned?.type === 'required' &&
            <ErrorText>Assigned To is required</ErrorText>
          }
        </FieldError>
      </Field>
          <div className="flex space-between">
      <Field >
        <Controller
            defaultValue=""
            control={control}
            name='due_date'
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                id='due_date'
                placeholderText='Due Date'
                minDate={new Date()}
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                className={!errors.assigned ? "input-text" : 'input-text-error'}
              />
          )}
        />
        <FieldError>
          { errors.due_date?.type === 'required' &&
            <ErrorText>Due Date is required</ErrorText>
          }
        </FieldError>
        
      </Field>
        <Field>
          <FormGroup>
          <FormControlLabel 
          labelPlacement="start"
          fontSize="small"
          control={<Switch defaultUnchecked/>} 
          label="Critical"
          />
          </FormGroup>
        </Field>
      </div>


      <Field>
        <select className="input-select">
          <option defaultValue="Option 0">Correspondence Log</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
          <option value="Option 4">Option 4</option>
        </select>
      </Field>

      <Field>
        Schedule Impact
        <textarea
          id="details"
          placeholder="Task Details"
          {...register("details", {required: true})}
          className={!errors.details ? "pl-1 h-20 input-text" : 'pl-1 h-20 input-text-error'}>
        </textarea>
        <FieldError>
          { errors.details?.type === 'required' &&
            <ErrorText>Details are required</ErrorText>
          }
        </FieldError>
      </Field>

      <section className="mt-4 flex justify-end">
        <Button buttonStyle="orange-solid-button">Add</Button>
      </section>
    </form>
    </Section>
  )
}

export default Form
