import React, { useState } from 'react';

function TodoItem({ task, deleteTask, toggleCompleted, editTask, isEditing, setEditId }) {
    const [editedText, setEditedText] = useState(task.text);

    function handleChange() {
        toggleCompleted(task.id);
    }

    function handleEdit() {
        setEditId(isEditing ? null : task.id); // Toggle edit mode
        if (isEditing) {
            // Save changes when toggling off edit mode
            editTask(task.id, editedText);
        }
    }

    function handleInputChange(e) {
        setEditedText(e.target.value);
    }

    return (
        <div className="todo-item">
            <input 
                type="checkbox"
                checked={task.completed}
                onChange={handleChange}
            />
            {isEditing ? (
                <input
                    type="text"
                    value={editedText}
                    onChange={handleInputChange}
                />
            ) : (
                <p>{task.text}</p>
            )}
            <button onClick={handleEdit}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
            <button onClick={() => deleteTask(task.id)}>X</button>
        </div>
    );
}

export default TodoItem;