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
    const Q4 = "CREATE TABLE teachers (username VARCHAR(255) NOT NULL PRIMARY KEY, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL, experience INT NOT NULL, age INT NOT NULL, department_id INT NOT NULL, course_id INT NOT NULL, FOREIGN KEY (department_id) REFERENCES departments(department_id), FOREIGN KEY (course_id) REFERENCES courses(course_id));"

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
    const Q5 = "CREATE TABLE course_instances (\n" +
        "  course_id INT NOT NULL,\n" +
        "  year_taken YEAR NOT NULL,\n" +
        "  semester VARCHAR(1) NOT NULL,\n" +
        "  average_score FLOAT NOT NULL,\n" +
        "  standard_deviation FLOAT NOT NULL ,\n" +
        "  FOREIGN KEY (course_id) REFERENCES courses(course_id) ,\n" +
        "  PRIMARY KEY (course_id ,year_taken ,semester) \n" +
        "\n" +
        ");"

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


    })
    next()
}
const CreateRecommendation = (req, res) => {
    const Q6 = "CREATE TABLE recommendations (id INT PRIMARY KEY AUTO_INCREMENT,subject VARCHAR(255),course1 VARCHAR(255),course2 VARCHAR(255),course3 VARCHAR(255),course4 VARCHAR(255));"
    SQL.query(Q6, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating Recommendation table"});
            return;
        }


    })
    console.log("TABLES : students, departments, teachers, course_instances, reviews ,Recommendation been Created");
    res.send("TABLES : students, departments, teachers, course_instances, reviews, Recommendation been Created");
    return;
}


const CreateAggCourses = (req, res) => {
    const Q7 = " CREATE TABLE IF NOT EXISTS Courses_score AS (\n" +
        "    SELECT d.department_id, ci.course_id, c.course_name, \n" +
        "           ROUND(AVG(COALESCE(r.load_rating, 0)), 2) AS load_rating, \n" +
        "           ROUND(AVG(COALESCE(r.difficulty_rating, 0)), 2) AS difficulty_rating \n" +
        "    FROM course_instances AS ci \n" +
        "    JOIN courses AS c ON ci.course_id = c.course_id \n" +
        "    JOIN departments AS d ON c.department_id =d.department_id \n" +
        "    LEFT JOIN reviews AS r ON r.course_id=c.course_id\n" +
        "    GROUP BY d.department_id, ci.course_id, c.course_name\n" +
        ");"

    SQL.query(Q7, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating courses score table"});
            return;
        }
        console.log("data inserted and Courses_score has been Created");
        res.send("data inserted and Courses_score has been Created");
        return;
    })

}

const CreateTriggerCourseScore = (req, res) => {
    const Q8 = "CREATE TRIGGER update_courses_score AFTER INSERT ON reviews FOR EACH ROW BEGIN UPDATE courses_score SET load_rating = (SELECT ROUND(AVG(r.load_rating), 2) FROM reviews r WHERE r.course_id = new.course_id), difficulty_rating = (SELECT ROUND(AVG(r.difficulty_rating), 2) FROM reviews r WHERE r.course_id = new.course_id) WHERE course_id = new.course_id; END ;"


    SQL.query(Q8, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating trigger "});
            return;
        }
        console.log("trigger has been Created");
        res.send("trigger has been Created");
        return;
    })

}

const InsertStudents = (req, res, next) => {
    var Q1 = "INSERT INTO students SET ?";
    const csvFilePath = path.join(__dirname, "/CSV/Students.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "username": element.username,
                    "password": element.password,
                    "email": element.email,
                    "phone_number": element.phone_number,
                    "start_year": element.start_year,
                    "age": element.age
                }
                SQL.query(Q1, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting Students data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });

    next()

};
const InsertDepartments = (req, res, next) => {
    var Q2 = "INSERT INTO departments SET ?";
    const csvFilePath = path.join(__dirname, "/CSV/Departments.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "department_id": element.department_id,
                    "department_name": element.department_name
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting Departments data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });

    next()

};
const InsertCourses = (req, res, next) => {
    var Q3 = "INSERT INTO courses SET ?";
    const csvFilePath = path.join(__dirname, "/CSV/Courses.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "course_id": element.course_id,
                    "course_name": element.course_name,
                    "department_id": element.department_id
                }
                SQL.query(Q3, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting Courses data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });

    next()

};

const InsertTeachers = (req, res, next) => {
    var Q4 = "INSERT INTO teachers SET ?";
    const csvFilePath = path.join(__dirname, "/CSV/Teachers.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "username": element.username,
                    "password": element.password,
                    "email": element.email,
                    "phone_number": element.phone_number,
                    "experience": element.experience,
                    "age": element.age,
                    "department_id": element.department_id,
                    "course_id": element.course_id
                }
                SQL.query(Q4, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting Teachers data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });

    next()

};
const InsertCourseInstances = (req, res, next) => {
    var Q5 = "INSERT INTO course_instances SET ?";
    const csvFilePath = path.join(__dirname, "/CSV/CourseInstances.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "course_id": element.course_id,
                    "year_taken": element.year_taken,
                    "semester": element.semester,
                    "average_score": element.average_score,
                    "standard_deviation": element.standard_deviation
                }
                SQL.query(Q5, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting CourseInstances data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });

    next()

};


