const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql2/promise");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()) // ส่งด้วย Data JSON
app.use(express.static('public'));

app.get("/students", (req, res)=>{
   //res.send("Moshi2");
   res.sendFile(__dirname+'/student.html');
} );

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root', // <== ระบุให้ถูกต้อง
    password: '',  // <== ระบุให้ถูกต้อง
    database: 'student_database',
    port: 3306  // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)
});

app.post("/students", async (req, res) => {
    // ส่งข้อมูลผ่าน body-parser (Middleware)
    const name = req.body.name;
    const age = req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;

    const connection = await dbConn
    const rows = await connection.query("insert into students (name,age,phone,email) values('"+name+"','"+age+"','"+phone+"','"+email+"')")
    /*res.status(201).send(rows);*/
    res.send("เพิ่มข้อมูลเรียบร้อยแล้ว"); // แสดงผล
    document.getElementById("message").innerHTML = "สวัสดี JavaScript";
})
// เปิด connection ไปที่ database

 /*app.post("/", (req,res)=>{
    var num1 = Number(req.body.num1); // อ่านค่าจาก input1
    var num2 = Number(req.body.num2); // อ่านค่าจาก input2
    var result = num1 + num2; // รวมค่า
    res.send("The calculation result is : " + result); // แสดงผล
 });*/
 

app.listen(3000, ()=> {
   console.log ("Server is running on port 3000");
});

