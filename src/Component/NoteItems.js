import React from 'react'

export default function NoteItems( props) {
  return (
    <div className="col-md-3">
        <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{props.note.title}</h5>
                <p className="card-text">{props.note.description}</p>
                <i className="fa-solid fa-pen-to-square mx-2"></i>
                <i className="fa-solid fa-trash-can"></i>
            </div>
        </div>
    </div>
  )
}
