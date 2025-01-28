import React, { useCallback, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";
import './index.css'

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 300,
});

/**
* This is the initial todo state.
* Instead of loading this data on every reload,
* we should save the todo state to local storage,
* and restore on page load. This will give us
* persistent storage.
*/
const initialData: Todo[] = [
  {
    id: uuid(),
    label: "Buy groceries",
    checked: false,
    createdAt: new Date()
  },
  {
    id: uuid(),
    label: "Reboot computer",
    checked: false,
    createdAt: new Date()
  },
  {
    id: uuid(),
    label: "Ace CoderPad interview",
    checked: true,
    createdAt: new Date(),
    completedAt: new Date()
  },
];

function App() {
  const sortTodos = (a, b) => {
    return Number(a.checked) - Number(b.checked);
  }

  let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
  let initDataOrLocalStorage = localStorageTodos.length > 0 ? localStorageTodos : initialData;
  initDataOrLocalStorage.sort(sortTodos)
  const [todos, setTodos] = useState<Todo[]>(initDataOrLocalStorage);
  const [hoveringId, setHoveringId] = useState('');

  const addTodo = useCallback((label: string) => {
    setTodos((prev) => [
      {
        id: uuid(),
        label,
        checked: false,
      },
      ...prev,
    ]);
  }, []);

  const handleTodoClick = (todo) => {
    // handle the check/uncheck logic
    let updatedTodos = todos.map(currentTodo => {
      if (currentTodo.id === todo.id) {
        currentTodo.checked = !currentTodo.checked;
        currentTodo.completedAt = currentTodo.checked ? new Date(): null;
      }
      return currentTodo
    });
    updatedTodos.sort(sortTodos)
    setTodos(updatedTodos);
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const deleteTodo = (todoId) => {
    let todoWithDeletion = todos.filter(currentTodo => currentTodo.id !== todoId);
    setTodos(todoWithDeletion)
  }

  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {todos.map((todo) => (
          <span key={todo.id}
            onMouseEnter={() => setHoveringId(todo.id)}
            onMouseLeave={() => setHoveringId('')}
            className = 'todo-flex'
          >
            <TodoItem {...todo}
              onChange={() => handleTodoClick(todo)}
            />
            {hoveringId === todo.id ? 
            <span onClick={()=> deleteTodo(todo.id)}id='delete-todo'>X</span>
            : ''}
          </span>
        ))}
      </TodoList>
    </Wrapper>
  );
}

export default App;
