import React from "react";
import {Task} from "../interfaces/Types";

type ExamTaskProps = {
    tasks: Task[];
    handleTaskChange: Function
    addOption: Function
    handleChangeOption: Function
}
export default function ({tasks, handleTaskChange, addOption, handleChangeOption}: ExamTaskProps) {
    const alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    return (

        tasks.map((task, indexTask) => (

            <div key={task.id}>
                <div className="row pt-4">
                    <div className="col-10 ">
                        <div className="row-cols-2">
                            <label className="col-2">{`${indexTask + 1}. Frage`}</label>
                            <input
                                type="text"
                                className="col-10"
                                value={task.question}
                                name="question"
                                onChange={(e) => handleTaskChange(e, indexTask)}
                            />
                        </div>
                    </div>
                    <div className="col-2">{task.options.length < 10 &&
                        <button className="btn-outline-success " onClick={() => addOption(indexTask)}>+ Option</button>}

                    </div>
                </div>
                <div className="row">
                    {task.options.map((option, indexOption) => (
                        <div key={option.id} className="col-6 pt-3 px-0">
                            <label className="col-4">{`${alphabet.at(indexOption)})`}</label>
                            <input
                                type="text"
                                className="col-8"
                                value={option.name}
                                name="name"
                                onChange={(e) => handleChangeOption(e, indexTask, indexOption)}
                            />
                        </div>
                    ))}</div>

            </div>
        ))
    );
}