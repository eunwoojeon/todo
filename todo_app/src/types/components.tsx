export type TodoInputProps = {
    text: string;
    id: string;
    placeholder: string;
    state: any;
}

export type TodoInputSectionProps = {
    addTodo: React.MouseEventHandler<HTMLButtonElement>;
}

export type TodoListSectionProps = {
    user_id: string;
}

export type TodoItem = {
    _id: string;
    user_id: string;
    title: string;
    description: string;
    status: string;
    createAt: string;
    updateAt: string;
};
// type Item = [string, string];
// export type TodoArray = Item[];