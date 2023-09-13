import React from "react";
import {File} from "../../interfaces/Types";
import OptionView from "./OptionView";

type PDFFileProps = {
    file: File;
    size: number;
};

function PDFFile({file, size}: PDFFileProps) {
    const alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    const value = size;
    const border = (number: number) => number > 1 ? "2px solid black" : "";
    const pdfContainer = {
        maxHeight: `${297 / value}mm`,
        minHeight: `${297 / value}mm`,
        height: `${297 / value}mm`,
        maxWidth: `${210 / value}mm`,
        minWidth: `${210 / value}mm`,
        width: `${210 / value}mm`,
        display: "grid",
        gridTemplateRows: "5% auto",
        paddingTop: "0px",
        border: `${border(size)}`,
        overflow: "hidden",
        alignItems: "start",
        alignContent: "unset"
    }
    const pageWidth = {
        maxWidth: `${210 / value}mm`,
        minWidth: `${210 / value}mm`,
        width: `${210 / value}mm`
    }

    const dynamicSize = (expanse: number) => (expanse / size) | 0;

    return (

        <div style={{...pdfContainer, textAlign: "start"}}>
            <div style={{textAlign: "center", paddingTop: `${dynamicSize(15)}pt`}}>
                <h1 style={{fontSize: `${dynamicSize(16)}pt`}}>{file.title}</h1>
            </div>
            <div style={{
                display: "grid",
                gridTemplateColumns: "auto",
                gridTemplateRows: "auto",
                paddingTop: `${dynamicSize(5)}px`,
                fontSize: `${dynamicSize(14)}pt`
            }}>
                {file.tasks.map((task, index) => {

                    //100% der Seitenbreite wird nach der Anzahl der Spalten aufgeteilt.
                    const gridTemplateColumns = (((100 / task.optionsInARow) | 0) + "% ").repeat(task.optionsInARow);

                    return (

                        <div key={task.id}
                             style={{
                                 display: "inline-grid",
                                 gridTemplateRows: "10% auto", ...pageWidth,
                                 overflowWrap: "break-word"
                             }}>
                            <h5 style={{
                                ...pageWidth,
                                fontSize: `${dynamicSize(14)}pt`,
                                paddingTop: `${dynamicSize(25)}pt`
                            }}>
                                {`${index + 1}. Frage: ${task.question}`}
                            </h5>

                            {task.options.length === 0 && task.totalLines > 0 &&
                                Array.from({length: task.totalLines}, (_, index) => (
                                    <div key={index}
                                         style={{
                                             marginLeft: `${dynamicSize(40)}px`,
                                             marginRight: `${dynamicSize(40)}px`,
                                             marginTop: `${dynamicSize(30)}px`
                                         }}>
                                        {task.totalLines > 0 &&
                                            Array.from({length: task.lines}, (_) => (
                                                <div style={{
                                                    borderBottom: "solid black 1px",
                                                    marginBottom: `${dynamicSize(10)}pt`
                                                }}></div>
                                            ))}
                                    </div>))}


                            <div style={{
                                display: "inline-grid",
                                gridTemplateColumns: gridTemplateColumns,
                                gridTemplateRows: "auto"

                            }}>
                                {/*Options*/
                                    task.options.map((option, indexOption) => (
                                        <OptionView option={option} lines={task.lines} totalLines={task.totalLines}
                                                    alphabet={alphabet} indexOption={indexOption}
                                                    dynamicSize={dynamicSize}/>
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