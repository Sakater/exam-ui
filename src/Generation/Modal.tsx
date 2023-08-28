import { ChangeEvent } from "react";
import { Task } from "../interfaces/Types";
type modalProps = {
    task: Task;
    indexTask: number;
    addOption: (index: number) => void;
    handleTaskChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
}
function Modal({ task, indexTask, addOption, handleTaskChange }: modalProps) {
    const modalContent = {
        backgroundColor: "#fefefe",
        margin: "auto",
        padding: "20px",
        border: "1px solid #888",
        width: "80%"
    }
    return (
        <div className="col-8">
            <div className="col-2 ">{task.options.length < 10 &&
                <button className="bg-success bg-opacity-75 rounded-pill"
                    onClick={() => addOption(indexTask)}>+ Option</button>}
            </div>
            <div className="col-2 ">
                Optionen/Zeile:
                <input className="bg-success bg-opacity-75 rounded-pill"
                    type={"number"}
                    name="optionsInARow"
                    value={task.optionsInARow}
                    onChange={(e) => handleTaskChange(e, indexTask)}></input>

            </div>
        </div>
    )
}
export default Modal;