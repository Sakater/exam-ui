import { useState } from "react";
import { ChangeEvent } from "react";
import { Id, Task } from "../interfaces/Types";
import Modal from "./Modal";


type ExamTaskProps = {
    tasks: Task[];
    handleTaskChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
    addOption: (index: number) => void
    handleOptionChange: ({ target: { name, value } }: ChangeEvent<HTMLInputElement>,
        indexTask: number, indexOption: number) => void
    deleteOption: (index: number, id: Id) => void
    deleteTask: (id: Id) => void
}
export default function ExamTask(props: ExamTaskProps) {
    const alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    const [openModal, setOpenModal] = useState(false);

    return (
        <>{
            props.tasks.map((task, indexTask) => (

                <div key={task.id} className=" my-3 border-top border-3 border-opacity-100 border-black">
                    <div className="row pt-4">
                        <div className="col-10 ">
                            <div className="row-cols-2">
                                <label className="col-2"><h5>{`${indexTask + 1}. Frage`}</h5></label>
                                <input
                                    type="text"
                                    className="col-10 rounded-2 border-black border border-2 border-opacity-100"
                                    value={task.question}
                                    name="question"
                                    onChange={(e) => props.handleTaskChange(e, indexTask)}
                                />
                            </div>
                        </div>
                        <div className="col-2">{props.tasks.length > 0 &&
                            <button className="bg-success bg-opacity-75 col-4 rounded-pill"
                                onClick={() => props.deleteTask(task.id)}>-</button>}

                        </div>
                        <div className={"col-12 row row-cols-12"}>
                            <button type="button" onClick={() => { setOpenModal(!openModal); }} className={"col-2 rounded-2 left"}>Einstellungen</button>
                            {openModal &&
                                <Modal task={task} indexTask={indexTask} addOption={props.addOption} handleTaskChange={props.handleTaskChange} />

                            }</div><div style={{
                                display: "none", /* Hidden by default */
                                position: "fixed", /* Stay in place */
                                zIndex: "1", /* Sit on top */
                                paddingTop: "100px", /* Location of the box */
                                left: "0",
                                top: "0",
                                width: "100%", /* Full width */
                                height: "100 %", /* Full height */
                                overflow: "auto", /* Enable scroll if needed */
                                backgroundColor: "rgb(0, 0, 0)", /* Fallback color */
                                //backgroundColor: "rgba(0, 0, 0, 0.4)" /* Black w/ opacity */
                            }}>

                        </div>

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