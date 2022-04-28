import React from "react";

const Todolist = ({todos, setTodos}) =>{
    return(
        <div >
           {todos.map((todo) => (
               <li className="todo-list" key={todo.id}>
                   <input type="text" value={todo.title} classname="list" onChange= {(event) => event.preventDefault()} />
               </li>
           )

           )}
        </div>
    );
};

export default Todolist;