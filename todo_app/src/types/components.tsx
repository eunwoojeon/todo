export type TodoInputProps = {
    text: string;
    id: string;
    placeholder: string;
    state: any;
}

export type TodoInputSectionProps = {
    addTodo: React.MouseEventHandler<HTMLButtonElement>;
}

export type TodoListProps = {
    getTodoList: Function;
}

type Item = [string, string];
export type TodoArray = Item[];