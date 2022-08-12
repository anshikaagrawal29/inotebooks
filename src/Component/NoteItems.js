import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export default function NoteItems( props) {
  const context = useContext(noteContext);
  //destructing, notes and setnotes are getting passed from NoteState.js
  // eslint-disable-next-line
  const{deleteNote} = context;
  const {note, updateNote} = props;
  return (
    <div className="col-md-3">
        <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{props.note.title}</h5>
                <p className="card-text">{props.note.description}</p>
                <i className="fa-solid fa-pen-to-square mx-2" onClick={ () => updateNote(note)} ></i>
                <i className="fa-solid fa-trash-can" onClick={ () => {deleteNote(note._id)}}></i>
            </div>
        </div>
    </div>
  )
}
