// todo : בכל הפורמים חייב להיות כפתור עם תגיט אינפוט מסוג סבמיט
//todo :  action in the form  should be the route to the page  __dirname + path to the relevant screen
// todo : if we want to redirect the page to other page after singin we have to to it in the crud fuction


const express = require('express');
const app = express();
const path = require('path');
const csv = require('csvtojson')
const bodyParser = require('body-parser');
const sql = require('./database/db');
const port = 8080;
const CRUD = require('./database/CRUD')
const CreateDB = require('./database/CreateDB')

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Create Insert Show Drop Routes
app.get('/CreateTable', [CreateDB.CreateStudents, CreateDB.CreateDepartments, CreateDB.CreateCourses, CreateDB.CreateTeachers, CreateDB.CreateCourseInstances, CreateDB.CreateReviews]);
app.get('/InsertTable', [CreateDB.InsertStudents, CreateDB.InsertDepartments, CreateDB.InsertCourses, CreateDB.InsertTeachers, CreateDB.InsertCourseInstances, CreateDB.Insertreviews]);
app.get('/DropTable', [CreateDB.DropReviews, CreateDB.DropCourseInstances, CreateDB.DropTeachers, CreateDB.DropCourses, CreateDB.DropDepartments, CreateDB.DropStudents]);
app.get('/ShowTable/ShowStudents', CreateDB.ShowStudents);
app.get('/ShowTable/ShowDepartments', CreateDB.ShowDepartments);
app.get('/ShowTable/ShowCourses', CreateDB.ShowCourses);
app.get('/ShowTable/ShowTeachers', CreateDB.ShowTeachers);
app.get('/ShowTable/ShowCourseInstances', CreateDB.ShowCourseInstances);
app.get('/ShowTable/Showreviews', CreateDB.Showreviews);


//Basic Routes for pages
app.get('/', (req, res) => {
    res.redirect("/home")
})
app.get('/home', (req, res) => {
    res.render('Homepage')
})
app.get('/Login', (req, res) => {
    res.render('Login')
})
app.get('/about_us', (req, res) => {
    res.render('about_us')
})
app.get('/comment', (req, res) => {
    res.render('comment')
})
app.get('/CourseData', (req, res) => {
    res.render('CourseData')
})
app.get('/CourseResult', (req, res) => {
    res.render('CourseResults')
})
app.get('/Recommendation', (req, res) => {
    res.render('Recommendation')
})
app.get('/RegistrationUser', (req, res) => {
    res.render('RegistrationUser')
})
app.get('/SearchCourse', CRUD.renderdepartment);

app.get('/SendEmail', (req, res) => {
    res.render('SendEmail')
})
app.get('/RegistrationTeacher', (req, res) => {
    res.render('Teacher_Reg')

})
app.get('/SearchTeacher', (req, res) => {
    res.render('TeacherSearch')
})


app.get('/SearchCourse/:departmentId', (req, res) => {
    const departmentId = req.params.departmentId;
    const qurey = 'SELECT * FROM courses where department_id= ? ';
    sql.query(qurey, [departmentId], (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "Problem with courses table "});
            return;
        }
        //todo : check how it work
        res.json(mysqlres);
    })


});

//routes for functionality and form processing
app.post('/insertUserintoDB', CRUD.insertNewSignIn);
app.post('/checkLogin', CRUD.checkLogin);
app.post('/insertNewTeacher', CRUD.insertNewTeacher);


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


