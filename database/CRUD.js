const sql = require('./db');
const path = require("path");

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

    //run qurey
    const Q1 = 'INSERT INTO students SET?';
    sql.query(Q1, NewSignUp, (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "could not sign in"});
            return;
        }
        // console.log("create student:", {id: mysqlres.});
        // res.send({massage: "you just signed in successifuly"});
        res.sendFile(path.join(__dirname, '../views/HomePage.pug'))
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

    //run qurey
    const Q2 = 'SELECT * FROM students WHERE username = ? AND password = ? ';
    sql.query(Q2, [UserData.username, UserData.password], (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "could not Login"});
            return;
        }
        if (mysqlres.length > 0) {
            console.log("user exists:", {username: mysqlres[0]})
            res.sendFile(path.join(__dirname, '../views/HomePage.pug'));
        } else {
            // todo delete all the uncommand lines
            // console.log(mysqlres ,typeof (mysqlres))
            // console.log("user exists:", {username: mysqlres[0]})
            // console.log("user does not exist or invalid password");
            res.status(400).send({message: "invalid username or password"});
        }

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
module.exports = {insertNewSignIn, checkLogin}