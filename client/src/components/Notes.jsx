import React, { useState } from 'react';

function AddNotes(){
    const getNotes = () => {
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : [];
    };
    const saveNotes = (notes) => {
        localStorage.setItem('notes', JSON.stringify(notes));
    };
    const addNote = (title, text) => {
        const notes = getNotes();
        const newNote = { title, text };
        const updatedNotes = [...notes, newNote];
        saveNotes(updatedNotes);
        window.location.reload(); 
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const text = e.target.text.value;
        if (title && text) {
          addNote(title, text);
          e.target.title.value = '';
          e.target.text.value = '';
        }
    };
    return(
        <>
        <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Заголовок" required />
        <textarea name="text" placeholder="Содержание" required></textarea>
        <button type="submit">Добавить заметку</button>
        </form>
        <div>
            {getNotes().map((note, index) => (
            <div key={index} className="note">
                <h3>{note.title}</h3>
                <p>{note.text}</p>
            </div>
            ))}
        </div>
        </>
    )
}
export default AddNotes;