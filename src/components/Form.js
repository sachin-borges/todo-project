import React,{useState, useEffect}  from "react";
import {TextField} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import qs from 'qs';
import CardHeader from '@mui/material/CardHeader';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
const Todos = () =>{
      const [todos, setTodo] = useState([]);
      const [title, setTitle] =  useState("");
      const [due_date, setDueDate] =  useState("");

       useEffect(() => {
        fetch("http://localhost:4001/todos").then(response => response.json()).then(json=>setTodo(json.response))
        console.log(todos)
      },[])
      const onTitleChanged = e => setTitle(e.target.value);
      const onDateChanged = e => setDueDate(e.target.value);
      const saveTodo = ()=>{
        // let todoArray = todos
        // todoArray.push(todoObj)
        console.log(todos)
        todos.push({id:todos.length + 1, title})
        console.log(todos)
        var ajxProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: qs.stringify({title, due_date:due_date})
        }
        fetch('http://localhost:4001/todo', ajxProps)
        .then(response => response.json())
        .then(json => {console.log(json)})
        setTodo(todos)
    }  

    const deleteTodo = (currentId) => {
        
      let ajxProps = {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
          body: qs.stringify({id: currentId})
      }
      fetch('http://localhost:4001/todo', ajxProps)
      .then(response => response.json())
      .then(json => {console.log(json)})
      let todosArry = todos.filter((item)=> item.id !== currentId)
      setTodo(todosArry)
  }
    return(<div>
    <div>
        <Stack spacing={1}>
        <TextField style ={{width: '35%'}} id="outlined-basic" value={title} onChange={onTitleChanged} label="Enter name" variant="outlined" />
        <TextField style ={{width: '35%'}} id="outlined-basic" value={due_date} onChange={onDateChanged} type="date" label="Select date (optional)" variant="outlined" />
        <button className="savebutton" onClick={saveTodo}>Save</button>
        </Stack>
        </div>
        <div className="cards">
        <Stack spacing={3}>
        
       {todos.map(item => <Card sx={{ maxWidth: 545 }} key={item.id}>
      <CardHeader
       
        action={
          <IconButton aria-label="settings" onClick={()=> deleteTodo(item.id)}> 
            <DeleteOutlinedIcon />
          </IconButton>
        }titleTypographyProps={{variant:'p' }}
        title={item.title}
        subheader={item.due_date}
        
      />
       </Card>)}

       
       </Stack>
       </div>
        </div>
    )
}

export default Todos;