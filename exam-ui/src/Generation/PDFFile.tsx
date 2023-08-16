import React from "react";
import {Document, Page, PDFViewer, Text, StyleSheet, View} from "@react-pdf/renderer";
import {File} from "../interfaces/Types";

type PDFFileProps = {
    file: File;
};

function PDFFile({file}: PDFFileProps) {
    const Br = () => "\n";
    /*const styles = StyleSheet.create({
        page: {display: 'none', backgroundColor: 'white'},
        section: {textAlign: 'center', margin: 30}
    });*/
    return (
        <div>
            <PDFViewer height={500} showToolbar>
                <Document pageLayout={"singlePage"}>
                    <Page size={"A4"}>
                        <View>
                            <Text>
                                <h1>{file.title}</h1>
                                {file.tasks.map((task, index) => (
                                    <Text>
                                        {index + 1}. Frage: {task.question}
                                        <Br/>
                                        {task.options.map((option, index) => (
                                            <Text>
                                                {index + 1}. Option: {option.name}
                                                <Br/>
                                            </Text>))}
                                    </Text>

                                ))}

                            </Text>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );

}

export default PDFFile;