import React, {ChangeEvent, useState} from "react";
import ReactDOMServer from 'react-dom/server'
import {File, Id, Option, Task} from "../interfaces/Types";
import PDFFile from "./view/PDFFile";
import {v4 as uuidv4} from "uuid";
import {saveAs} from 'file-saver'
import ExamTask from "./ExamTask";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

export default function Form() {
    const initialFileState: File = {
        tasks: [
            {
                numeration: 1 + ')',
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
        date: new Date().toLocaleDateString('de-DE'),
        tasksPerPage: 5
    };
    const [openModal, setOpenModal] = useState<boolean[]>([false]);
    const [tasks, setTasks] = useState<Task[]>(initialFileState.tasks);
    const [file, setFile] = useState<File>(initialFileState);
    const [currentPage, setCurrentPage] = useState<number>(1)

    const pages = (): number => {
        const countPages = tasks.length % file.tasksPerPage
        if (countPages > 0) {
            return ((tasks.length / file.tasksPerPage) | 0) + 1
        }
        return ((tasks.length / file.tasksPerPage) | 0);
    };

    /**
     * returns true if the task-index is on the current page
     * */
    const showTask = (indexTask: number): boolean => {
        return indexTask >= ((currentPage - 1) * file.tasksPerPage) && indexTask < currentPage * file.tasksPerPage
    }

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
            if (parseInt(value) < 1) {
                value = "1"
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
            numeration: tasks.length + 1 + ')',
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
        addModal();
    }

    function deleteTask(id: Id) {
        setTasks(tasks.filter((task, mapIndex) => {
            if (task.id === id) {
                deleteModal(mapIndex);
            }
            return task.id !== id
        }))
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

    const changeModal = (indexTask: number) => {
        setOpenModal(prevState => {
            return prevState.map((prevState, mapIndex) => {
                if (mapIndex === indexTask) {
                    return !prevState;
                }
                return prevState;
            })
        });
    }
    const deleteModal = (indexTask: number) => {
        setOpenModal(openModal.filter((openModal, index) => indexTask !== index));
    }
    const addModal = () => setOpenModal(prevState => [...prevState, false])


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

    const handleSort = (dragItem: React.MutableRefObject<any>, dragOverItem: React.MutableRefObject<any>) => {
        let taskItems = [...tasks];
        const draggedItemContent = taskItems.splice(dragItem.current, 1)[0];
        taskItems.splice(dragOverItem.current, 0, draggedItemContent);

        dragItem.current = null;
        dragOverItem.current = null;
        setTasks(taskItems)

        setTasks(prevTasks => {
            return prevTasks.map((prevTask, mapIndex) => {

                    return {
                        ...prevTask,
                        numeration: (mapIndex+1).toString()
                    }

            })
        });
    }

    const createAsPDF = () => {
        const existingPages = pages()
        let text: string = ""
        for (let _i: number = 1; _i <= existingPages; _i++) {

            text += ReactDOMServer.renderToString(<PDFFile file={{
                title: file.title,
                tasks,
                author: file.author,
                date: file.date,
                tasksPerPage: file.tasksPerPage,
            }} size={1} currentPage={_i}/>)
        }
        const filee = new Blob([text], {type: 'text/plain;charset=utf-8'});
        saveAs(filee, 'testt.html');
    };

    return (
        <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%"}}>
            {/*left control side*/}
            <div style={{width: "50%", paddingRight: "5%"}}>
                {/*Headline with Title, Author, Date etc.*/}
                <div style={{
                    display: "flex",
                    justifyContent: "end",
                    borderBottom: "solid 3px black",
                    paddingBottom: "2%"
                }}>
                    <div style={{display: "flex", justifyContent: "center", width: "80%"}}>
                        <label htmlFor="inputPassword5"><h5>Titel</h5></label>
                        <input
                            type="text"
                            style={{width: "70%", marginLeft: "10%"}}
                            name="title"
                            value={file.title}
                            onChange={(e) => handleFileChange(e)}
                        />
                    </div>
                    {tasks.length < 10 &&
                        <div>
                            <button onClick={addTask} className="rounded-pill bg-success bg-opacity-75">+ Frage</button>
                        </div>}
                </div>


                <ExamTask tasks={tasks} handleTaskChange={handleTaskChange} handleOptionChange={handleOptionChange}
                          addOption={addOption} deleteOption={deleteOption} deleteTask={deleteTask}
                          openModal={openModal} changeModal={changeModal} showTask={showTask} handleSort={handleSort}/>


            </div>
            <div style={{display: "flex", alignItems: "start", justifyContent: "end"}}><div style={{display:"flex",alignItems:"center"}}>{
                pages() > 1 &&
                <button onClick={() => {
                    if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                    }
                }} style={{marginRight: "1.5%", border: "none", scale: "150%", backgroundColor:"unset"}}>
                    <FontAwesomeIcon icon={faArrowRight} rotation={180} />
                </button>
            }
                {/*pdf-viewer*/}
                <div className={"col "} style={{display: "flex", justifyContent: "center"}}>
                    <PDFFile file={{
                        title: file.title,
                        tasks,
                        author: file.author,
                        date: file.date,
                        tasksPerPage: file.tasksPerPage
                    }} size={1.2} currentPage={currentPage}/>
                </div>


                {
                    pages() > 1 &&
                    <button onClick={() => {
                        if (currentPage < pages()) {
                            setCurrentPage(currentPage + 1);
                        }
                    }} style={{marginLeft: "1.5%", border: "none", scale: "150%",backgroundColor:"unset"}}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                }
            </div>
        </div>

            <div style={{width: "100%"}}>
                <button onClick={createAsPDF} name="printAsPDF">Als PDF erstellen</button>
            </div>
        </div>
    );
}

