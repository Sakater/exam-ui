import React from "react";
import {File} from "../interfaces/Types";

type PDFFileProps = {
    file: File;
    size: number;
};

function PDFFile({file, size}: PDFFileProps) {
    const alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    const value = size;
    const border=(number:number)=>number>1? "2px solid black":"";
    const pdfContainer = {
        height: `${297 / value}mm`,
        width: `${210 / value}mm`,
        display: "grid",
        gridTemplateRows: "10% auto",
        paddingTop: "5px",
        border:`${border(size)}`,
        overflow: "hidden"
    }


    return (

        <div style={pdfContainer}>
            <div style={{textAlign: "center"}}><h1 style={{fontSize: "16pt"}}>{file.title}</h1></div>
            <div style={{
                display: "grid",
                gridTemplateColumns: "auto",
                gridTemplateRows: "auto",
                paddingTop: "5px",
            }}>
                {file.tasks.map((task, index) => {

                    //100% der Seitenbreite wird nach der Anzahl der Spalten aufgeteilt.
                    const gridTemplateColumns = (((100 / task.optionsInARow) | 0) + "% ").repeat(task.optionsInARow);

                    return (

                        <div key={task.id}
                             style={{display: "inline-grid", gridTemplateRows: "10% auto", overflow: "hidden"}}>
                            <h5 style={{fontSize: "14pt"}}>{`${index + 1}. Frage: ${task.question}`}</h5>

                            {task.options.length === 0 && task.lines > 0 &&
                                Array.from({length: task.totalLines}, (_, index) => (
                                    <div key={index}
                                         style={{marginLeft: "40px", marginRight: "40px", marginTop: "20px"}}>
                                        {task.totalLines > 0 &&
                                            Array.from({length: task.lines}, (_, index) => (
                                                <div style={{
                                                    borderBottom: "solid black 1px",
                                                    marginBottom: "10px"
                                                }}></div>
                                            ))}
                                    </div>))}

                            <div style={{
                                display: "inline-grid",
                                gridTemplateColumns: gridTemplateColumns,
                                gridTemplateRows: "auto"

                            }}>
                                {task.options.map((option, indexOption) => (
                                    <div key={option.id} style={{
                                        textAlign: "left", paddingLeft: "40px", display: "inline-grid",
                                        gridTemplateColumns: "20% auto",
                                        gridTemplateRows: "100%"
                                    }}>
                                        <div>{`${alphabet.at(indexOption)}) `}</div>
                                        <div style={{overflow: "hidden"}}>{option.name}</div>
                                        {/* TODO: muss überarbeitet werden */}
                                        {/*task.lines > 0 &&
                                                    Array.from({ length: task.totalLines }, (_, index) => (
                                                        <div key={index} style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}>
                                                            {task.totalLines > 0 &&
                                                                Array.from({ length: task.lines }, (_, index) => (
                                                                    <div style={{ borderBottom: "solid black 1px", marginBottom: "3%" }}></div>
                                                                ))}
                                                        </div>))*/}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );


}

export default React.memo(PDFFile);