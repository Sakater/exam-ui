import React, {ChangeEvent, useState} from "react";
import {Task, File, Option, Id} from "../interfaces/Task";
import PDFFile from "./PDFFile";
import {v4 as uuidv4} from "uuid";

export default function Form() {
    const initialFileState: File = {
        tasks: [
            {
                question: '',
                options: [],
                id: ''
            }
        ],
        title: '',
        author: '',
        date: ''
    };

    const [tasks, setTasks] = useState<Task[]>(initialFileState.tasks);

    /*function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setTasks(prevData => ({
            ...prevData,
            [name]: value
        }));
    }*/

    function handleTaskChange({target: {name, value}}: ChangeEvent<HTMLInputElement>, index: number) {
        const typedValue: string = value;
        setTasks(prevTasks => {
            return prevTasks.map((prevTask, mapIndex) => {
                if (mapIndex === index) {
                    return {
                        ...prevTask,
                        question: typedValue
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

    function handleChangeOption({target: {name, value}}: ChangeEvent<HTMLInputElement>, index: number) {

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

    return (
        <div className="row">
            <div className="col-md-8 pt-5">
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="inputPassword5" className="col-md-form-label">Überschrift</label>
                    </div>
                    <div className="col-md-8">
                        <input
                            type="text"
                            id="inputPassword5"
                            className="form-control"

                        />
                    </div>
                </div>

                <button onClick={addTask}>Füge eine Frage hinzu</button>

                {tasks.map((task, index) => (
                    <div key={task.id}>

                        <label>{`${index+1}. Frage`}</label>
                        <input
                            type="text"
                            className="form-control"
                            value={task.question}
                            name="question"
                            onChange={(e) => handleTaskChange(e, index)}
                        />
                        <button onClick={() => addOption(index)}>Füge eine Option hinzu</button>
                        {task.options.map((option, index) => (
                            <div key={option.id}>
                                <label>{`${index+1}. Option`}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={option.name}
                                    name="option"
                                    onChange={(e) => handleChangeOption(e, index)}
                                /></div>
                        ))}

                    </div>
                ))}


            </div>

            <div className="col-md-4">
                <PDFFile file={{
                    title: 'Yusuf',
                    tasks,
                    author: 'Vader',
                    date: new Date().toLocaleDateString('de-DE')
                }}/>
            </div>
        </div>
    );
}

