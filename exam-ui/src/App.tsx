import React, {useState} from 'react';
import './App.css';
import Form from "./Generation/Form";
import PDFFile from "./Generation/PDFFile";
import {FileDetailsProps} from "./interfaces/Task";

function App() {
    return (

        <div className="App">
            <body>
            <div className="container text-center">
                <Form/>
            </div>
            </body>
        </div>

    );
}

export default App;
