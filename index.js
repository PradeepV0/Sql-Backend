import express from 'express'
import mySql from 'mysql'
import dotenv from 'dotenv'
import { usersRouter } from './routes/users.js'
import bodyParser from 'body-parser';


dotenv.config()


export const  db = mySql.createPool({
  connectionLimit : 10,
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
})


db.getConnection((err,conntion)=>{
  if(err) throw err
  // console.log('Connection Sucess')
  conntion.query('select * from users',(err,rows)=>{
    conntion.release()
    if(!err){
      console.log("good",rows);
      
    }else{
      console.log(err);
      
    }
  })
})

const app = express()

app.use(express.json());


app.use('/users',usersRouter)

app.use(bodyParser.json());












app.listen(9000,()=>{
  console.log('server started');
  
})











































// import {DataTypes} from 'sequelize'
// import db from './db.js'


// try {
//     await db.sync();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }



// db.define(
//     'product',
//     {
//       // Model attributes are defined here
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       product_code: {
//         type: DataTypes.STRING,
//         // allowNull defaults to true
//       },
//       price: {
//         type: DataTypes.INTEGER,
//         // allowNull defaults to true
//       },
//     },
//     {
//       // Other model options go here
//         timestamps: false,
//     },
//   );

// const User = db.define(
//     'user',
//     {
//       // Model attributes are defined here
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         // allowNull defaults to true
//       },
//     },
//     {
//         timestamps: false,
//       // Other model options go here
//     },
//   );
  
// //   const jane = await User.create({ firstName: 'Dhivya', lastName: 'V' });

// //   const users = await User.findAll();
// // console.log(users[0].user);
// const users = await User.findAll({
//     attributes: ['firstName'],
//   });  

// console.log(users.every(user => user instanceof User)); // true
// console.log('All users:', JSON.stringify(users, null, 2));


