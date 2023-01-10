const sql = require('./db');

const insertNewSignIn = (req, res) => {
    //todo  לשנות את הנתיב לפי הנתיב שכתבתי בפרקויט
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
        console.log("create student:", {id: mysqlres.insertId});
        res.send({massage: "you just signed in successifuly"});
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
module.exports = {insertNewSignIn}