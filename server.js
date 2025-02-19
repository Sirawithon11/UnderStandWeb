const express  = require("express") ; // นำเข้า framwork express
const dotenv = require("dotenv") ; // นำเข้า dotenv Library
dotenv.config({path:"./config/config.env"}) ; // set ค่า dot env
const hospitals =  require("./routes/hospitals") ; // routes file


const app = express() ; // express() เป็นการสร้าง Application express ซึ่งกำหนดให้ app

app.use('/api/v1/hospitals',hospitals) ;


const PORT =  process.env.PORT ; //เรียกใช้ค่าจาก .env โดยใช้ process.esv
app.listen(PORT, console.log("Server is running  in",process.env.NODE_ENV , "mode on port " , PORT));// ทำงาน เมื่อเซิร์ฟเวอร์เริ่มต้นสำเร็จ