const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const sql = require('./database/db');
const port = 8080;
const CRUD = require('./database/CRUD')

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// todo : בכל הפורמים חייב להיות כפתור עם תגיט אינפוט מסוג סבמיט
//todo :  action in the form  should be the route to the page  __dirname + path to the relevant screen
// todo : if we want to redirect the page to other page after singin we have to to it in the crud fuction


app.get('/', (req, res) => {
    res.redirect("/home")
})
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/HomePage.html'))
})

app.get('/Login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/Login.html'))
})
app.get('/about_us', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/about_us.html'))
})
app.get('/comment', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/comment.html'))
})
app.get('/CourseData', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/CourseData.html'))
})
app.get('/CourseResult', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/CourseResults.html'))
})
app.get('/Recommendation', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/Recommendation.html'))
})
app.get('/RegistrationUser', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/RegistrationUser.html'))
})
app.get('/SearchCourse', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/SearchCourse.html'))
})
app.get('/SendEmail', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/SendEmail.html'))
})
app.get('/RegistrationTeacher', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/Teacher_Reg.html'))
})
app.get('/SearchTeacher', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/TeacherSearch.html'))
})



app.post('/insertUserintoDB', CRUD.insertNewSignIn );



app.listen(port, () => {
    console.log("server is running on port" + port)
})

// //showAll qurey route
// app.get('/showAll', CRUD.showAll);


// // search course
// app.get('searchByNameForm', (req, res) => {
//     res.sendFile(path.join(__dirname, "views/findUser.html"))
//
// });
// // dins users by name
// app.get('/findCustomer', CRUD.findUser)
//


