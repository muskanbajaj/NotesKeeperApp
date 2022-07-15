import React from "react";

function Note(props) {

  function handleClick() {
    console.log(props.id);
    const getData = async() =>{
      try{
        await fetch("http://localhost:8080/delete",{
          method:"POST",
          body:JSON.stringify({newItem: props.id, title: props.title}),
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

    getData();
    props.onDelete(props.id);

  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Note;
