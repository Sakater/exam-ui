import React from "react";
import puppeteer, {ConnectOptions} from "puppeteer";
import {File} from "../interfaces/Types";

type PDFFileProps = {
    file: File;
};
/*const createPdf = async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        /!*page.goto('')*!/
    }*/
function PDFFile({file}: PDFFileProps) {

    return (
        <div>

        </div>
    );


}

export default PDFFile;