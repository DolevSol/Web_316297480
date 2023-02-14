const express = require('express');
const app = express();
const path = require('path');
const csv = require('csvtojson')
const bodyParser = require('body-parser');
const sql = require('./database/db');
const port = 3000;
const CRUD = require('./database/CRUD')
const CreateDB = require('./database/CreateDB')
const cookieParser = require('cookie-parser')

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Create Insert Show Drop Routes
app.get('/CreateTable', [CreateDB.CreateStudents, CreateDB.CreateDepartments, CreateDB.CreateCourses, CreateDB.CreateTeachers, CreateDB.CreateCourseInstances, CreateDB.CreateReviews, CreateDB.CreateRecommendation]);
app.get('/InsertTable', [CreateDB.InsertStudents, CreateDB.InsertDepartments, CreateDB.InsertCourses, CreateDB.InsertTeachers, CreateDB.InsertCourseInstances, CreateDB.Insertreviews, CreateDB.InsertRecommendation]);
app.get('/CreateTable/CreateAggCourses', CreateDB.CreateAggCourses)
app.get('/CreateTriggerCourseScore', CreateDB.CreateTriggerCourseScore)
app.get('/DropTables', [CreateDB.DropRecommendation, CreateDB.DropCoursesScore, CreateDB.DropReviews, CreateDB.DropCourseInstances, CreateDB.DropTeachers, CreateDB.DropCourses, CreateDB.DropDepartments, CreateDB.DropStudents]);
app.get('/ShowTable/ShowStudents', CreateDB.ShowStudents);
app.get('/ShowTable/ShowDepartments', CreateDB.ShowDepartments);
app.get('/ShowTable/ShowCourses', CreateDB.ShowCourses);
app.get('/ShowTable/ShowTeachers', CreateDB.ShowTeachers);
app.get('/ShowTable/ShowCourseInstances', CreateDB.ShowCourseInstances);
app.get('/ShowTable/Showreviews', CreateDB.Showreviews);
app.get('/ShowTable/ShowCourseScore', CreateDB.ShowCourseScore);
app.get('/ShowTable/ShowRecommendations', CreateDB.ShowRecommendations);



//Basic Routes for pages
app.get('/', (req, res) => {
    res.redirect("/home")
})
app.get('/home', (req, res) => {
    res.render('Homepage', {userLogIn: req.cookies.username})
})
app.get('/Login', (req, res) => {
    res.render('Login')
})
app.get('/about_us', (req, res) => {
    res.render('about_us', {userLogIn: req.cookies.username})
})
app.get('/about_us_unauthorized', (req, res) => {
    res.render('about_us_unauthorized', {userLogIn: req.cookies.username})
})
app.get('/comment',(req,res) => {
    res.render('comment', {userLogIn: req.cookies.username})
})

app.get('/updateUser', (req, res) => {
    res.render("updateUser", {userLogIn: req.cookies.username})
})
app.post('/updateUserintoDB', CRUD.updateUser);
app.get('/deleteUserConfirm', (req, res) => {
    res.render('deleteConfirm', {userLogIn: req.cookies.username})
})
app.post('/deleteUser', CRUD.deleteUser)

app.get('/logOutUser', (req, res) => {
    res.redirect("/home")
})
app.get('/comment',(req,res)=> {
    res.redirect('/CreateReview')
})
app.post('/CreateReview', CRUD.createComment)
app.get('/CourseData', (req, res) => {
    res.render('CourseData', {userLogIn: req.cookies.username})
})
app.get('/CourseResult', CRUD.getCourseResult)
app.get('/Recommendation', CRUD.renderRecommendations)
app.get('/RegistrationUser', (req, res) => {
    res.render('RegistrationUser')
})
app.get('/SearchCourse', CRUD.renderdepartment);

app.get('/SendEmail', (req, res) => {
    res.render('SendEmail')
})
app.get('/coomingSoon', (req, res) => {
    res.render('coomingSoon', {userLogIn: req.cookies.username})
})

