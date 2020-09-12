import React, { Fragment, useState } from 'react';

const InputTodo = () =>{
    const [description , setDescription] = useState('')
    const onsubmitForm = async e =>{
        e.preventDefault()
        try {
            const body = {description};
            const response =  await fetch("http://localhost:5000/todo", {
                method:"post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
          window.location='/'
        } catch (error) {
            console.log(error.message);
        }
    }
    return <Fragment>
        <h1 className='text-center mt-5'> 
        Pern with Todo
        </h1>
        <form className='d-flex mt-5' onSubmit={onsubmitForm}>
            <input type='text' className='form-control'
             value={description}
             onChange={e => setDescription(e.target.value)}
            />
            <button className='btn btn-success'>Add</button>
        </form>
    </Fragment>
}

export default InputTodo;