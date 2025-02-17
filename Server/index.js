const express = require('express');
const app = express();
const connectDB = require('./db');
connectDB();

// CORS tells the browser:
// ✅ "Allow requests from different origins"
const cors = require("cors");
app.use(cors());

//body parser
app.use(express.json());
//connect to database

const postRoutes = require('./routes/CommunityRoutes');
app.use("/api", postRoutes);

const userRoutes = require('./routes/UserRoutes');
app.use('/api', userRoutes);


app.get('/', (req,res)=>{
    res.send("Hello");
})

const PORT = 5500;

app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})