import React, { useEffect } from "react";
import { useState } from "react";
import TodoList from "./todoList";

const Form = () => {
  const [input, setinput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editItem, setEditItem] = useState(false);
  const [editId, setEditId] = useState("");
  const [search, setSearch] = useState();
  const [filteredTodo, setFilteredTodo] = useState([]);
  const [select, setSelect] = useState("");
  //form input
  const inputItem = (e) => {
    const searchText = e.target.value;
    setinput(searchText);
    // console.log(input)tus
  };

  const submitItem = (e) => {
    e.preventDefault();
    if (!editItem) {
      setTodos([
        ...todos,
        {
          title: input,
          id: Math.ceil(Math.random() * 1000000),
          completed: false,
        },
      ]);
      setinput("");
    }
    if (input && editItem) {
      //set item to edit
      setTodos(
        todos.map((item) => {
          if (item.id === editId) {
            return { ...item, title: input };
          }
          return item;
        })
      );
      // setName('')
      setEditId("");
      setEditItem(false);
      setinput("");
    }
  };
  //edit item
  const handleEdit = (id) => {
    //  console.log(id);
    const filter = todos.find((todo) => todo.id === id);
    setEditItem(true);
    setEditId(filter.id);
    setinput(filter.title);
  };
  //search field

  useEffect(() => {
    if (search !== "") {
      let searchTodo = todos.filter((todo) => {
        return Object.values(todo).some((name) =>
          String(name).toLowerCase().includes(search.toLowerCase())
        );
      });
      setTodos(searchTodo);
    } else {
      setTodos(todos);
    }
  }, [search]);
  //select field
  const handleSelect = (e) => {
    setSelect(e.target.value);
    console.log(todos, select);
    //completed task
  };
  return (
    <div className="wrapper">
      <header>Todo App</header>
      <form className="inputField" onSubmit={submitItem}>
        <input
          className="inputField"
          type="text"
          value={input}
          onChange={inputItem}
          required
          placeholder="Add your new todos"
        />
        <button className="AddBtn" type="submit">
          {editItem ? "Edit" : "Add"}
        </button>
      </form>

      <div className="todos-list">
        <TodoList
          todos={todos}
          input={input}
          handleEdit={handleEdit}
          setinput={setinput}
          setTodos={setTodos}
          setSearch={setSearch}
          handleSelect={handleSelect}
        />
      </div>
    </div>
  );
};

export default Form;
