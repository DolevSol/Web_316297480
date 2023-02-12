const sql = require('./db');
const path = require("path");
const {filters} = require("pug");
const SQL = require("./db");

const insertNewSignIn = (req, res) => {
    //validate date
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"})
        return;
    }

    // insert input data from body into json
    const NewSignUp = {
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "phone_number": req.body.phone_number,
        "start_year": req.body.start_year,
        "age": req.body.age
    }
    console.log(NewSignUp)
    //run qurey
    const qurey = 'INSERT INTO students SET?';
    sql.query(qurey, NewSignUp, (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.json({error: "could not sign in , Please Check fields and try again "})
            res.status(400).send({message: "could not sign in"});
            return;
        }
        res.cookie(`username`, NewSignUp.username)
        res.json({message: 'Login Succefully  !'})
        return;
    })

}


const checkLogin = (req, res) => {
    //validate date
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"})
        return;
    }

    // insert input data from body into json
    const UserData = {
        "username": req.body.username,
        "password": req.body.password
    }
    console.log(UserData)
    //run qurey
    const qurey = 'SELECT * FROM students WHERE username = ? AND password = ? ';
    sql.query(qurey, [UserData.username, UserData.password], (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "could not Login"});
            return;
        }
        if (mysqlres.length > 0) {
            console.log("user exists:", {username: mysqlres[0].username})
            res.cookie(`username`, mysqlres[0].username);
            res.json({message: 'Login Succefully  !'})
            // res.redirect('/SearchCourse')
        } else {
            res.json({error: "invalid username or password , Please try again !"})

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

        res.render('SearchCourse', {departments: mysqlres, userLogIn: req.cookies.username});
    })

}


const renderTeacherSearch = (req, res) => {

    const qurey = 'SELECT * FROM departments ';
    sql.query(qurey, (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "Problem with department table "});
            return;
        }

        res.render('TeacherSearch', {departments2: mysqlres, userLogIn: req.cookies.username});
    })

}

const renderTeacherReg = (req, res) => {

    const qurey = 'SELECT * FROM departments ';
    sql.query(qurey, (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "Problem with department table "});
            return;
        }

        res.render('Teacher_Reg', {departments3: mysqlres, userLogIn: req.cookies.username});
    })

}
const renderRecommendations = (req, res) => {

    const qurey = 'SELECT * FROM recommendations ';
    sql.query(qurey, (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "Problem with recommendations table "});
            return;
        }

        res.render('Recommendation', {Recommendations: mysqlres, userLogIn: req.cookies.username});
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
        "experience": req.body.yeartaken,
        "age": req.body.ageteac,
        "department_id": req.body.departmentNumber3,
        "course_id": req.body.courseNumber3
    }
    console.log(NewSignUp)
    //run qurey

    const qurey = 'INSERT INTO teachers SET?';
    sql.query(qurey, NewSignUp, (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "error in creating new teacher"});
            return;
        }

        res.redirect('/SearchTeacher')
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

    let qurey = 'SELECT course_id,course_name, load_rating,difficulty_rating FROM Courses_score WHERE department_id  = ? '
    let filters = [courseSearchParams.department_id];
    console.log(parseInt(courseSearchParams.course_id))
    if (!isNaN(courseSearchParams.course_id) && courseSearchParams.course_id !== '111' && courseSearchParams.course_id !== 0) {
        qurey += 'AND  course_id = ?'
        filters.push(courseSearchParams.course_id)
        console.log("i been here ! " + courseSearchParams.course_id);
    }
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
            res.status(400).send({message: "could not get course result "});
            return;
        }

        res.render(path.join(__dirname, '../views/CourseResults.pug'), {
            courseResultDatas: mysqlres,
            userLogIn: req.cookies.username
        })
        return;
    })

}

const createComment = (req, res) => {
    //validate date
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"})
        return;
    }
    const today = new Date();
    const dateOnly = today.toISOString().split('T')[0]
    let courseId = req.cookies.course_id
    console.log(dateOnly)
    // insert input data from body into json
    const NewReview = {
        "review_date": dateOnly,
        "username": req.cookies.username,
        "course_id": courseId,
        "title": req.body.title,
        "description": req.body.description,
        "load_rating": req.body.load_rating,
        "difficulty_rating": req.body.difficulty_rating
    }


    console.log(NewReview)
    //run qurey
    const qurey = 'INSERT INTO reviews SET?';
    sql.query(qurey, NewReview, (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "could not create comment "});
            return;
        }

        res.redirect('/CourseData/' + courseId)
        return;
    })

}


const deleteUser = (req, res) => {
    const username = req.cookies.username
    var qurey = "DELETE FROM students WHERE username = ?;";
    SQL.query(qurey, username, (err, mySQLres) => {
        if (err) {
            console.log("error in delete student ", err);
            res.send("error in delete student ");
            return;
        }
        console.log("delete user");
        res.redirect('/home');
        return;
    })

};

const updateUser = (req, res) => {
    const username = req.cookies.username
    const updateData = {
        "password": req.body.password,
        "email": req.body.email,
        "phone_number": req.body.phone,
        "start_year": req.body.yeartaken,
        "age": req.body.age
    }

    let filters = [];
    if ((updateData.password === '') && (updateData.email === '') && (updateData.phone_number === '') && isNaN(updateData.start_year) && (updateData.age === '')) {
        res.redirect('/SearchCourse')
    } else {

        let qurey = 'UPDATE students SET'
        if (!(updateData.password === '')) {
            if (filters.length === 0) {
                qurey += ' password = ?'
                filters.push(updateData.password)
            } else {
                qurey += ', password = ?'
                filters.push(updateData.password)
            }
        }

        if (!(updateData.email === '')) {
            if (filters.length === 0) {
                qurey += ' email = ?'
                filters.push(updateData.email)
            } else {
                qurey += ', email = ?'
                filters.push(updateData.email)
            }
        }

        if (!(updateData.phone_number === '')) {
            if (filters.length === 0) {
                qurey += ' phone_number = ?'
                filters.push(updateData.phone_number)
            } else {
                qurey += ', phone_number = ?'
                filters.push(updateData.phone_number)
            }
        }

        if (!isNaN(updateData.start_year)) {
            if (filters.length === 0) {
                qurey += ' start_year = ?'
                filters.push(updateData.start_year)
            } else {
                qurey += ', start_year = ?'
                filters.push(updateData.start_year)
            }
        }
        if (!(updateData.age === '')) {
            if (filters.length === 0) {
                qurey += 'age = ?'
                filters.push(updateData.age)
            } else {
                qurey += ', age = ?'
                filters.push(updateData.age)
            }
        }

        filters.push(username)
        qurey += ' WHERE username = ?;'
        //run qurey
        console.log(qurey);
        sql.query(qurey, filters, (err, mysqlres) => {
                console.log(filters)
                if (err) {
                    console.log("error: ", err);
                    res.status(400).send({message: "could not update user data "});
                    return;
                }

                res.redirect('/SearchCourse')
                return;
            }
        )
    }
};

module.exports = {
    insertNewSignIn,
    checkLogin,
    insertNewTeacher,
    renderdepartment,
    getCourseResult,
    renderTeacherSearch,
    renderTeacherReg,
    renderRecommendations,
    createComment,
    deleteUser,
    updateUser
}