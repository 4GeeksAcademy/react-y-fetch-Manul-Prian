import React, {useEffect, useState} from "react";

function Home() {
	const [todoList, setTodoList] = useState ([]);
	const [inputValue, setInputValue] = useState ("");
	
	const traerTarea = () => {
		const requestOptions = {
			method: "GET",
			redirect: "follow"
		  };
		  
		  fetch("https://playground.4geeks.com/todo/users/Manul_Prian", requestOptions)
			.then((response) => response.json())
			.then((result) => {
					setTodoList(result.todos)
					console.log(result.todos)})
			.catch((error) => console.error(error));
	}
	useEffect (( )=>{
		traerTarea();
	},[]);
	
	const crearTarea =() => { 
		if(inputValue.length >= 3){
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({
  			"label": inputValue,
  			"is_done": false
	});

	const requestOptions = {
  	method: "POST",
  	headers: myHeaders,
 	 body: raw,
 	 redirect: "follow"
	};

fetch("https://playground.4geeks.com/todo/todos/Manul_Prian", requestOptions)
  .then((response) => response.json())
  .then((result) => {
	traerTarea();
	setInputValue("");
	console.log(result)})
  .catch((error) => console.error(error));
}}

	const eliminarTarea = (id) => {
		

        
    const requestOptions = {
     method: "DELETE",
    
     redirect: "follow"
   };

   fetch(`https://playground.4geeks.com/todo/todos/${id}`, requestOptions)
    .then(response => {
	if (!response.ok) {console.log("error")}
	return console.log(response);})
    .then((result) => {
		traerTarea();
		console.log(result)})
    .catch((error) => console.error(error));
   }

   function actualizacionDeEntrada(event) {
	   setInputValue(event.target.value);
   }
   return (
	   <div className="container">
		   <h1>My Lista de tareas</h1>
		   <input
				   type="text"
				   placeholder="Escribe tarea..."
				   value={inputValue}
				   onChange={actualizacionDeEntrada}
		   />
		   <div className="botones-prioridad">
			   <button onClick={() => crearTarea()}>
				   Muy Importante
			   </button>
			   
		   </div>
		   <div className="bloques-tareas">
			   <div className="bloque">
				   <h2>Muy Importante</h2>
				   <ul>
					   {todoList.map((tarea, index) => (
						   <li key={index}>
							   {tarea.label}
							   <button onClick={() => eliminarTarea(tarea.id)}>
								   Eliminar
							   </button>
						   </li>
					   ))}
				   </ul>
			   </div>
			   
		   </div>
	   </div>
   );
};
		



export default Home;
