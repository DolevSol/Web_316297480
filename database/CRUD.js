const sql = require('./db');
const path = require("path");
const {filters} = require("pug");

const insertNewSignIn = (req, res) => {
    //validate date
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"})
        return;
    }

    // insert input data from body into json
    const NewSignUp = {
        "username": req.body.userName,
        "password": req.body.password,
        "email": req.body.email,
        "phone_number": req.body.phone,
        "start_year": req.body.yeartaken,
        "age": req.body.age
    }
    console.log(NewSignUp)
    //run qurey
    const qurey = 'INSERT INTO students SET?';
    sql.query(qurey, NewSignUp, (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "could not sign in"});
            return;
        }
        // console.log("create student:", {id: mysqlres.});
        // res.send({massage: "you just signed in successifuly"});
        res.render(path.join(__dirname, '../views/HomePage.pug'))
        return;
    })

}


const checkLogin = (req, res) => {
    //validate date
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"})
        return;
    }
    console.log(req.body)
    // insert input data from body into json
    const UserData = {
        "username": req.body.userName1,
        "password": req.body.password1
    }
    console.log(NewSignUp)
    //run qurey
    const qurey = 'SELECT * FROM students WHERE username = ? AND password = ? ';
    sql.query(qurey, [UserData.username, UserData.password], (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "could not Login"});
            return;
        }
        if (mysqlres.length > 0) {
            console.log("user exists:", {username: mysqlres[0]})
            res.render(path.join(__dirname, '../views/HomePage.pug'));
        } else {

            res.status(400).send({message: "invalid username or password"});
        }

    })

}

// function that happen when i render course search
const renderdepartment = (req, res) => {

    const qurey = 'SELECT * FROM departments ';
    sql.query(qurey, (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "Problem with department table "});
            return;
        }

        res.render('SearchCourse', {departments: mysqlres});
    })

}


const insertNewTeacher = (req, res) => {
    //validate date
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"})
        return;
    }

    // insert input data from body into json
    const NewSignUp = {
        "username": req.body.userName,
        "password": req.body.password,
        "email": req.body.email,
        "phone_number": req.body.phone_teacher,
        "start_year": req.body.yeartaken,
        "age": req.body.age,
        "department_id": req.body.departmentNumber,
        "course_id": req.body.courseNumber
    }
    console.log(NewSignUp)
    //run qurey
    const qurey = 'INSERT INTO teachers SET?';
    sql.query(qurey, NewSignUp, (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "could not show result"});
            return;
        }

        res.render(path.join(__dirname, '../views/Teacher_Reg.pug'))
        return;
    })

}


const getCourseResult = (req, res) => {
    //validate date
    const courseSearchParams = {
        "department_id": req.query.departmentNumber,
        "course_id": req.query.courseNumber,
        "difficulty_rating": req.query.hardness,
        "load_rating": req.query.load
    }
    console.log(courseSearchParams);

    let qurey = 'SELECT course_name, load_rating,difficulty_rating FROM Courses_score WHERE department_id  = ? '
    let filters = [courseSearchParams.department_id];

    // if (courseSearchParams.course_id !=='111') {
    //    qurey += 'AND WHEN course_id = ?'
    //     filters.push(courseSearchParams.course_id)
    //     console.log("i been here ! " + courseSearchParams.course_id);
    // }
    if (courseSearchParams.difficulty_rating) {
        qurey += 'AND difficulty_rating >= ? '
        filters.push(courseSearchParams.difficulty_rating)
    }
    if (courseSearchParams.load_rating) {
        qurey += ' AND load_rating >= ? '
        filters.push(courseSearchParams.load_rating)
    }

    //run qurey
    console.log(qurey);
    sql.query(qurey, filters, (err, mysqlres) => {
        console.log(filters)
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "could not sign in"});
            return;
        }

        res.render(path.join(__dirname, '../views/CourseResults.pug'), {courseResultDatas: mysqlres})
        return;
    })

}
// const showAll = (req, res) => {
//     const Q2 = 'SELECT * FROM customers';
//     sql.query(Q2, (err, mysqlres) => {
//         if (err) {
//             res.status(400).send({message: "could get all customers"});
//             return;
//         }
//         console.log("Got all customers");
//         res.send(mysqlres);
//         return;
//     })
// }
//
//
// const findUser = (req, res) => {
//     //validate body exists
//     if (!req.body) {
//         res.status(400).send({message: "body cannot be empty"})
//         return;
//     }
//     // pill data from body
//     const user = req.body.SearchName;
//
//     //run qurey
//     const Q3 = "SELECT * FROM customers WHERE name like ? ";
//     sql.query(Q3, user + "%", (err, mysqlres) => {
//         if (err) {
//             console.log("error: error:", err);
//             res.status(400).send({message: "could not search customer"})
//             return;
//         }
//         console.log("found user:", {user: mysqlres});
//         res.send(mysqlres);
//         return;
//
//     })
//
// }
module.exports = {insertNewSignIn, checkLogin, insertNewTeacher, renderdepartment, getCourseResult}