import { useState } from 'react'

export default function App() {
  const DEFAULT_TASKS = [
    "Walk the dog",
    "Water the plants",
    "Wash the dishes",
  ]

  const [taskText, setTaskText] = useState("");
  const [currentTasks, setCurrentTasks] = useState(DEFAULT_TASKS)


  const handleTaskUpdate = (e) => {
    let taskTextInput = e.target.value;

    setTaskText(taskTextInput);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let allTasks = currentTasks;
    allTasks.push(taskText);

    setCurrentTasks(allTasks)
    setTaskText("");
  }

  const deleteTask = (task) => {
    let filteredTasks = currentTasks.filter(currTask => currTask !== task)

    setCurrentTasks(filteredTasks)
  }

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="Add your task" onChange={e => handleTaskUpdate(e)} value={taskText} />
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
      <ul>
        {currentTasks.map(task => {
          return (
            <li>
              <span>{task}</span>
              <button onClick={() => deleteTask(task)}>Delete</button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
