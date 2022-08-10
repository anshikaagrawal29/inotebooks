import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>
{
    const initialNotes = [
        {
          "_id": "62f23b87449ccd5a817e1986",
          "user": "62f0c54565007cb2f2dbc7bb",
          "title": "hello Anshika - 1",
          "description": "Wake up at 7:00 am",
          "tag": "Fitness",
          "date": "2022-08-09T10:48:39.762Z",
          "__v": 0
        },
        {
          "_id": "62f23b8b449ccd5a817e1988",
          "user": "62f0c54565007cb2f2dbc7bb",
          "title": "hello Anshika - 2",
          "description": "Wake up at 7:00 am",
          "tag": "Fitness",
          "date": "2022-08-09T10:48:43.203Z",
          "__v": 0
        },
        {
          "_id": "62f23b8e449ccd5a817e198a",
          "user": "62f0c54565007cb2f2dbc7bb",
          "title": "hello Anshika - 3",
          "description": "Wake up at 7:00 am",
          "tag": "Fitness",
          "date": "2022-08-09T10:48:46.057Z",
          "__v": 0
        }
      ];
    
      const[notes, setNotes] = useState(initialNotes);
    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;