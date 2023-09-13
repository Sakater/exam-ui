export type Task = {

    question: string;
    options: Option[];
    optionsInARow: number;
    id: Id;
    /**
    * helping-lines per row
    * */
    lines: number;
    totalLines: number

}
export type Option = {
    name: string;
    id: Id;
}
export type Id = string;


export type File = {

    title: string;
    tasks: Task[];
    author: string;
    date: string;

}