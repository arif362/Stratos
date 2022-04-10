import React from 'react'
import { useForm } from 'react-hook-form';
import Button from 'Components/Common/Button';
import Section from 'Components/Common/Section'
import {
  Field,
  FieldError,
  ErrorText
} from 'Components/Common/Forms';

function Form({ setShowForm }) {

const { control, register, handleSubmit, reset, formState: {errors} } = useForm();

const onSubmit = async (data, e) => {
    console.log("form submit")
    setShowForm(false)
    // try {
    //     await sendData(data)
    //     await queryClient.refetchQueries([risksQueryKey])
    //     notifySuccess()
    //     reset()
    //     e.target.reset()
    // }
    // catch (error) {
    //     throw new Error(error)
    //     notifyError(); 
    // }
    }

  return(
    <Section>
        <h2 className="Section-h1">Add New Contract</h2>
        <form method="post" className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Field>
            <select className="input-select">
            <option defaultValue="Major Categories">Major Categories</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
            <option value="Option 4">Option 4</option>
            </select>
        </Field>

        <Field>
            <select className="input-select">
            <option defaultValue="Sub Categories">Sub Categories</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
            <option value="Option 4">Option 4</option>
            </select>
        </Field>

        <Field>
            <select className="input-select">
            <option defaultValue="Category Breakdown">Category Breakdowns</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
            <option value="Option 4">Option 4</option>
            </select>
        </Field>

        <Field>
            <select className="input-select">
            <option defaultValue="Line Item">Line Item</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
            <option value="Option 4">Option 4</option>
            </select>
        </Field>

        <Field>
            <input
            id="budget"
            type="text"
            placeholder="Budget"
            //   {...register("budget", {required: true})}
            className={!errors.budget ? "input-text" : 'input-text-error'}
            />
            <FieldError>
            { errors.budget?.type === 'required' &&
                <ErrorText>Budget is required</ErrorText>
            }
            </FieldError>
        </Field>

        <section className="mt-4 flex justify-end">
            <Button buttonStyle="gray-transparent-button">Cancel</Button>
            <Button buttonStyle="orange-solid-button">Add</Button>
        </section>
        </form>
    </Section>
  )
}

export default Form