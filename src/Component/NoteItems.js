import React from 'react'

export default function NoteItems( props) {
  return (
    <div className="container">
        <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
            </div>
        </div>
    </div>
  )
}
