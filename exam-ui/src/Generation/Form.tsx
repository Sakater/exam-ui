import React, { ChangeEvent, useState } from "react";
import { Task, File, FileDetailsProps } from "../interfaces/Task";
import PDFFile from "./PDFFile";
import { v4 as uuidv4 } from "uuid";

export default function Form({ fileDetailsProps }: { fileDetailsProps: FileDetailsProps }) {
    const [file, setFile] = useState<File>(fileDetailsProps.files);

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFile((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleTaskChange(event: ChangeEvent<HTMLInputElement>, index: number, name: keyof Task['options']): void {
        const { value } = event.target;
        setFile((prevData) => {
            const newTasks: Task[] = [...prevData.tasks];
            newTasks[index].options[name] = value;
            return {
                ...prevData,
                tasks: newTasks,
            };
        });
    }

    function addQuestion() {
        const newTask: Task = {
            question: '',
            options: {},
            id: uuidv4(),
        };

        setFile((prevData) => ({
            ...prevData,
            tasks: [...prevData.tasks, newTask],
        }));
    }

    function addOption(index: number) {
        if (index >= 0 && index < file.tasks.length) {
            const task = file.tasks[index];
            const newOptionKey = String.fromCharCode(65 + Object.keys(task.options).length); // Start from 'A'

            setFile((prevData) => {
                const newTasks: Task[] = [...prevData.tasks];
                newTasks[index] = {
                    ...newTasks[index],
                    options: {
                        ...newTasks[index].options,
                        [newOptionKey]: '',
                    },
                };
                return {
                    ...prevData,
                    tasks: newTasks,
                };
            });
        }
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
                            name={`question_${index}`}
                            onChange={(e) => handleTaskChange(e, index, 'question')}
                        />

                        {/* Render options inputs */}
                        {Object.keys(task.options).map((option) => (
                            <input
                                key={option}
                                type="text"
                                className="form-control"
                                value={task.options[option]}
                                name={`option_${index}_${option}`}
                                onChange={(e) => handleTaskChange(e, index, option as keyof Task['options'])}
                            />
                        ))}
                        <button onClick={() => addOption(index)}>Füge Option hinzu</button>
                    </div>
                ))}
            </div>
            <div className="col-md-4">
                <PDFFile files={file} />
            </div>
        </div>
    );
}
