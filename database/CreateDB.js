var SQL = require('./db');
const path = require('path');
const csv = require('csvtojson');

const CreateStudents = (req, res, next) => {
    const Q1 = "CREATE TABLE students (username VARCHAR(255) NOT NULL PRIMARY KEY, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL, start_year INT NOT NULL, age INT NOT NULL);"
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating Students table"});
            return;
        }

    })
    next()
}


const CreateDepartments = (req, res, next) => {
    const Q2 = "CREATE TABLE departments (department_id INT NOT NULL PRIMARY KEY, department_name VARCHAR(255) NOT NULL);"

    SQL.query(Q2, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating departments table"});
            return;
        }

    })
    next()
}

const CreateCourses = (req, res, next) => {
    const Q3 = "CREATE TABLE courses (course_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, course_name VARCHAR(255) NOT NULL, department_id INT NOT NULL, FOREIGN KEY (department_id) REFERENCES departments(department_id));"

    SQL.query(Q3, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating courses table"});
            return;
        }

    })
    next()
}
const CreateTeachers = (req, res, next) => {
    const Q4 = "CREATE TABLE teachers (username VARCHAR(255) NOT NULL PRIMARY KEY, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL, start_year INT NOT NULL, age INT NOT NULL, department_id INT NOT NULL, course_id INT NOT NULL, FOREIGN KEY (department_id) REFERENCES departments(department_id), FOREIGN KEY (course_id) REFERENCES courses(course_id));"

    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating teachers table"});
            return;
        }

    })
    next()
}
const CreateCourseInstances = (req, res, next) => {
    const Q5 = "CREATE TABLE course_instances (course_id INT NOT NULL, year_taken YEAR NOT NULL, semester VARCHAR(1) NOT NULL, load_rating FLOAT NOT NULL, difficulty_rating FLOAT NOT NULL, average_score FLOAT NOT NULL, standard_deviation FLOAT NOT NULL, FOREIGN KEY (course_id) REFERENCES courses(course_id), PRIMARY KEY (course_id, year_taken, semester));"

    SQL.query(Q5, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating course instances table"});
            return;
        }

    })
    next()
}
const CreateReviews = (req, res, next) => {
    const Q6 = "CREATE TABLE reviews (review_id INT AUTO_INCREMENT PRIMARY KEY, review_date DATE, username VARCHAR(255) NOT NULL, course_id INT NOT NULL, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, load_rating FLOAT NOT NULL, difficulty_rating FLOAT NOT NULL, FOREIGN KEY (username) REFERENCES students(username), FOREIGN KEY (course_id) REFERENCES courses(course_id));"

    SQL.query(Q6, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating reviews table"});
            return;
        }
        console.log("TABLES : students, departments, teachers, course_instances, reviews been Created");
        res.send("TABLES : students, departments, teachers, course_instances, reviews been Created");
        return;
    })

}


const InsertData = (req, res) => {
    var Q2 = "INSERT INTO items SET ?";
    const csvFilePath = path.join(__dirname, "data.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "name": element.name,
                    "email": element.email
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });

    res.send("data inserted");

};


const ShowStudents = (req, res, next) => {
    var Q1 = "SELECT * FROM students";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error in showing students table ", err);
            res.send("error in showing students table ");
            return;
        }

    })
    next()
};

const ShowDepartments = (req, res, next) => {
    var Q2 = "SELECT * FROM departments ";
    SQL.query(Q2, (err, mySQLres) => {
        if (err) {
            console.log("error in showing departments table ", err);
            res.send("error in showing departments table ");
            return;
        }

    })
        next()
};

const ShowCourses = (req, res, next) => {
    var Q3 = "SELECT * FROM courses";
    SQL.query(Q3, (err, mySQLres) => {
        if (err) {
            console.log("error in showing courses table ", err);
            res.send("error in showing courses table ");
            return;
        }

    })
};


const ShowTeachers = (req, res, next) => {
    var Q4 = "SELECT * FROM teachers";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in showing teachers table ", err);
            res.send("error in showing teachers table ");
            return;
        }

    })
        next()
};



const ShowCourseInstances = (req, res, next) => {
    var Q5 = "SELECT * FROM course_instances";
    SQL.query(Q5, (err, mySQLres) => {
        if (err) {
            console.log("error in showing course_instances table ", err);
            res.send("error in showing course_instances table ");
            return;
        }

    })
        next()
};

const Showreviews = (req, res) => {
    var Q6 = "SELECT * FROM reviews";
    SQL.query(Q6, (err, mySQLres) => {
        if (err) {
            console.log("error in showing reviews table ", err);
            res.send("error in showing reviews table ");
            return;
        }
        console.log("showing table");
        res.send("/InsertData");
        return;
    })
};


const DropStudents = (req, res) => {
    var Q1 = "DROP TABLE Students";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping Students table" + err});
            return;
        }
        console.log("TABLES : students, departments, teachers, course_instances, reviews been dropped");
        res.send("TABLES : students, departments, teachers, course_instances, reviews been dropped");
        return;
    })

}
const DropDepartments = (req, res, next) => {
    var Q2 = "drop table departments;";
    SQL.query(Q2, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping Departments table" + err});
            return;
        }

    })
    next()
}
const DropCourses = (req, res, next) => {
    var Q3 = "drop table courses;";
    SQL.query(Q3, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping Courses table" + err});
            return;
        }

    })
        next()
}
const DropTeachers = (req, res, next) => {
    var Q4 = "drop table teachers;";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping Teachers table" + err});
            return;
        }

    })
        next()
}
const DropCourseInstances = (req, res, next) => {
    var Q5 = "drop table course_instances;";
    SQL.query(Q5, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping CourseInstances table" + err});
            return;
        }

    })
        next()
}
const DropReviews = (req, res, next) => {
    var Q6 = "drop table reviews ";
    SQL.query(Q6, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping Reviews table" + err});
            return;
        }

    })
    next()
}

module.exports = {
    CreateStudents,
    CreateDepartments,
    CreateCourses,
    CreateTeachers,
    CreateCourseInstances,
    CreateReviews,
    InsertData,
    DropStudents,
    DropDepartments,
    DropCourses,
    DropTeachers,
    DropCourseInstances,
    DropReviews,
    ShowStudents,
    ShowDepartments,
    ShowCourses,
    ShowTeachers,
    ShowCourseInstances,
    Showreviews
};