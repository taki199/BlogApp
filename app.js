const express=require('express')
const app=express()
const port = 3000
const postRoute = require('./routes/postRoutes')
const  {readUser}=require('./Models/post')

const auth = (req, res, next) => {
    const user = readUser("./Models/Users.json");
    const users = user.users; 

    const name = req.query.name;
    const pass = req.query.pass;

    // Check if there is a user with the provided username and password
    const authenticatedUser = users.find(u => u.username === name && u.password === pass);

    if (authenticatedUser) {
        // If user is authenticated, proceed to the next middleware
        next();
    } else {
        // If user is not authenticated, send an error response
        res.status(401).send("Unauthorized: Invalid username or password");
    }
};

app.use(auth);



const mid=(req,res,next)=>{
  let method=req.method
  let link =req.url
  console.log(`Your methode is ${method} and your url is ${link}`)
    next();
}
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.use(mid)

app.use(express.json());


app.use('/',postRoute)


app.listen(port,()=>{
    console.log(`app is listening on Port ${port}`)
})







