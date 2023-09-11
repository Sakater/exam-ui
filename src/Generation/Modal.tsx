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
    const radioField = {
        paddingLeft: "4%"
    }
    return (

        <div className="col row" key={indexTask}>
            {/* Optionen Einstellungen*/}
            <div className="col-4">
                <div className="col">{task.options.length < 10 &&
                    <button className="bg-success bg-opacity-75 rounded-pill"
                        onClick={() => addOption(indexTask)}>+ Option</button>}
                </div>
                <div className="col">
                    <div style={{ paddingRight: "2%" }}>Optionen pro Zeile:</div>
                    <input className="bg-success bg-opacity-75 rounded-pill" style={{ maxWidth: "8%", minWidth: "40px", textAlign: "right" }}
                        type={"number"}
                        name="optionsInARow"
                        value={task.optionsInARow}
                        onChange={(e) => handleTaskChange(e, indexTask)}></input>

                </div>
            </div>
            {/* Zeilen (Linienstyling) */}
            <div className="col-8" >
                <p>Hilfslinien anzeigen</p>
                <div style={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%", gridTemplateRows: "2", textAlign: "left" }}>
                    <div>
                        <input type="radio" key={indexTask} name="lines" value="0" checked={task.lines == 0} onChange={(e) => handleTaskChange(e, indexTask)} />
                        <label style={radioField}>Ohne</label>
                    </div>
                    <div>
                        <input type="radio" key={indexTask} name="lines" value="1" checked={task.lines == 1} onChange={(e) => handleTaskChange(e, indexTask)} />
                        <label style={radioField} >1 Linie</label>
                    </div>
                    <div>
                        <input type="radio" key={indexTask} name="lines" value="2" checked={task.lines == 2} onChange={(e) => handleTaskChange(e, indexTask)} />
                        <label style={radioField}>2 Linien</label>
                    </div>
                    <div>
                        <input type="radio" key={indexTask} name="lines" value="3" checked={task.lines == 3} onChange={(e) => handleTaskChange(e, indexTask)} />
                        <label style={radioField} htmlFor="">3 Linien</label>
                    </div>
                </div>
            </div>
            {/* Linien gesamt */}
            <div>
                <p>Anzahl an Gesamtzeilen </p>
                <input type="number" name="totalLines" value={task.totalLines} onChange={(e) => handleTaskChange(e, indexTask)} />
            </div>
        </div>
    )
}
export default Modal;