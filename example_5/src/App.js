import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("A new note...")
  const [showAll, setShowAll] = useState(true)
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  useEffect( () => {
    noteService
      .getAll()
      .then( initialNote => setNotes(initialNote))
  }, [])
  
  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      id: notes.length +1,
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then( returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote("")
      })
  }
  
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    const note = notes.find( note => note.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then( returnedNote => {
        setNotes(notes.map( note => note.id === id ? returnedNote : note))
      })
      .catch( error => {
        alert(`the Note [${note.content}] was already deleted from server`)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div onClick={() => setShowAll(!showAll)}>
        <button>Show {showAll ? "important" : "all"}</button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} 
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)} 
          />)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App