import React from 'react'
import { client as apiClient } from 'utils/api';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

import Button from 'Components/Common/Button';
import { allRisks as risksQueryKey } from 'utils/queryKeys';
import {
  Field,
  FieldError,
  ErrorText
} from 'Components/Common/Forms';
import { start } from '@rails/activestorage';

function Form() {

  const queryClient = useQueryClient();
  const { control, register, handleSubmit, reset, formState: {errors} } = useForm();

  const notifySuccess = () => toast.success("New risk added successfully!");
  const notifyError = () => toast.error("New risk unsuccessful.")

  async function postForm(data) {

    const { name, assigned, details, due_date } = data

    const month = due_date.getMonth() + 1
    const date = due_date.getDate() 
    const year = due_date.getFullYear() 

    const formatDueDate = `${date}/${month}/${year}` 

    return await apiClient.post("/risks", {
      name: name,
      project_id: 1,
      assigned: assigned,
      details: details,
      due_date: formatDueDate,
      impact: "Time",
      rank: 2 // high
    })
  }

  const { isLoading, mutateAsync: sendData } = useMutation(postForm);

  const onSubmit = async (data, e) => {
    try {
      await sendData(data)
      await queryClient.refetchQueries([risksQueryKey])
      notifySuccess()
      reset()
      e.target.reset()
    }
    catch (error) {
      throw new Error(error)
      notifyError(); 
    }
  }

  return(
    <form method="post" className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <input
          id="riskNumber"
          type="text"
          placeholder="Risk #"
          {...register("riskNumber", {required: true})}
          className={!errors.riskNumber ? "input-text" : 'input-text-error'}
        />
        <FieldError>
          { errors.riskNumber?.type === 'required' &&
            <ErrorText>Risk # is required</ErrorText>
          }
        </FieldError>
      </Field>


      <Field>
        <input
          id="name"
          type="text"
          placeholder="Risk Name"
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


        <Field>
          <select className="input-select">
            <option defaultValue="Option 0">Correspondence Log</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
            <option value="Option 4">Option 4</option>
          </select>
        </Field>

        <div className="flex justify-between items-baseline">
          <Field>
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
          <div className="flex justify-evenly">
            <p className="text-lg text-stratosGray">Critical Issue?</p>
            <div>
              <label className="flex items-baseline" htmlFor="criticalIssue">
              <input 
                id="criticalIssue" 
                type="checkbox" 
                className="appearance-none peer" 
                name="criticalIssue"
                />
                <span className="w-14 h-8 
                      flex items-center
                      flex-shrink-0 
                      mx-4 p-1 
                      bg-lightGray 
                      rounded-full 
                      duration-300 ease-in-out
                      peer-checked:bg-stratosBlue
                      after:w-6 
                      after:h-6 
                      after:bg-white 
                      after:rounded-full 
                      after:shadow-md
                      after:duration-300
                      peer-checked:after:translate-x-6
                      " ></span>
              </label>
            </div>
          </div>
        </div>

      <Field>
        Schedule Impact
        <textarea
          id="details"
          placeholder="Risk Details"
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
  )
}

export default Form
