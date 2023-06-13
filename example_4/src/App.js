import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("A new note...")
  const [showAll, setShowAll] = useState(true)
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  useEffect( () => {
    axios.get('http://localhost:3001/notes')
         .then( response => setNotes(response.data))
  }, [])
  
  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length +1,
    }

    axios.post('http://localhost:3001/notes', noteObject)
         .then(response => {
            console.log(response)
            setNotes(notes.concat(response))
            setNewNote("")
          }
    )
  }

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find( note => note.id === id)
    const changedNote = {...note, important: !note.important}

    axios.put(url, changedNote)
         .then(response => {
            setNotes(notes.map( note => 
              note.id === id ? response.data : note
            ))
          }
    )
  }
  
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
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