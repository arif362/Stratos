import React from 'react';
import { client as apiClient} from 'utils/api';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'Components/Common/Button';
import Section from 'Components/Common/Section'
import {
  Field,
  FieldError,
  ErrorText
} from 'Components/Common/Forms';

import { task as taskQueryKey } from 'utils/queryKeys';
import { start } from '@rails/activestorage';


// server.update('task',{
//     uid: 10202002,
//     Status: 1,
//     Impact: 1,
//     Ranking: 1, 
//     name: 'Test need addressing decision factors', 
//     due_date: '11/22/33',
//     critical: false, 
//     assignee_id: 5,
//     assignee: 'Contractor', 
//     stepId: 102020, 
//     step_name: 'Owner Need Assessment',
//     template_file_id: 'file1', 
//     task_manager: 3, 
//     previousTasks:[
//       {
//          parentId: 10202001, 
//          startAnchor: "bottom", 
//          endAnchor: "top"
//       }, 
//      ],
//   created_at: 'NULL',
//   updated_at: 'NULL',
//   project_id: 1,
//     task_approved_by: 2
//   })

const EditTaskForm = ({ taskId }) => {

    const queryClient = useQueryClient();

    const { handleSubmit, formState: {errors}, control } = useForm();
   
    const notifySuccess = () => toast.success("Task updated successfully");
    const notifyError = () => toast.error("Task update failed");

    // const [updateTask] = useMutation();


    async function onSubmit(data) {
      try {
        const { id, ...rest } = data;
        const response = await updateTask({
          id,
          data: rest
        });
        if (response.ok) {
          notifySuccess();
          queryClient.invalidateQueries(taskQueryKey);
        }
      } catch (error) {
        notifyError();
        console.log(error, 'error');
      }
    }

    // const { data: task } = useQuery(taskQueryKey, () => apiClient.getTask(taskId));

    // if (!task) return null;

    return (
        <Section>
            <h1 className="Section-h1">Edit Task</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field>
                    <input 
                        id="name"
                        name="name"
                        type="text"
                        label="Task Name"
                        control={control}
                        errors={errors}
                    />
                    <FieldError>
                        { errors.name?.type === 'required' &&
                            <ErrorText>Task name is required</ErrorText>
                        }
                    </FieldError>
                </Field>
                <Field>
                    <input 
                        id="assignee"
                        name="assignee_id"
                        type="text"
                        label="Assignee"
                        control={control}
                        errors={errors}
                    />
                    <FieldError>
                        { errors.assignee?.type === 'required' &&
                            <ErrorText>Assignee is required</ErrorText>
                        }
                    </FieldError>
                </Field>
                <Field>
                    <input 
                        id="taskManager"
                        name="task_manager"
                        type="text"
                        label="Task Manager"
                        control={control}
                        errors={errors}
                    />
                    <FieldError>
                        { errors.taskManager?.type === 'required' &&
                            <ErrorText>Task manager is required</ErrorText>
                        }
                    </FieldError>
                </Field>
                <Field>
                    <input 
                        id="approvedBy"
                        name="task_approved_by"
                        type="text"
                        label="Task Approved By"
                        control={control}
                        errors={errors}
                    />
                    <FieldError>
                        { errors.approvedBy?.type === 'required' &&
                            <ErrorText>Task name is required</ErrorText>
                        }
                    </FieldError>
                </Field>
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

                {/* <Field>
                    <input 
                        id="critical"
                        name="critical"
                        type="text"
                        label="Critical"
                        component={Field}
                        control={control}
                        errors={errors}
                    />
                <FieldError>
                { errors.critical?.type === 'required' &&
                    <ErrorText>Due Date is required</ErrorText>
                }
                </FieldError>
                </Field> */}

                <Field>
                    <input 
                        id="status"
                        name="Status"
                        type="text"
                        label="Status"
                        control={control}
                        errors={errors}
                    />
                    <FieldError>
                        { errors.status?.type === 'required' &&
                            <ErrorText>Status is required</ErrorText>
                        }
                    </FieldError>
                </Field>
                <Field>
                    <input 
                        id="impact"
                        name="Impact"
                        type="text"
                        label="Impact"
                        control={control}
                        errors={errors}
                    />
                    <FieldError>
                        { errors.impact?.type === 'required' &&
                            <ErrorText>Task name is required</ErrorText>
                        }
                    </FieldError>
                </Field>
                <Field>
                    <input
                        id="ranking"
                        name="Ranking"
                        type="text"
                        label="Ranking"
                        control={control}
                        errors={errors}
                    />
                    <FieldError>
                        { errors.ranking?.type === 'required' &&
                            <ErrorText>Ranking is required</ErrorText>
                        }
                    </FieldError>
                </Field>
                <section className="mt-4 flex justify-end">
                    <Button buttonStyle={"orange-solid-button"}>Save</Button>
                </section>
            </form>
        </Section>
    );
}

export default EditTaskForm; 