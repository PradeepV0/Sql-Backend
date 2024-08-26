import express from 'express'
import { db } from '../index.js';




const router = express.Router()


router.post("/Create", async (req, res) => {
  try {
    const data = req.body;
    db.getConnection((err,conntion)=>{
      if(err) throw err
      conntion.query('INSERT INTO users set ?',[data],(err,rows)=>{0
        conntion.release()
        if(!err){
          console.log("good",rows);
          res.send('Created Sucess Fully')          
        }else{
          console.log(err);          
        }
      })
    })       
  } catch (error) {
    res.status(400).json({erMsg : 'Internal Server Error'})
  }
  });
  
  router.get("/get-all", async (req, res) => {
    try {
      db.getConnection((err,conntion)=>{
        if(err) throw err
        conntion.query('SELECT * From users',(err,rows)=>{
          conntion.release()
          if(!err){
            console.log("good",rows);  
            res.send(rows)            
          }else{
            console.log(err);            
          }
        })
      })
    } catch (err) {
      res.status(400).json({erMsg : 'Internal Server Error'})
    }
  });
  
  
  router.put("/Update/:id", async (req, res) => {
    try {     
      const data = req.body;
      const id = req.params.id;
      console.log(data,id);      
      db.getConnection((err,conntion)=>{
        if(err) throw err
        conntion.query('UPDATE users set ? WHERE id = ?',[data,id],(err,rows)=>{
          conntion.release()
          if(!err){
            console.log("good",rows);  
            res.send('Updated Sucess Fully')            
          }else{
            console.log(err);
            
          }
        })
      })
      
    } catch (error) {
      res.status(500).json({data:"internal Server Error sssss"})
  
    }
  });
  
  router.delete("/Delete/:id", async (req, res) => {
    try {
      const id = req.params.id;      
      db.getConnection((err,conntion)=>{
        if(err) throw err
        conntion.query('DELETE From users WHERE id =  ?',[id],(err,rows)=>{
          conntion.release()
          if(!err){
            console.log("good",rows);  
            res.send('Deleted Sucess Fully')            
          }else{
            console.log(err);            
          }
        })
      })
    } catch (error) {
      res.status(500).json({data : "internal Server Error"})
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;      
      db.getConnection((err,conntion)=>{
        if(err) throw err
        // console.log('Connection Sucess')
        conntion.query('SELECT * From users WHERE id = ?',[id],(err,rows)=>{
          conntion.release()
          if(!err){
            console.log("good",rows);  
            res.send(rows[0])            
          }else{
            console.log(err);            
          }
        })
      })      
    } catch (error) {
      res.status(500).json({data:"internal Server Error"})
  
    }
  });
  
  // router.post('/create/Many', async (req, res) => {
  //   try {
  //   } catch (error) {
  //     res.status(500).json({data:"internal Server Error"})
  //   }
  // })



export const usersRouter = router