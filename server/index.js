const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors())
app.use(express.json())

//post 
app.post('/todo', async (req,res)=>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        )
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})
// get a alltodo
app.get("/todo", async(req,res)=>{
    try {
        const alltodo = await pool.query("select * from todo")
        res.json(alltodo.rows)
    } catch (error) {
        console.log(error.message)
    }
})
app.get('/todo/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE id =$1" , [id]);
        res.json(todo.rows[0])
    } catch (err) {
        console.log(err.message);
    }
})
//update a todo 
app.put("/todo/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE id = $2",
        [description, id]
      );
  
      res.json("Todo was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  // delete todo;
  app.delete("/todo/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [
        id
      ]);
      res.json("Todo was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });
app.listen(5000,()=>{
    console.log('sever started on port 5000');
})