import React from "react";
import {Document, Page, PDFViewer, Text} from "@react-pdf/renderer";
import {File, FileDetailsProps} from "../interfaces/Task";

function PDFFile(files:FileDetailsProps) {
    const file:File=files.files;
    console.log(file)
    return (
        <div>
            <PDFViewer height={500} showToolbar={true}>
                <Document pageLayout={"singlePage"}>
                    <Page size={"A4"}>
                        <Text>
                           <h1>{file.title}</h1>
                            <br/>
                            <br/>
                            1. Frage: {file.tasks.at(0)?.question&& <h2>{file.tasks[0].question}</h2>}
                        </Text>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );

}

export default PDFFile;