import React, {useState} from 'react';

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
      ToDo Add Side Nav!
    </nav>
  )
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
    setEditingTodo({...editingTodo, todo: `${event.target.value}s`});
  }

  const handleKeyChng = (index) => (event) => {
    if(event.key === 'Enter') {
      const updatedTodos = [...todos];
      updatedTodos[index].todo = editingTodo.todo;
      setTodos(updatedTodos);
      setEditMode(false);
    }
  }

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
      <ul className="todo-list">
        {
          todos.map((ele, index) => {
            return (
              <div className="todo-list-items" key={index}>
                {editMode && editingTodo.oldStateTodo === ele.todo ? 
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
                }
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
        <SideNav />
        <div className="app-holder">
          <Header />
          <MainContainer />
        </div>
      </div>
    );
  }
}

