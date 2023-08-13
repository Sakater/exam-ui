/*
import React, { ChangeEvent, useState } from "react";
import { Task, File } from "../interfaces/Task";
import PDFFile from "./PDFFile";

export default function Form() {
    const initialFileState: File = {
        tasks: [
            {
                question: '',
                optionA: '',
                optionB: '',
                optionC: '',
                optionD: '',
                id: null as any
            }
        ],
        title: ''
    };

    const [file, setFile] = useState<File>(initialFileState);

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFile(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleTaskChange(event: ChangeEvent<HTMLInputElement>, index: number, name: keyof Task): void {
        const { value } = event.target;
        const typedValue: string = value;
        setFile(prevData => {
            const newTasks: Task[] = [...prevData.tasks];
            newTasks[index]["question"] = typedValue
            return {
                ...prevData,
                tasks: newTasks
            };
        });
    }

    function addQuestion() {
        const newTask: Task = {
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            id: Date.now() // Use a more appropriate method to generate IDs
        };

        setFile(prevData => ({
            ...prevData,
            tasks: [...prevData.tasks, newTask]
        }));
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
                            value={file.title}
                            name="title"
                            onChange={handleFileChange}
                            aria-describedby="passwordHelpBlock"
                        />
                    </div>
                </div>

                <button onClick={addQuestion}>Füge eine Frage hinzu</button>

                {file.tasks.map((task, index) => (
                    <div key={task.id}>
                        {/!* Render question input *!/}
                        <input
                            type="text"
                            className="form-control"
                            value={task.question}
                            name="question"
                            onChange={(e) => handleTaskChange(e, index, 'question')}
                        />

                        {/!* Render options input *!/}
                        <input
                            type="text"
                            className="form-control"
                            value={task.optionA}
                            name="optionA"
                            onChange={(e) => handleTaskChange(e, index, 'optionA')}
                        />
                        {/!* Render other options similarly *!/}
                    </div>
                ))}

                {/!* ... other code ... *!/}

            </div>

            <div className="col-md-4">
                <PDFFile files={file} />
            </div>
        </div>
    );
}
*/
import React, { ChangeEvent, useState } from "react";
import { Task, File } from "../interfaces/Task";
import PDFFile from "./PDFFile";
import { v4 as uuidv4 } from "uuid";

const options = ['A', 'B'];

export default function Form() {
    const initialFileState: File = {
        tasks: [
            {
                question: '',
                options: options.reduce((obj, option) => {
                    obj[option] = '';
                    return obj;
                }, {} as Record<string, string>),
                id: null as any,
            },
        ],
        title: '',
    };

    const [file, setFile] = useState<File>(initialFileState);

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFile((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleTaskChange(event: ChangeEvent<HTMLInputElement>, index: number, option: keyof Task['options']): void {
        const { value } = event.target;
        setFile((prevData) => {
            const newTasks: Task[] = [...prevData.tasks];
            newTasks[index].options[option] = value;
            return {
                ...prevData,
                tasks: newTasks,
            };
        });
    }

    function addQuestion() {
        const newTask: Task = {
            question: '',
            options: options.reduce((obj, option) => {
                obj[option] = '';
                return obj;
            }, {} as Record<string, string>),
            id: uuidv4(), // Use a more appropriate method to generate IDs
        };

        setFile((prevData) => ({
            ...prevData,
            tasks: [...prevData.tasks, newTask],
        }));
    }

    return (
        <div className="row">
            <div className="col-md-8 pt-5">
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="inputPassword5" className="col-md-form-label">
                            Überschrift
                        </label>
                    </div>
                    <div className="col-md-8">
                        <input
                            type="text"
                            id="inputPassword5"
                            className="form-control"
                            value={file.title}
                            name="title"
                            onChange={handleFileChange}
                            aria-describedby="passwordHelpBlock"
                        />
                    </div>
                </div>

                <button onClick={addQuestion}>Füge eine Frage hinzu</button>

                {file.tasks.map((task, index) => (
                    <div key={task.id}>
                        {/* Render question input */}
                        <input
                            type="text"
                            className="form-control"
                            value={task.question}
                            name="question"
                            onChange={(e) => handleTaskChange(e, index, 'question')}
                        />

                        {/* Render options input */}
                        {options.map((option) => (
                            <input
                                key={option}
                                type="text"
                                className="form-control"
                                value={task.options[option]}
                                name={`option${option}`}
                                onChange={(e) => handleTaskChange(e, index, option as keyof Task['options'])}
                            />
                        ))}
                    </div>
                ))}

                {/* ... other code ... */}
            </div>

            <div className="col-md-4">
                <PDFFile files={file} />
            </div>
        </div>
    );
}
