import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext);
  //destructing, notes and setnotes are getting passed from NoteState.js
  // eslint-disable-next-line
  const{addNote} = context;

  //creating a new state
  const[note, setNote] = useState({"title" : "", "description" :"", "tag" : ""})

  const HandleOnClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  }

  //Spread function : where on change of anything we are making key value pair and setting it into state variable
  const onChange = (e) => {
        setNote({...note, [ e.target.name] : e.target.value})
  }
  return (
    <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
            <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" onChange={onChange} id="title" name="title" />
            </div>
            <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={onChange} aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} aria-describedby="emailHelp"/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={HandleOnClick}>Add Note</button>
        </form>
    </div>
  )
}

export default AddNote
