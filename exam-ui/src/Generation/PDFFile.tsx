import React from "react";
import {File} from "../interfaces/Types";

type PDFFileProps = {
    file: File;
};

function PDFFile({file}: PDFFileProps):any {
    return (
        <div style={{
            maxHeight: `${3508 / 4}px`,
            maxWidth: `${2480 / 4}px`,
            minHeight: `${3508 / 4}px`,
            minWidth: `${2480 / 4}px`,
            border: "2px solid black"
        }}>
            <h1>{file.title}</h1>
            {file.tasks.map((task, index)=> <h5>{`${index}. Frage: ${task.question}`}</h5>)}
        </div>
    );


}

export default PDFFile;