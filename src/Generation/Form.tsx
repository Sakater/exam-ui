import React, {ChangeEvent, useState} from "react";
import ReactDOMServer from 'react-dom/server'
import {File, Id, Option, Task} from "../interfaces/Types";
import PDFFile from "./view/PDFFile";
import {v4 as uuidv4} from "uuid";
import {saveAs} from 'file-saver'
import ExamTask from "./ExamTask";

export default function Form() {
    const initialFileState: File = {
        tasks: [
            {
                question: '',
                options: [],
                id: uuidv4(),
                optionsInARow: 2,
                lines: 0,
                totalLines: 0
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
        if (name === "totalLines" && parseInt(value) < 0) {
            value = "0"
        }
        if (name === "optionsInARow") {
            if (parseInt(value) < 0) {

            } else if (parseInt(value) > 4) {
                value = "4"
            }
        }
        setTasks(prevTasks => {
            return prevTasks.map((prevTask, mapIndex) => {
                if (mapIndex === index) {
                    return {
                        ...prevTask,
                        [name]: value
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
            id: uuidv4(),
            optionsInARow: 2,
            lines: 0,
            totalLines: 0
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

    const createAsPDF = () => {

        const text = ReactDOMServer.renderToString(<PDFFile file={{
            title: file.title,
            tasks,
            author: file.author,
            date: file.date
        }} size={1}/>)
        const filee = new Blob([text], {type: 'text/plain;charset=utf-8'});
        saveAs(filee, 'testt.html');
    };
    return (
        <div className="row row-col-2">
            <div className="col-md-8 pt-5">
                <div className="row">
                    <div className="col-10">
                        <label htmlFor="inputPassword5" className="col-2"><h4>Titel</h4></label>
                        <input
                            type="text"
                            className="col-6 rounded-2 border-black border border-2 border-opacity-100"
                            name="title"
                            value={file.title}
                            onChange={(e) => handleFileChange(e)}
                        />
                    </div>
                    {tasks.length < 10 &&
                        <div className="col-2">
                            <button onClick={addTask} className="rounded-pill bg-success bg-opacity-75">+ Frage</button>
                        </div>}
                </div>


                <ExamTask tasks={tasks} handleTaskChange={handleTaskChange} handleOptionChange={handleOptionChange}
                          addOption={addOption} deleteOption={deleteOption} deleteTask={deleteTask}/>
                <button onClick={createAsPDF}>Als PDF erstellen</button>

            </div>

            <div className={"col-md-4 pt-5 pb"} style={{padding:"0"}}>
                <PDFFile file={{
                    title: file.title,
                    tasks,
                    author: file.author,
                    date: file.date
                }} size={1.5}/>
            </div>
        </div>
    );
}

