import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>
{
      const host = "http://localhost:5000";

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
      const addNote = (title, description, tag) =>
      {
        console.log("Adding a new note");
        const note = {
            "_id": "62f23b8e44dsd9ccd5a817e198a",
            "user": "62f0c545dsd65007cb2f2dbc7bb",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-08-09T10:48:46.057Z",
            "__v": 0
          };
            setNotes(notes.concat(note))
      }

      //Edit Note
      const editNote = () =>
      {

      }

      //Delete Note
      const deleteNote = (id) =>
      {
        console.log(id);
      }
    return(
        <NoteContext.Provider value={{notes,addNote, editNote, deleteNote,fetchAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState; 