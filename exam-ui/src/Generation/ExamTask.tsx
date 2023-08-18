import React from "react";
import {Task} from "../interfaces/Types";
import any = jasmine.any;

type ExamTaskProps = {
    tasks: Task[];
    handleTaskChange: Function
    addOption: Function
    handleOptionChange: Function
    deleteOption: Function
    deleteTask: Function
}
export default function ExamTask(props: ExamTaskProps):any/*TODO: wie kann ich das ohne "any" ausführen?*/ {
    const alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    return (
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
                                onClick={() => props.deleteTask( task.id)}>-</button>}

                    </div>

                    <div className="col-2 ">{task.options.length < 10 &&
                        <button className="bg-success bg-opacity-75 rounded-pill" onClick={() => props.addOption(indexTask)}>+ Option</button>}

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
    );
}