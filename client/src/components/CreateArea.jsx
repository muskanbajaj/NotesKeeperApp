import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }
      

  async function submitNote(event) {
    const getData = async() =>{
      try{
        await fetch("http://localhost:8080/post",{
          method:"POST",
          body:JSON.stringify({newItem:note.content,title:note.title}),
          headers:{
            "Accept": "application/json",
            "Content-type":"application/json"
          }  ,
          mode: 'cors'
        });
      } catch(err){
        console.log(err);
      }
    }
    await getData();
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
