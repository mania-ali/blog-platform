require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const authRoutes = require("./routes/auth");
const express=require("express") //import express
const app=express()  //create server empty
const cors = require("cors");  //backend frontend communication
const errorHandler = require("./middleware/errorMiddleware");
const postRoutes=require("./routes/post");
const userRoutes = require("./routes/user");

app.use(cors());
app.use(express.json());
const PORT=5000 
//initial start of backend
app.get("/",(req,res)=>{
    res.send("backend is running")
});

app.use("/api/auth", authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);
app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`);
});