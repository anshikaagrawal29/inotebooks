import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>
{
    const s1 = {
        "name" : "Anshika",
        "class" : "5a"
    }

    const[state,setState] = useState(s1);
    
    return(
        <NoteContext.Provider value={state}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;