import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './App.css'

export default function App () {
  const [item, setNewItem] =  useState("")
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null) return []

    return JSON.parse(localValue)

  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function handleSubmit (e) {
    e.preventDefault() 

    setTodos(
      (currentTodos) => {
        return[...currentTodos, {id: crypto.randomUUID(), title: item, completed: false}]
      }
    )
    setNewItem("")
  } 
  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id){
          return {...todo, completed}
        }
        return todo;
      })
    })
  }
  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !==  id)
    })
  }
 
  return( 
  <>
   <form onSubmit={handleSubmit} className='new-item-form' action="">
    <div className="form-row">
      <label id='header-label' htmlFor="item">New item</label>
      <input value={item} 
      onChange={e => setNewItem(e.target.value)} 
      type="text" id='item' />
    </div>
    <button className='btn btn-primary '>Add</button>
  </form>
<h1 className="todo-list">Todo List</h1>
    <ul className="list-items bg-light w-75">
      { todos.length === 0 && <p id='text-color-test'>Your Todo is empty</p>}
        {todos.map(todo => {
              return (
          <li key={todo.id} className="item1 m-2">
            <label>
          <input type="checkbox" checked={todo.completed} name="" id="" onChange={e => toggleTodo(todo.id, e.target.checked)} />
          {todo.title}
          </label>
        <button onClick={() => deleteTodo(todo.id)} className="btn-danger rounded m-2">DELETE</button>
        </li>
              )
      })}
    </ul>
  </>
  )
}