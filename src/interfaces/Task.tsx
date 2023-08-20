export interface Task {

    question: string;
    options: Record<string, string>;
    id: string | null;

}

export interface File {

    title: string;
    tasks: Task[];

}

export interface FileDetailsProps {
    files: File
}