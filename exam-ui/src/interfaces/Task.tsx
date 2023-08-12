export interface Task {

    question: string;
    optionA?: string;
    optionB?: string;
    optionC?: string;
    optionD?: string;

}

export interface File {

    title: string;
    tasks: Task[];

}
export interface FileDetailsProps {
    files:File
}