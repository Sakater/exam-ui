import React, {JSX} from "react";
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
        display: "flex",
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
    const helpingLines = (totalLines: number, lines: number): JSX.Element[] =>
        Array.from({length: totalLines}, (_, index) => (
            <div key={index}
                 style={{
                     marginLeft: `${dynamicSize(10)}%`,
                     marginRight: `${dynamicSize(10)}%`,
                     paddingTop: `${dynamicSize(15)}pt`
                 }}>
                {totalLines > 0 &&
                    Array.from({length: lines}, (_) => (
                        <div style={{
                            borderBottom: "solid black 1px",
                            paddingBottom: `${dynamicSize(10)}pt`
                        }}></div>
                    ))}
            </div>))


    return (

        <div style={{...pdfContainer, textAlign: "start", flexDirection:"column",alignContent:"center"}}>
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

                            {task.totalLines > 0 &&task.options.length === 0 &&
                                <div style={{
                                    paddingTop: `${dynamicSize(30)}pt`,
                                    ...pageWidth
                                }}>{task.options.length === 0 && task.totalLines > 0 &&
                                    helpingLines(task.totalLines, task.lines)}</div>}


                            <div style={{
                                display: "inline-grid",
                                gridTemplateColumns: gridTemplateColumns,
                                gridTemplateRows: "auto",
                                paddingTop: `${dynamicSize(15)}pt`

                            }}>
                                {/*Options*/
                                    task.options.map((option, indexOption) => (
                                        <OptionView option={option} lines={task.lines} totalLines={task.totalLines}
                                                    alphabet={alphabet} indexOption={indexOption}
                                                    dynamicSize={dynamicSize} helpingLines={helpingLines}/>
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