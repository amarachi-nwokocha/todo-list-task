import { useEffect } from "react";
import React from "react";
import './todolist.css'

const TodoList = ({ handleEdit,handleSelect, todos,setSearch, setTodos }) => {
  //delete item
  const handleDelete = ({ id }) => {
    console.log(id, todos);
    const filter = todos.filter((todo) => todo.id !== id);
    console.log(filter);
    setTodos(filter);
  };
 

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  
  return (
    <div className="container">
      <div className="header">
    
      <div id="date"></div>
      </div>
      <div className="content">
        <div className="top-bar">
       <input type= 'text' placeholder='find lost todo' onChange={(e)=>setSearch(e.target.value)}/>
       <select  id="sselect" placeholder="filter todo list"name={'select'} onChange={(e)=> handleSelect(e)}  >
      <option value="all ">All tasks</option>
      <option value="active">Active tasks</option>
      <option value="completed">Completed tasks</option>
    </select>
        </div>
      {
        // console.log(todos)
        todos.length > 0 ? (
          todos.map((todo) => (
            <ul className="todoList">
              <span className="item-wrap">
                
            <li key={todo.id} value={todo.title} className={todo.completed ? 'todo-item complete' : 'todo-item'}>
             {todo.title}
            </li>
            <span className="align-icons">
                 {/* done */}
              <button className="icon " >
                <i className="fa-regular fa-circle-check " id="orange"  onClick={() => completeTodo(todo.id)}></i>
              </button>
              {/* edit */}
              <button className="icon">
                <i
                  className="fa-regular fa-pen-to-square"
                  id="green"
                 // onClick={() =>console.log(todo.id)}
                  onClick={() => handleEdit(todo.id)}
                ></i>
              </button>
              {/* delete */}
              <button className="icon">
                <i
                  className="fa-sharp fa-solid fa-trash"
                  id="red"
                  onClick={() => handleDelete(todo)}
                ></i>
              </button>
            </span>
             
              </span>
            </ul>
          ))
        ) : (
          <p>Add a new todo</p>
        )
      }
       <div class="footer">
      
    </div>
      </div>
    </div>
  );
};

export default TodoList;
