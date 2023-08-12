import React, {useState} from "react";
import {PDFViewer, Document, Text, Page} from "@react-pdf/renderer";
import {FileDetailsProps} from "../interfaces/Task";

function PDFFile(files:FileDetailsProps) {
    const [file, setFile] = useState(files.files);
    return (
        <div>
            <PDFViewer height={500} showToolbar={true}>
                <Document pageLayout={"singlePage"}>
                    <Page size={"A4"}>
                        <Text>
                           <h1>Hallo</h1> Hallo
                        </Text>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );

}

export default PDFFile;