import './App.css';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [data, setData] = useState("");
  const [arrList, setArrList] = useState([]);
  const [check, setCheck] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (check && data) {
      // Update list
      const result = arrList.map((list) => {
        if (list.id === editId) {
          return { ...list, list: data };
        }
        return list;
      });
      setArrList(result);
      setData("");
      setCheck(false);
      setEditId(null);
    } else {
      // Generate a unique ID using uuid
      const uniqueId = uuidv4();
      // New data
      const newList = {
        id: uniqueId,
        list: data,
        completed: false
      };

      // Save data
      setArrList([...arrList, newList]);
    }
  };

  // Delete
  const removeList = (id) => {
    const result = arrList.filter((data) => data.id !== id);
    setArrList(result);
  };

  // Edit
  const editList = (id) => {
    setCheck(true);
    setEditId(id);
    const find = arrList.find((list) => list.id === id);
    setData(find.list);
  };

  // Toggle completion status
  const toggleCompletion = (id) => {
    const updatedList = arrList.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setArrList(updatedList);
  };

  return (
    <div className="container m-5 p-2 rounded mx-auto bg-light shadow">
      <div >
        <p className="p-1 h1 text-primary text-center mx-auto display-inline-block">To do list app</p>
        <form onSubmit={handleSubmit}>
          <div className="col col-11 mx-auto">
            <div className='row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center'>
              <input
                type="text"
                className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
                onChange={handleChange}
                value={data}
                placeholder="Add new .."
              />
              <div className='col-auto px-0 mx-0 mr-2'>
                <button type="submit" className="btn btn-primary">
                  {check ? "Edit" : "Add"}
                </button>
              </div>

            </div>
          </div>
        </form>
      </div>
      <div class="p-2 mx-4 border-black-25 border-bottom"></div>
      <div className="">
        {arrList.map((item, index) => (
          <div key={item.id} className='row mx-1 px-5 pb-3 w-80'>
            <div className="col mx-auto">
              <p
                style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
                className='form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3'
              >
                {item.list}
              </p>
              <div className=''>
                <button onClick={() => toggleCompletion(item.id)} className='fa fa-trash-o text-success btn mr-2'>
                  {item.completed ? 'Uncheck' : 'Check'}
                </button>
                <button onClick={() => editList(item.id)} className='fa fa-trash-o text-warning btn mr-2'>Edit</button>
                <button onClick={() => removeList(item.id)} className='fa fa-trash-o text-danger btn mr-2'>Delete</button>
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
