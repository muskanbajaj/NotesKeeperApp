import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

    useEffect(()=>{
    const getData = async() =>{
      try{
        const res = await fetch("http://localhost:8080/");
        return res.json();
      } catch(err){
        console.log(err);
      }
    }
    getData().then((res)=>{
      console.log(res.message);
      setNotes(res.message);
    }).catch((err)=> console.log(err));
  },[]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {/* {console.log("here",notes) && notes.map((noteItem,index) => {
        console.log(noteItem);
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })} */}
      {notes.map((noteItem) => {
        return <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
      })
      }
      <Footer />
    </div>
  );
}

export default App;


// import React,{useState,useEffect} from "react";

// function App() {
//   const [data,setData] = useState("Testing");

//   useEffect(()=>{
//     const getData = async() =>{
//       try{
//         const res = await fetch("http://localhost:8080/post",{
//         method:"POST",
//         body:JSON.stringify({newItem:"abcd",title:"today"}),
//         headers:{
//           "Accept": "application/json",
//           "Content-type":"application/json"
//         }  ,
//         mode: 'cors'
//       });
//         // return res.json();
//       } catch(err){
//         console.log(err);
//       }
//     }
//     getData();
//     // getData().then((res)=>{
//     //   setData(res.message);
//     // }).catch((err)=> console.log(err));
//   },[]);

//   return (
//     <h1>{data}</h1>
//   );
// }

// export default App;