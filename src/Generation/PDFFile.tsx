import React from "react";
import { File } from "../interfaces/Types";

type PDFFileProps = {
    file: File;
};

function PDFFile({ file }: PDFFileProps) {
    const alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    const value = 5;
    const pdfContainer = {
        height: `${3508 / value}px`,
        width: `${2480 / value}px`,
        border: "2px solid black",
        display: "grid",
        gridTemplateRows: "10% auto",
        paddingTop: "5px",
    }
    return (
        <html lang="de">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <div style={pdfContainer}>
                    <div style={{ textAlign: "center" }}><h1 style={{ fontSize: "16pt" }}>{file.title}</h1></div>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "auto",
                        gridTemplateRows: "auto",
                        paddingTop: "5px",
                    }}>
                        {file.tasks.map((task, index) => {
                            //100% der Seitenbreite wird nach der Anzahl der Spalten aufgeteilt.

                            const gridTemplateColumnsss = Array.from(Array(task.optionsInARow), () => ((100 / task.optionsInARow) | 0) + "%").join(" ");
                            const gridTemplateColumns = [...Array(task.optionsInARow)].map(() => ((100 / task.optionsInARow) | 0) + "%").join(" ");
                            console.log("in a row: ", task.optionsInARow)
                            const gridTemplateColumnss = 100 / task.optionsInARow + "%";

                            return (

                                <div key={task.id} style={{ display: "inline-grid", gridTemplateRows: "10% auto" }}>
                                    <h5 style={{ fontSize: "14pt" }} >{`${index + 1}. Frage: ${task.question}`}</h5>
                                    <div style={{
                                        display: "inline-grid",
                                        gridTemplateColumns: gridTemplateColumns,
                                        gridTemplateRows: "auto"

                                    }}>
                                        {task.options.map((option, indexOption) => (
                                            <div key={option.id} style={{
                                                textAlign: "left", paddingLeft: "20%", display: "inline-grid",
                                                gridTemplateColumns: "20% auto",
                                                gridTemplateRows: "100%"
                                            }}>
                                                <div>{`${alphabet.at(indexOption)}) `}</div>
                                                <div style={{ overflow: "hidden" }}>{option.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </body>
        </html>
    );


}

export default React.memo(PDFFile);