import React, {ChangeEvent, useState} from "react";
import {FileDetailsProps, Task, File} from "../interfaces/Task";
import PDFFile from "./PDFFile";

//TODO: überlegen wie das System mit der Zurodnung klappen könnte (UUID zu extrem?)
export default function Form(files: FileDetailsProps) {
    const [file, setFile] = useState(files.files);

    // Definiere ein Mapping von Feldnamen zu ihren Typen
    const fieldTypes: Record<keyof Task, string> = {
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
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

    function handleTaskChange(event: ChangeEvent<HTMLInputElement>, index: number) {
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

    function addQuestion(index: string) {
        const number = parseInt(index)
        const task: Task = {question: 'question', optionA: '', optionB: '', optionC: '', optionD: ''}

        setFile(prevData => {
            const newTasks: Task[] = [...prevData.tasks];
            newTasks.splice(number, 0, task);
            return {
                ...prevData, tasks: newTasks
            }
        })

        return (
            <div className="row pt-4">
                <div className="col-md-12">
                    <label htmlFor="inputPassword5"
                           className="col-md-form-label">Frage {number + 1}</label>
                </div>
                <div className="col-md-12">
                    <input type="text" id={index}
                           className="form-control"
                           value={file.tasks[number].question}
                           onChange={(e) => handleTaskChange(e, number)}
                           aria-describedby="passwordHelpBlock"/>
                </div>
            </div>
        );
    }

    function deleteQuestion(index: string) {

    }

    //TODO: index korrigieren (haut so nicht hin)
    function addOption(index: string[][]) {
        return (<div id={index[0][0]}>
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
        <div className="row row-col-2">
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
                <button onClick={() => addQuestion("7098")}>Füge eine Frage hinzu</button>
                <button onClick={() => addOption([[("7098"), ("afsdk")], [("djhdsjh")]])}>Füge weitere optionen hinzu
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
                <PDFFile files={files.files}/>

            </div>
        </div>


    )
        ;
}
