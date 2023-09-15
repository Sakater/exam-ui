import {useState} from "react";
import {ChangeEvent} from "react";
import {Id, Task} from "../interfaces/Types";
import Modal from "./Modal";


type ExamTaskProps = {
    tasks: Task[];
    handleTaskChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
    addOption: (index: number) => void
    handleOptionChange: ({target: {name, value}}: ChangeEvent<HTMLInputElement>,
                         indexTask: number, indexOption: number) => void
    deleteOption: (index: number, id: Id) => void
    deleteTask: (id: Id) => void
}
export default function ExamTask(props: ExamTaskProps) {
    const alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    const [openModal, setOpenModal] = useState(false);
    const flexbox = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        <>{
            props.tasks.map((task, indexTask) => (
                /*whole task with options*/
                <div key={task.id}
                     style={{
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center",
                         flexWrap: "wrap",
                         paddingTop: "3%"
                     }}>

                    <div style={{...flexbox, justifyContent: "start", flexWrap: "wrap", width: "100%"}}>
                        {/*Line With Task, input field, and delete button*/}
                        <div style={{...flexbox, width: "100%"}}>
                            <h5 style={{marginRight: "10%"}}>{`${indexTask + 1}. Frage`}</h5>
                            <input
                                type="text"
                                className="rounded-2 border-black border border-2 border-opacity-100"
                                style={{width: "65%", marginRight: "10%"}}
                                value={task.question}
                                name="question"
                                onChange={(e) => props.handleTaskChange(e, indexTask)}
                            />


                            {/*Delete Task Button*/}
                            <button className="bg-success bg-opacity-75 rounded-pill" style={{width: "10%"}}
                                    onClick={() => props.deleteTask(task.id)}>-
                            </button>
                        </div>

                        <div style={{paddingTop: "2%"}}>
                            <div>
                                <button type="button" onClick={() => {
                                    setOpenModal(!openModal);
                                }}>Einstellungen
                                </button>
                            </div>
                            {openModal &&
                                <Modal task={task} indexTask={indexTask} addOption={props.addOption}
                                       handleTaskChange={props.handleTaskChange}/>

                            }</div>

                    </div>
                    <div className="row">
                        {task.options.map((option, indexOption) => (

                            <div key={option.id} className="col-6 pt-3 px-0">
                                <div className="row">
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
                            </div>

                        ))}
                    </div>
                </div>
            ))
        }</>
    );
}