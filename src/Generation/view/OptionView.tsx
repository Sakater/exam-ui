import React from "react";
import {Option} from "../../interfaces/Types";

type OptionViewProps = {
    option: Option;
    dynamicSize: (expanse: number) => number;
    alphabet: string[];
    indexOption: number;
    totalLines: number;
    lines: number;

}

export default function ({option, dynamicSize, alphabet, indexOption, totalLines, lines}: OptionViewProps) {
    return (
        <div key={option.id} style={{
            textAlign: "left",
            paddingTop: "30pt",
            paddingLeft: `${dynamicSize(12)}pt`,
            display: "inline-grid",
            gridTemplateColumns: "20% auto",
            gridTemplateRows: "100%",
            fontSize: `${dynamicSize(12)}pt`
        }}>
            <div>{`${alphabet.at(indexOption)}) `}</div>
            <div style={{overflow: "hidden"}}>{option.name}
                
                {totalLines > 0 &&
                    Array.from({length: totalLines}, (_, index) => (
                        <div key={index} style={{marginRight: "10%", marginTop: "5%"}}>
                            {lines > 0 &&
                                Array.from({length: lines}, (_) => (
                                    <div style={{borderBottom: "solid black 1px", marginBottom: "3%"}}></div>
                                ))}
                        </div>))}</div>
        </div>
    )
}