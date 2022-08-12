import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>
{
      const host = "http://localhost:5005";
      const[notes, setNotes] = useState([]);

      //fetch all notes
      const fetchAllNotes = async () =>{
        const url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json',
            "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMGM1NDU2NTAwN2NiMmYyZGJjN2JiIn0sImlhdCI6MTY1OTk0NjMzMX0.LgXNcHxvgqibZwWRGW_-yWsnvSq1XCBtjT2ToZtX9Mo"
          }
        });
        let json = await response.json()
        setNotes(json)
      }

      //Add Note
      const addNote = async (title, description, tag) =>
      {
        const data = JSON.stringify({
          "title" : title,
          "description" : description,
          "tag" : tag
        });
        const url = `${host}/api/notes/addnote`;
        const addNoteInDB = await fetch(url, {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json',
            "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMGM1NDU2NTAwN2NiMmYyZGJjN2JiIn0sImlhdCI6MTY1OTk0NjMzMX0.LgXNcHxvgqibZwWRGW_-yWsnvSq1XCBtjT2ToZtX9Mo"
          },
          body : data
        });

        let note = await addNoteInDB.json()
        setNotes(notes.concat(note));
      }

      //Edit Note
      const editNote = () =>
      {

      }

      //Delete Note
      const deleteNote = async (id) =>
      {
          const url = `${host}/api/notes/deletenote/${id}`;
          console.log(id);
          console.log(url);
          const deleteNotes = await fetch(url, {
            method : 'DELETE',
            headers : {
              'Content-Type' : 'application/json',
              "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMGM1NDU2NTAwN2NiMmYyZGJjN2JiIn0sImlhdCI6MTY1OTk0NjMzMX0.LgXNcHxvgqibZwWRGW_-yWsnvSq1XCBtjT2ToZtX9Mo"
            }
          });
          console.log(deleteNotes);
      }

    return(
        <NoteContext.Provider value={{notes,addNote, editNote, deleteNote,fetchAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState; 