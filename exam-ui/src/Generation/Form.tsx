import React, {ChangeEvent, useState} from "react";
import {Task, File} from "../interfaces/Task";
import PDFFile from "./PDFFile";

//TODO: überlegen wie das System mit der Zurodnung klappen könnte (UUID zu extrem?)
export default function Form() {
    const initialFileState: File = {
        tasks: [{
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            id: null as any
        }],
        title: ''

    }
    const containerElements: any[] = [];
    const [file, setFile] = useState<File>(initialFileState);

    // Definiere ein Mapping von Feldnamen zu ihren Typen
    const fieldTypes: Record<keyof Task, string> = {
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        id: null as any
    };

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target
        setFile(prevData => {
            return {
                ...prevData, [name]: value
            }
        })
        console.log(file);
    }

    function handleTaskChange(event: ChangeEvent<HTMLInputElement>, index: number):void {
        const {name, value} = event.target;
        if (name in fieldTypes) {
            setFile(prevData => {
                const newTasks: Task[] = [...prevData.tasks];
                newTasks[index][name as keyof Task] = value;
                return {
                    ...prevData, tasks: newTasks
                }
            })
        }
        console.log(file);
    }

    function addQuestion(index: string, e: (event: ChangeEvent<HTMLInputElement>, index: number) => void) {
        const number = parseInt(index)
        const newTask: Task = {question: 'question', optionA: '', optionB: '', optionC: '', optionD: '', id: number}

        setFile(prevData => {
            const tasks: Task[] = [...prevData.tasks]
            tasks.push(newTask)

            return {
                ...prevData, tasks: tasks
            }
        })

        containerElements.push(<div className="row pt-4">
            <div className="col-md-12">
                <label htmlFor="inputPassword5"
                       className="col-md-form-label">Frage {number + 1}</label>
            </div>
            <div className="col-md-12">
                <input type="text" id={index}
                       className="form-control"
                       name="question"

                       onChange={(e) => handleTaskChange(e, number)}
                       aria-describedby="passwordHelpBlock"/>
            </div>
        </div>)
    }

    //TODO: index korrigieren (haut so nicht hin)
    function AddOption(index: string[][]) {
        return (
            <div id={index[0][0]}>
                <div className="py-1 row row-cols-4 px-0 mx-sm-1">
                    <div className="col-md-1">A)</div>
                    <div className="col-md-5"><input type="text" id="inputPassword5"
                                                     className="form-control"
                                                     name="optionA"
                                                     onChange={(e) => handleTaskChange(e, 0)}
                                                     aria-describedby="passwordHelpBlock"/>
                    </div>
                    <div className="col-md-1">B)</div>
                    <div className="col-md-5"><input type="text" id="inputPassword5"
                                                     className="form-control"
                                                     name="optionB"
                                                     onChange={(e) => handleTaskChange(e, 0)}
                                                     aria-describedby="passwordHelpBlock"/>
                    </div>
                </div>
                <div className="py-1 row row-cols-4 px-0 mx-sm-1">
                    <div className="col-md-1 ">C)</div>
                    <div className="col-md-5"><input type="text" id="inputPassword5"
                                                     className="form-control"
                                                     name="optionC"
                                                     onChange={(e) => handleTaskChange(e, 0)}
                                                     aria-describedby="passwordHelpBlock"/>
                    </div>
                    <div className="col-md-1">D)</div>
                    <div className="col-md-5"><input type="text" id="inputPassword5"
                                                     className="form-control"
                                                     name="optionD"
                                                     onChange={(e) => handleTaskChange(e, 0)}
                                                     aria-describedby="passwordHelpBlock"/>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="row">
            <div className="col-md-8 pt-5">

                { /*Überschrift*/}
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="inputPassword5"
                               className="col-md-form-label">Überschrift</label>
                    </div>
                    <div className="col-md-8">
                        <input type="text" id="inputPassword5"
                               className="form-control"
                               value={file.title}
                               name="title"
                               onChange={(e) => handleChange(e)}
                               aria-describedby="passwordHelpBlock"/>
                    </div>
                </div>

                {/*Frage 1*/
                }

                <button onClick={() => addQuestion("7098", (event, index) =>event)}>Füge eine Frage hinzu</button>

                {containerElements}

                <button onClick={() => AddOption([[("7098"), ("afsdk")], [("djhdsjh")]])}>Füge weitere optionen hinzu
                </button>

                {/*Frage 2*/
                }
                <div className="row pt-4">
                    <div className="col-md-12">
                        <label htmlFor="inputPassword5"
                               className="col-md-form-label">Frage 2</label>
                    </div>
                    <div className="col-md-12"><input type="text" id="inputPassword5"
                                                      className="form-control"
                                                      name="question"
                                                      onChange={(e) => handleTaskChange(e, 0)}
                                                      aria-describedby="passwordHelpBlock"/>
                    </div>


                </div>
            </div>


            <div className="col-md-4">
                <PDFFile files={file}/>

            </div>
        </div>


    )
        ;
}
