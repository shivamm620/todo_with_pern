import React,{Fragment, useEffect, useState} from 'react'
import EditTodo from './EditTodo';
const ListTodo =() =>{
  const [todo, setTodo] = useState([])
     const getTodo = async () =>{
        try {
            const response = await fetch('http://localhost:5000/todo')
            const JsonData = await response.json()
            setTodo(JsonData)
        } catch (error) {
            console.error(error.message)
        }
    }
    const deleteTodo = async (id) =>{
      try {
      const deleteTodo = await fetch(`http://localhost:5000/todo/${id}`,{
        method:'DELETE'
      })
      setTodo(todo.filter(todo => todo.id !== id))
      } catch (error) {
        console.error(error.message)
      }
    }

    useEffect(()=>{
        getTodo();
    },[]) 
    return <Fragment>
        <table className="table mt-5">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
    {todo.map(todo =>(
      <tr key={todo.id}>
        <td>{todo.description}</td>
        <td>
          <EditTodo todo={todo}/>
        </td>
        <td> <button
         onClick={() => deleteTodo(todo.id)} 
         className='btn btn-danger'>Delete</button> 
         </td>
      </tr> 
    ))}
  {/*       <tr>
        <td>{todo.description}</td>
        <td>Edit</td>
        <td>Delete</td>
      </tr>   */} 
    </tbody>
  </table>
    </Fragment>
}

export default ListTodo;