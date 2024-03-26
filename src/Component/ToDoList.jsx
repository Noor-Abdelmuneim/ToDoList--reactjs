import React, { useState } from 'react'
import TodoItem from './ToDoItem';

function ToDoList() {
   
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Reading Cursera',
            completed:true,
        },
        {
            id: 2,
            text: 'Make Portfolio',
            completed:true,
        }
    ]);
    const [text, setText] = useState('');
    const [editId, setEditId] = useState(null);

    function addTask(text){
        const newTask = {
            id: Date.now(),
            text,
            completed: false
        };
        setTasks([...tasks, newTask]);
        setText('');
    }

    // delete task
    function deleteTask(id){
        setTasks(tasks.filter(task => task.id !== id));
    }
    
    // status of task
    function toggleCompleted(id) {
        setTasks(tasks.map(task => {
        if (task.id === id) {
        return {...task, completed: !task.completed};
        } else {
        return task;
        } 
        }));
        }

        function editTask(id, newText) {
            setTasks(tasks.map(task => {
            if (task.id === id) {
            return {...task, text: newText};
            } else {
            return task;
            } 
            }));
            setEditId(null); //reset edit state after editing
            }

        return (
            <div className="todo-list">
                            <form onSubmit={(e) => {
                e.preventDefault();
                if (editId !== null) {
                    editTask(editId, text);
                } else {
                    addTask(text);
                }
            }}>
                <input
                    value={text}
                    onChange={e => setText(e.target.value)} 
                    required
                />
                <button type="submit">{editId !== null ? 'Update' : 'Add'}</button>
            </form>
            {tasks.map(task => (
            <TodoItem
            key={task.id} 
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted} 
            editTask={editTask}
            isEditing={editId === task.id}
            setEditId={setEditId}
            />
            ))}
          
            </div>
            );
           }

export default ToDoList