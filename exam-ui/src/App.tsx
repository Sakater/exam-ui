import React, {useState} from 'react';
import './App.css';
import Form from "./Generation/Form";
import PDFFile from "./Generation/PDFFile";
import {FileDetailsProps} from "./interfaces/Task";

function App() {

    const initialFileState: FileDetailsProps = {
        files: {
            tasks: [{
                question: '',
                optionA: '',
                optionB: '',
                optionC: '',
                optionD: '',
            }],
            title: ''
        }
    }

    function updateFile(updatedFile: FileDetailsProps){
        setFile(updatedFile);
    }

    const [file, setFile] = useState<FileDetailsProps>(initialFileState);
    return (

        <div className="App">
            <body>
            <div className="container text-center">
                    <Form files={file.files}/>
            </div>
            </body>
        </div>

    );
}

export default App;
