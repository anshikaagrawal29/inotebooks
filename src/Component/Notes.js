import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItems from './NoteItems';

const Notes = (props) => {
    const context = useContext(noteContext);
  //destructing, notes and setnotes are getting passed from NoteState.js
  // eslint-disable-next-line
  const{notes, setNotes} = context;
  return (
    <div className="row my-3">
        <h2>Your Notes</h2>
        {
          notes.map( (note) => {
            return <NoteItems key={note._id} note ={note} />
          })
        }
      </div>
  )
}

export default Notes