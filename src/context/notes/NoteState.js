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
      const editNote = async (id,title,description, tag) =>
      {
          const url = `${host}/api/notes/updatenote/${id}`;
          const updateNotesResponse = await fetch(url, {
            method : 'PUT',
            headers : {
              'Content-Type' : 'application/json',
              "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmMGM1NDU2NTAwN2NiMmYyZGJjN2JiIn0sImlhdCI6MTY1OTk0NjMzMX0.LgXNcHxvgqibZwWRGW_-yWsnvSq1XCBtjT2ToZtX9Mo"
            },
            body : JSON.stringify({title, description, tag})
          });

          const resJson = await updateNotesResponse.json();

          //To see updates directly on screen we need this function
          //now we have to create new notes again because we cannot directly updated the notes, so 
          //we are parsing it and creating a new note
          let newNotes = JSON.parse(JSON.stringify(notes));
          for(let i =0; i <newNotes.length; i++)
          {
            const elemId = newNotes[i]._id;
            if(elemId === id)
            {
              newNotes[i].title = title;
              newNotes[i].description = description;
              newNotes[i].tag = tag;
              break;
            }
          }
          setNotes(newNotes);
      }

      //Delete Note
      const deleteNote = async (id) =>
      {
          const url = `${host}/api/notes/deletenote/${id}`;
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