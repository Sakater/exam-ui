import React, {ChangeEvent, useRef} from "react";
import {Id, Task} from "../interfaces/Types";
import Modal from "./Modal";


type ExamTaskProps = {
    tasks: Task[];
    openModal: boolean[]
    handleTaskChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
    addOption: (index: number) => void
    handleOptionChange: ({target: {name, value}}: ChangeEvent<HTMLInputElement>,
                         indexTask: number, indexOption: number) => void
    deleteOption: (index: number, id: Id) => void
    deleteTask: (id: Id) => void
    changeModal: (indexTask: number) => void
    showTask: (indexTask: number) => boolean
    handleSort: (dragItem: React.MutableRefObject<any>, dragOverItem: React.MutableRefObject<any>) => void

}
export default function ExamTask(props: ExamTaskProps) {
    const alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    const flexbox = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const dragItem = useRef<any>(null)
    const dragOverItem = useRef<any>(null)


    return (
        <>{
            props.tasks.map((task, indexTask) => (
                props.showTask(indexTask) &&
                /*whole task with options*/

                <div key={task.id}
                     style={{
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center",
                         flexWrap: "wrap",
                         paddingTop: "3%",
                         paddingLeft: "3%"
                     }} draggable={"true"}
                     onDragStart={() => dragItem.current = indexTask}
                     onDragEnter={() => dragOverItem.current = indexTask}
                     onDragEnd={() => props.handleSort(dragItem, dragOverItem)}
                >

                    <div style={{...flexbox, justifyContent: "center", flexWrap: "wrap", width: "100%"}}>
                        {/*Line With Task, input field, and delete button*/}

                        <div style={{...flexbox, justifyContent: "center", width: "100%"}}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"
                                     style={{cursor: "move"}}>
                                    <path
                                        d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                                </svg>
                            </div>
                            <h5 style={{fontSize: "14pt", margin: "unset"}}>
                                <input type={"text"} name={"numeration"}
                                       value={task.numeration}
                                       style={{width: "25%"}}
                                       onChange={(e) => props.handleTaskChange(e, indexTask)}/>
                            </h5>
                            <input
                                type="text"
                                className="rounded-2 border-black border border-2 border-opacity-100"
                                style={{width: "70%", marginRight: "2%"}}
                                value={task.question}
                                name="question"
                                onChange={(e) => props.handleTaskChange(e, indexTask)}
                            />


                            {/*Delete Task Button*/}
                            <button className="bg-success bg-opacity-75 rounded-pill" style={{width: "7%"}}
                                    onClick={() => props.deleteTask(task.id)}>-
                            </button>
                        </div>

                        <div style={{paddingTop: "2%"}} key={task.id} id={task.id}>
                            <div>
                                <button type="button" onClick={() => props.changeModal(indexTask)}>Einstellungen
                                </button>
                            </div>
                            {props.openModal.at(indexTask) == true &&
                                <Modal task={task} indexTask={indexTask} addOption={props.addOption}
                                       handleTaskChange={props.handleTaskChange}/>

                            }
                        </div>

                    </div>
                    <div style={{...flexbox, flexWrap: "wrap", width: "100%"}}>
                        {task.options.map((option, indexOption) => (

                            <div key={option.id} className="pt-3 px-0"
                                 style={{width: "50%", ...flexbox, alignItems: "center"}}>
                                <label className="col-1">{`${alphabet.at(indexOption)})`}</label>
                                <input
                                    type="text"
                                    className="col-8 rounded-2 border-black border border-2 border-opacity-100"
                                    value={option.name}
                                    name="name"
                                    onChange={(e) => props.handleOptionChange(e, indexTask, indexOption)}
                                />
                                <div className="col-2">{task.options.length > 0 &&
                                    <button className="col-8 rounded-pill bg-danger bg-opacity-75"
                                            onClick={() => props.deleteOption(indexTask, option.id)}>-</button>}

                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            ))
        }</>
    );
}