import React from "react";
import {Document, Page, PDFViewer, Text} from "@react-pdf/renderer";
import {File} from "../interfaces/Task";

type PDFFileProps = {
    file: File;
};

function PDFFile({file}:PDFFileProps) {
    console.log(file)
    return (
        <div>
            <PDFViewer height={500} showToolbar>
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