app.get('/RegistrationTeacher', CRUD.renderTeacherReg)

app.get('/SearchTeacher', CRUD.renderTeacherSearch)

app.get('/SearchTeacher/DependentTeacherData/:departmentValue', (req, res) => {
    const departmentId = req.params.departmentValue;
    const query = "SELECT t.username username, t.phone_number phone_number , t.experience experience, d.department_name department_name , c.course_name course_name FROM teachers t JOIN courses c ON t.course_id = c.course_id JOIN departments d ON d.department_id = t.department_id WHERE t.department_id = ? "
    sql.query(query, [departmentId], (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "Problem with showing teacher result  "});
            return;
        }

        res.json(mysqlres);
    })


});

app.get('/SearchTeacher/DependentTeacherData/:departmentValue/:courseValue', (req, res) => {
    const departmentId = req.params.departmentValue;
    const courseId = req.params.courseValue
    const query = "SELECT t.username username, t.phone_number phone_number , t.experience experience, d.department_name department_name , c.course_name course_name FROM teachers t JOIN courses c ON t.course_id = c.course_id JOIN departments d ON d.department_id = t.department_id WHERE t.department_id = ? AND t.course_id = ?"
    sql.query(query, [departmentId, courseId], (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "Problem with showing teacher result "});
            return;
        }

        res.json(mysqlres);
    })


});


app.get('/RegistrationTeacher/:departmentId', (req, res) => {
    const departmentId = req.params.departmentId;
    const qurey = 'SELECT * FROM courses where department_id = ? ';
    sql.query(qurey, [departmentId], (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "Problem with reg teacher  "});
            return;
        }

        res.json(mysqlres);
    })


});

app.get('/SearchTeacher/:departmentId', (req, res) => {
    const departmentId = req.params.departmentId;
    const qurey = 'SELECT * FROM courses where department_id = ? ';
    sql.query(qurey, [departmentId], (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "Problem with showing teacher result "});
            return;
        }

        res.json(mysqlres);
    })


});

app.get('/SearchCourse/:departmentId', (req, res) => {
    const departmentId = req.params.departmentId;
    const qurey = 'SELECT * FROM courses where department_id = ? ';
    sql.query(qurey, [departmentId], (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "Problem with courses table "});
            return;
        }

        res.json(mysqlres);
    })


});


app.get('/CourseData/:CourseId', (req, res) => {
    const CourseId = req.params.CourseId;
    res.cookie(`course_id`, CourseId);
    const queries = ['SELECT * FROM courses where course_id = ? ', 'SELECT * FROM reviews where course_id = ? ']
    sql.query(queries.join(';'), [CourseId, CourseId], (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "Problem with courses table "});
            return;
        }

        res.render('CourseData', {
            ChosenCourse: mysqlres[0][0],
            reviewsOfCourses: mysqlres[1],
            userLogIn: req.cookies.username
        })
    })


});


app.get('/CourseData/:course_id/:year/:semester', (req, res) => {
    const year = req.params.year;
    const semester = req.params.semester;
    const course_id = req.params.course_id;
    const queries = ['SELECT * FROM course_instances where year_taken = ? AND semester = ? AND course_id = ?  ', 'SELECT * FROM Courses_score WHERE course_id = ? '];
    sql.query(queries.join(';'), [year, semester, course_id, course_id], (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "Problem with Courses_score table "});
            return;
        }
        res.json(mysqlres);
    })


});


app.get('/Recommendation/:recommendationValue', (req, res) => {
    const recommendation = req.params.recommendationValue;
    const qurey = 'SELECT * FROM recommendations where id = ? ';
    sql.query(qurey, [recommendation], (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "Problem with recommendations table "});
            return;
        }
        res.json(mysqlres);
    })


});


//routes for functionality and form processing
app.post('/insertUserintoDB', CRUD.insertNewSignIn);
app.post('/insertNewTeacher', CRUD.insertNewTeacher);
app.post('/checkLogin', CRUD.checkLogin);


app.listen(port, () => {
    console.log("server is running on port" + port)
})


