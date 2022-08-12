import React,{useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import NoteItems from './NoteItems';

const Notes = (props) => {
    const context = useContext(noteContext);
  //destructing, notes and setnotes are getting passed from NoteState.js
  // eslint-disable-next-line
  const{notes,fetchAllNotes} = context;
  useEffect(() => {
    fetchAllNotes()
  },[]);

  const ref = useRef(null)
  
  const updateNote = (currentNote) =>{
      ref.current.click();
      setNote({etitle : currentNote.title , edescription : currentNote.description, etag : currentNote.tag});
  }

  //creating a new state
  const[note, setNote] = useState({"etitle" : "", "edescription" :"", "etag" : ""})

  const HandleOnClick = (e) => {
    e.preventDefault();
    console.log("updating the note", note)
  }

  //Spread function : where on change of anything we are making key value pair and setting it into state variable
  const onChange = (e) => {
        setNote({...note, [ e.target.name] : e.target.value})
  }
  return (
    <>
    <AddNote/>
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                  <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" onChange={onChange} value={note.etitle} id="etitle" name="etitle" />
                  </div>
                  <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} aria-describedby="emailHelp"/>
                  </div>
                  <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} aria-describedby="emailHelp"/>
                  </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={HandleOnClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
          <h2>Your Notes</h2>
          {
            notes.map( (note) => {
              return <NoteItems key={note._id} note ={note} updateNote = {updateNote}/>
            })
          }
        </div>
      </>
  )
}

export default Notes
