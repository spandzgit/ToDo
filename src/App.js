import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

/**
 * Header component for the ToDo view to render the Header of the App.
 */
function Header() {
  return (
    <header className="app-header">
      <p className="header-text">To Do 's</p>
    </header>
  );
}

/**
 * Side Navigation component rendering the side navigation bar containing navgiation list items
 * and correspoding link paths to render.
 */
function SideNav() {
  return (
    <nav className="app-side-nav">
      <ul className="app-nav-list">
        <li className="app-nav-list-items">
          <Link to="/todo">Add ToDo's</Link>
        </li>
        <li>
          <Link to="/report">Report - Calendar View</Link>
        </li>
      </ul>
    </nav>
  )
}

/**
 * App reporting component to render calendar. Using third party react component <react-big-calendar>
 * dependency added.
 */
function CalendarView() {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if(todos) {
      let events = todos.map((ele, idx) => {
        return {
          title: ele.todo,
          start: ele.dueDate,
          end: ele.dueDate
        }
      });
      setEvents(events);
    }
  }, []);

  return (
    <div className="app-calendar-holder">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700, width: 900 }}
      />
    </div>
  )
}

/**
 * Todo view encapsulator for the main view for Todo's containing the header and mainContainer
 * components.
 */
function TodoView() {
  return (
    <React.Fragment>
      <Header />
      <MainContainer />
    </React.Fragment>
  )
}

/**
 * ToDo List Component. Takes all the todo details and handlers as props and renders the view accordingly.
 */
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

/**
 * Main Container component. Has the component state and handler function implementations.
 * Child component rendering with passing related props.
 */
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
    setEditingTodo({...editingTodo, todo: event.target.value});
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

/**
 * Base App Component rendering the complete view of the App. Side nav for side navigation and related
 * router to link the correspoding path(component) to render.
 */
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
                <CalendarView/>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

