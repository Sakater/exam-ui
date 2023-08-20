import React, {useState} from 'react';
import './App.css';
import Form from "./Generation/Form";
import PDFFile from "./Generation/PDFFile";
import {FileDetailsProps, File} from "./interfaces/Task";
import { v4 as uuidv4 } from "uuid";


function App() {
        const initialFileState: File = {
            tasks: [
                {
                    question: '',
                    options: {},
                    id: uuidv4(),
                }
            ],
            title: ''
        };
    return (

        <div className="App">
            <body>
            <div className="container text-center">
                <Form fileDetailsProps={{ files: initialFileState }} />
            </div>
            </body>
        </div>

    );
}

export default App;