const Insertreviews = (req, res, next) => {
    var Q6 = "INSERT INTO reviews SET ?";
    const csvFilePath = path.join(__dirname, "/CSV/reviews.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "review_id": element.review_id,
                    "review_date": element.review_date,
                    "username": element.username,
                    "course_id": element.course_id,
                    "title": element.title,
                    "description": element.description,
                    "load_rating": element.load_rating,
                    "difficulty_rating": element.difficulty_rating
                }
                SQL.query(Q6, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting reviews data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });

    next()

};


const InsertRecommendation = (req, res) => {
    var Q7 = "INSERT INTO recommendations SET ?";
    const csvFilePath = path.join(__dirname, "/CSV/recommendations.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "id": element.id,
                    "subject": element.subject,
                    "course1": element.course1,
                    "course2": element.course2,
                    "course3": element.course3,
                    "course4": element.course4

                }
                SQL.query(Q7, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting Recommendation data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });

    console.log("data inserted");
    res.send("data inserted");
    return;

};


const ShowStudents = (req, res) => {
    var Q1 = "SELECT * FROM students";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error in showing students table ", err);
            res.send("error in showing students table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })

};

const ShowDepartments = (req, res) => {
    var Q2 = "SELECT * FROM departments ";
    SQL.query(Q2, (err, mySQLres) => {
        if (err) {
            console.log("error in showing departments table ", err);
            res.send("error in showing departments table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })

};

const ShowCourses = (req, res) => {
    var Q3 = "SELECT * FROM courses";
    SQL.query(Q3, (err, mySQLres) => {
        if (err) {
            console.log("error in showing courses table ", err);
            res.send("error in showing courses table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })

};


const ShowTeachers = (req, res) => {
    var Q4 = "SELECT * FROM teachers";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in showing teachers table ", err);
            res.send("error in showing teachers table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })

};


const ShowCourseInstances = (req, res) => {
    var Q5 = "SELECT * FROM course_instances";
    SQL.query(Q5, (err, mysqlres) => {
        if (err) {
            console.log("error in showing course_instances table ", err);
            res.send("error in showing course_instances table ");
            return;
        }
        console.log("showing table");
        res.send(mysqlres);
        return;
    })

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
        res.send(mySQLres);
        return;
    })
};

const ShowCourseScore = (req, res) => {
    var Q7 = "SELECT * FROM reviews";
    SQL.query(Q7, (err, mySQLres) => {
        if (err) {
            console.log("error in showing CourseScore table ", err);
            res.send("error in showing CourseScore table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })
};

const ShowRecommendations = (req, res) => {
    var Q8 = "SELECT * FROM recommendations";
    SQL.query(Q8, (err, mySQLres) => {
        if (err) {
            console.log("error in showing Recommendations table ", err);
            res.send("error in showing Recommendations table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })
};

const DropStudents = (req, res) => {
    var Q1 = "DROP TABLE Students";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error in dropping table ", err);
            res.status(400).send({message: "error om dropping Students table" + err});
            return;
        }
        console.log("TABLES : students, departments, teachers, course_instances, reviews and CoursesScore been dropped");
        res.send("TABLES : students, departments, teachers, course_instances, reviews and CoursesScore been dropped");
        return;
    })

}
const DropDepartments = (req, res, next) => {
    var Q2 = "drop table departments;";
    SQL.query(Q2, (err, mySQLres) => {
        if (err) {
            console.log("error in dropping table ", err);
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
            console.log("error in dropping table ", err);
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
            console.log("error in dropping table ", err);
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
            console.log("error in dropping table ", err);
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
            console.log("error in dropping table ", err);
            res.status(400).send({message: "error om dropping Reviews table" + err});
            return;
        }

    })
    next()
}
const DropCoursesScore = (req, res, next) => {
    var Q6 = "drop table Courses_score ";
    SQL.query(Q6, (err, mySQLres) => {
        if (err) {
            console.log("error in dropping table ", err);
            res.status(400).send({message: "error om dropping Reviews table" + err});
            return;
        }

    })
    next()
}

const DropRecommendation = (req, res, next) => {
    var Q6 = "drop table recommendations ";
    SQL.query(Q6, (err, mySQLres) => {
        if (err) {
            console.log("error in dropping table ", err);
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
    CreateRecommendation,
    CreateAggCourses,
    InsertStudents,
    InsertDepartments,
    InsertCourses,
    InsertTeachers,
    InsertCourseInstances,
    Insertreviews,
    InsertRecommendation,
    ShowStudents,
    ShowDepartments,
    ShowCourses,
    ShowTeachers,
    ShowCourseInstances,
    Showreviews,
    ShowCourseScore,
    ShowRecommendations,
    DropStudents,
    DropDepartments,
    DropCourses,
    DropTeachers,
    DropCourseInstances,
    DropReviews,
    DropCoursesScore,
    DropRecommendation,
    CreateTriggerCourseScore
};