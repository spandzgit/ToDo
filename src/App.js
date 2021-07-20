import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";

import './App.css';

function Header() {
  return (
    <header className="app-header">
      <p className="header-text">To Do 's</p>
    </header>
  );
}

function SideNav() {
  return (
    <nav className="app-side-nav">
      <ul>
        <li>
          <Link to="/todo">Add ToDo's</Link>
        </li>
        <li>
          <Link to="/report">Report - Calendar View</Link>
        </li>
      </ul>
    </nav>
  )
}

function CalendarView() {
  return (
    <p>Calendar View</p>
  )
}

function TodoView() {
  return (
    <React.Fragment>
      <Header />
      <MainContainer />
    </React.Fragment>
  )
}

function TodoLists({editMode, editingTodo, ele, index, filterValue, handleEditChange, handleKeyChng, handleUpdate, handleDelete}) {
  return (
    editMode && editingTodo.oldStateTodo === ele.todo ? 
      <React.Fragment>
        <input type="text" 
               name="edit-ip" 
               className="todo-list-item" 
               key={`ip${index}`} 
               value={editingTodo.todo} 
               onChange={handleEditChange} 
               onKeyDown={handleKeyChng(index)}></input>
        <button className="todo-delete-btn" key={`ipbtnup${index}`} onClick={handleUpdate(index)}>e</button>
        <button className="todo-delete-btn" key={`ipbtndel${index}`} onClick={handleDelete(index)}>X</button>
      </React.Fragment>
        :
      <React.Fragment>
        <li className="todo-list-item" key={`li${index}`}>{ele.todo}</li>
        <button className="todo-delete-btn" key={`libtnup${index}`} onClick={handleUpdate(index)}>e</button>
        <button className="todo-delete-btn" key={`libtndel${index}`} onClick={handleDelete(index)}>X</button>
      </React.Fragment>
  )
}

TodoLists.propTypes = {
  editMode: PropTypes.bool.isRequired,
  editingTodo: PropTypes.object.isRequired,
  ele: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  filterValue: PropTypes.string.isRequired,
  handleEditChange: PropTypes.func.isRequired,
  handleKeyChng: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

function MainContainer() {
  const [todos, setTodos] = useState(
    []
  );

  const [inputValue, setInputValue] = useState(
    ''
  );

  const [editMode, setEditMode] = useState(
    false
  );

  const [editingTodo, setEditingTodo] = useState(
    {}
  )

  const [filterValue, setFilterValue] = useState(
    ''
  )

  const handleChange = event => {
    setInputValue(event.target.value);
  }

  const handlekeyDown = event => {
    if(event.key === 'Enter') {
      setTodos((oldState) => [...oldState, {todo: event.target.value, dueDate: new Date()}]);
      setInputValue('');
    }
  }

  const handleDelete = (index) => (event) => {
    event.preventDefault();
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  }

  const handleUpdate = (index) => (event) => {
    event.preventDefault();
    const updatedTodos = [...todos];
    setEditingTodo({oldStateTodo:updatedTodos[index].todo ,todo: updatedTodos[index].todo, dueDate: updatedTodos[index].dueDate});
    setEditMode(true);
  }

  const handleEditChange = event => {
    setEditingTodo({...editingTodo, todo: `${event.target.value}`});
  }

  const handleKeyChng = (index) => (event) => {
    if(event.key === 'Enter') {
      const updatedTodos = [...todos];
      updatedTodos[index].todo = editingTodo.todo;
      setTodos(updatedTodos);
      setEditMode(false);
    }
  }

  const handleFilterChange = event => {
    setFilterValue(event.target.value);
  }

  const handleFilterkeyDown = event =>{
    if(event.key === 'Enter') {
      setTodos((oldState) => oldState);
      setFilterValue('');
    }
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if(todos) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="app-main-container">
      <input placeholder="Add your ToDo's" 
             type="text" 
             name="todo" 
             id="todo" 
             size="50"
             value={inputValue}
             className="todo-input"
             onChange={handleChange}
             onKeyDown={handlekeyDown}></input>
      
      <input placeholder="Filter ToDos"
             type="text"
             name="filterTodos"
             id="filterTodos"
             size="30"
             value={filterValue}
             className="todo-filter"
             onChange={handleFilterChange}
             onKeyDown={handleFilterkeyDown}></input>

      <ul className="todo-list">
        {
          todos.filter((ele, index) => {
            return filterValue ? ele.todo.toLowerCase().includes(filterValue.toLowerCase()) : ele;
          }).map((ele, index) => {
            return (
              <div className="todo-list-items" key={index}>
                <TodoLists 
                  editMode={editMode}
                  editingTodo={editingTodo}
                  ele={ele}
                  index={index}
                  filterValue={filterValue}
                  handleEditChange={handleEditChange}
                  handleKeyChng={handleKeyChng}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Router>
        <SideNav />
          <div className="app-holder">
            <Switch>
              <Redirect exact from="/" to="/todo" />
              <Route path="/todo">
                <TodoView />
              </Route>
              <Route path="/report">
                <CalendarView />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

