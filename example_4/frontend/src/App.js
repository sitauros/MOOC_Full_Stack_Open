import { useState, useEffect } from 'react'
import Note from './components/Note'
import Footer from './components/Footer'
import Notification from './components/Notification'
import noteService from './services/notes'

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("A new note...")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  useEffect( () => {
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes))
      .catch(error => console.log(error))
  }, [])
  
  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5,
    }
  
    noteService
      .create(noteObject)
      .then( returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote("")
      })
      .catch(error => console.log(error))
  }
  
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    const note = notes.find( note => note.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        setErrorMessage(`[${note.content}] was already deleted from server`)
        setTimeout( () => {
          setErrorMessage(null)
        }, 5000)
        
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
      <Footer />
    </div>
  )
}

export default App