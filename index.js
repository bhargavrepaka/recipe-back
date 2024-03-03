import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js'
import recipeRoutes from './routes/recipe.routes.js'
import cors from 'cors';
import morgan from 'morgan';
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL,{dbName:"recipe-app"}).then((s)=>console.log("Connected to database")).catch((err)=>console.log(err)) 

//middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(morgan("tiny"))

//routes
app.get("/",(req,res)=>{
    res.send("woorkin")
})
app.use("/api/user",userRoutes)
app.use("/api/recipe",recipeRoutes)

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});


