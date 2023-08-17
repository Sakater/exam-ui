import React, {ChangeEvent, useState} from "react";
import {File, Id, Option, Task} from "../interfaces/Types";
import PDFFile from "./PDFFile";
import {v4 as uuidv4} from "uuid";
import ExamTask from "./ExamTask";

export default function Form() {
    const initialFileState: File = {
        tasks: [
            {
                question: '',
                options: [],
                id: uuidv4()
            }
        ],
        title: '',
        author: '',
        date: new Date().toLocaleDateString('de-DE')
    };

    const [tasks, setTasks] = useState<Task[]>(initialFileState.tasks);
    const [file, setFile] = useState<File>(initialFileState);

    function handleFileChange({target: {name, value}}: ChangeEvent<HTMLInputElement>) {
        setFile(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleTaskChange({target: {name, value}}: ChangeEvent<HTMLInputElement>, index: number) {
        setTasks(prevTasks => {
            return prevTasks.map((prevTask, mapIndex) => {
                if (mapIndex === index) {
                    return {
                        ...prevTask,
                        question: value
                    }
                }
                return prevTask;
            })
        });
    }

    function addTask() {
        const newTask: Task = {
            question: '',
            options: [],
            id: uuidv4() // Use a more appropriate method to generate IDs
        };

        setTasks(prevData => [
            ...prevData, newTask
        ]);
    }

    function deleteTask(id: Id) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    function deleteOption(index: number, id: Id) {
        setTasks(prevTasks => {
            return prevTasks.map((prevTask, mapIndex) => {
                if (mapIndex === index) {
                    const newOptions = prevTask.options.filter(option => option.id !== id)
                    return {...prevTask, options: newOptions}
                }
                return prevTask
            });
        });
    }

    function addOption(index: number) {
        const newOption: Option = {
            name: '',
            id: uuidv4() // Use a more appropriate method to generate IDs
        };

        setTasks(prevTasks => {
            return prevTasks.map((prevTask, mapIndex) => {
                if (mapIndex === index) {
                    return {
                        ...prevTask,
                        options: [...prevTask.options, newOption]
                    }
                }
                return prevTask;
            })
        });
    }

    function handleOptionChange({target: {name, value}}: ChangeEvent<HTMLInputElement>,
                                indexTask: number, indexOption: number) {

        setTasks(prevTasks => {
            return prevTasks.map((prevTask, mapIndex) => {
                if (mapIndex === indexTask) {
                    const newOptions = prevTask.options.map((prevOption, mapIndexOption) => {
                        if (mapIndexOption === indexOption) {

                            return {
                                ...prevOption,
                                [name]: value
                            }
                        }

                        return prevOption
                    });

                    return {
                        ...prevTask,
                        options: newOptions
                    }
                }

                return prevTask;
            });
        });
    }


    return (
        <div className="row row-col-2">
            <div className="col-md-8 pt-5">
                <div className="row">
                    <div className="col-10">
                        <label htmlFor="inputPassword5" className="col-2">Titel</label>
                        <input
                            type="text"
                            className="col-6"
                            name="title"
                            value={file.title}
                            onChange={(e) => handleFileChange(e)}
                        />
                    </div>
                    <div className="col-2">
                        <button onClick={addTask}>+ Frage</button>
                    </div>
                </div>


                <ExamTask tasks={tasks} handleTaskChange={handleTaskChange} handleOptionChange={handleOptionChange}
                          addOption={addOption} deleteOption={deleteOption} deleteTask={deleteTask}/>

            </div>

            <div className="col-md-4">
                <PDFFile file={{
                    title: file.title,
                    tasks,
                    author: file.author,
                    date: file.date
                }}/>
            </div>
        </div>
    );
}

