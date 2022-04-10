import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import Button from 'Components/Common/Button';
import Section from 'Components/Common/Section'

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import {
  Field,
  FieldError,
  ErrorText
} from 'Components/Common/Forms';

import { client as apiClient } from 'utils/api';
import { useQuery } from 'react-query';
import {
  lineItems as lineItemsQueryKey,
  allContracts as contractsQueryKey
} from 'utils/queryKeys';

function Form({ setShowForm, categories, projectId }) {

  async function getLineItems() {
    const resp = await apiClient.get(`/line_items?project_id=${projectId}`)
    return resp.data
  }

  async function getContracts() {
    const resp = await apiClient.get(`/contracts?project_id=${projectId}`)
    return resp.data
  }

  const lineItems = useQuery(lineItemsQueryKey, getLineItems);
  const contracts = useQuery(contractsQueryKey, getContracts);

  // const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  // const [selectedCategoryBreakdowns, setSelectedCategoryBreakdowns] = useState([]);
  // const [selectedLineItems, setSelectedLineItems] = useState([]);

  const { control, register, handleSubmit, reset, formState: {errors} } = useForm();
  const majorCategories = categories.data;

  // const selectSubCategories = (e) => {
  //   let data = []
  //   subCategories.data.map((category) => {
  //     if (category.attributes.category_id === parseInt(e.target.value)) {
  //       data.push(category)
  //     }
  //   })
  //   setSelectedSubCategories(data);
  // }

  // const selectCategoryBreakdowns = (e) => {
  //   let data = []
  //   categoryBreakdowns.data.map((category) => {
  //     if (category.attributes.sub_category_id === parseInt(e.target.value)) {
  //       data.push(category)
  //     }
  //   })
  //   setSelectedCategoryBreakdowns(data);
  // }

  // const selectLineItems = (e) => {
  //   let data = []
  //   lineItems.data.map((item) => {
  //     if (item.attributes.category_breakdown_id === parseInt(e.target.value)) {
  //       data.push(item)
  //     }
  //   })
  //   setSelectedLineItems(data);
  // }

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

  let markup = ''
  if (projectId) {
    markup = (
      <form method="post" className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

        <Field>
          <select className="input-select">
            <option value="">Select Line Item</option>
            { !lineItems.isLoading && lineItems.data.map((item) => {
                return (
                  <option value={item.id} key={item.id}>{item.attributes.name}</option>
                )
              })
            }
          </select>
        </Field>

        <Field>
          <select className="input-select">
            <option value="">Select Contract</option>
            { !contracts.isLoading && contracts.data.map((contract) => {
                return (
                  <option value={contract.id} key={contract.id}>{`${contract.attributes.firm_name}/${contract.attributes.contract_breakdown}`}</option>
                )
              })
            }
          </select>
        </Field>

        <Field>
          <input
            id="contractBreakdown"
            type="text"
            placeholder="Contract Breakdown"
            {...register("contractBreakdown", {required: true})}
            className={!errors.contractBreakdown ? "input-text" : 'input-text-error'}
          />
          <FieldError>
            { errors.contractBreakdown?.type === 'required' &&
              <ErrorText>Contract Breakdown is required</ErrorText>
            }
          </FieldError>
        </Field>

        <Field>
          <input
            id="firmName"
            type="text"
            placeholder="Firm Name"
            {...register("firmName", {required: true})}
            className={!errors.firmName ? "input-text" : 'input-text-error'}
          />
          <FieldError>
            { errors.firmName?.type === 'required' &&
              <ErrorText>Firm name is required</ErrorText>
            }
          </FieldError>
        </Field>

        <Field>
          <input
            id="invoiceValue"
            type="text"
            placeholder="Invoice Value"
            {...register("invoiceValue", {required: true})}
            className={!errors.invoiceValue ? "input-text" : 'input-text-error'}
          />
          <FieldError>
            { errors.invoiceValue?.type === 'required' &&
              <ErrorText>Invoice Value is required</ErrorText>
            }
          </FieldError>
        </Field>

        <Field>
          <input
            id="invoice"
            type="text"
            placeholder="Invoice Number"
            {...register("invoice", {required: true})}
            className={!errors.invoice ? "input-text" : 'input-text-error'}
          />
          <FieldError>
            { errors.invoice?.type === 'required' &&
              <ErrorText>Invoice is required</ErrorText>
            }
          </FieldError>
        </Field>

        <Field>
          <Controller
            defaultValue=""
            control={control}
            name='invoiceDate'
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                id='invoiceDate'
                placeholderText='Invoice Date'
                minDate={new Date()}
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                className={!errors.assigned ? "input-text" : 'input-text-error'}
              />
            )}
          />
          <FieldError>
            { errors.invoiceDate?.type === 'required' &&
              <ErrorText>Invoice Date is required</ErrorText>
            }
          </FieldError>
        </Field>

        <Field>
          <Controller
            defaultValue=""
            control={control}
            name='approvalDate'
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                id='approvalDate'
                placeholderText='Recommended Approval Date'
                minDate={new Date()}
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                className={!errors.assigned ? "input-text" : 'input-text-error'}
              />
            )}
          />
          <FieldError>
            { errors.approvalDate?.type === 'required' &&
              <ErrorText>Approval Date is required</ErrorText>
            }
          </FieldError>
        </Field>

        <Field>
          <select className="input-select">
            <option value="">Select Status</option>
            <option value="0">Pending</option>
            <option value="1">Approved</option>
            <option value="2">Rejected</option>
          </select>
        </Field>

        <section className="mt-4 flex justify-end">
          <Button buttonStyle="gray-transparent-button">Cancel</Button>
          <Button buttonStyle="orange-solid-button">Add</Button>
        </section>
      </form>
    )
  }
  else {
    markup = (<p>Select the project first </p>)
  }

  return (
    <Section>
      <h2 className="Section-h1">Add New Invoice</h2>
      {markup}
    </Section>
  );
}

export default Form
