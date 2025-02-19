const express  = require("express") ; // นำเข้า framwork express
const dotenv = require("dotenv") ; // นำเข้า dotenv Library
dotenv.config({path:"./config/config.env"}) ; // set ค่า dot env


const app = express() ; // express() เป็นการสร้าง Application express ซึ่งกำหนดให้ app


// Application express หรือ a สามารถ กำหนดเส้นทาง (Route)
app.get('/', (req, res) => {
    // res.send("<h1>Hello From express</h1>");
    // res.send({name:"Brad"}) ;
    // res.json({name:"Brad"}) ;
    // res.sendStatus(400) ;
    // res.status(400).json({success : false}) ;
    res.status(200).json( {success : true, data:{id:1} } ) ;
});

const PORT =  process.env.PORT ; //เรียกใช้ค่าจาก .env โดยใช้ process.esv
app.listen(PORT, console.log("Server is running  in",process.env.NODE_ENV , "mode on port " , PORT));// ทำงาน เมื่อเซิร์ฟเวอร์เริ่มต้นสำเร็จ