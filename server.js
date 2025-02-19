const express=require("express") ; // นำเข้า framwork express
const dotenv = require("dotenv") ; // นำเข้า dotenv Library
const connectDB = require('./config/db'); // นำเข้า file จากการเชื่อมต่อ database
dotenv.config({path:"./config/config.env"}) ; // set ค่า dot env
const hospitals =  require("./routes/hospitals") ; // routes file

connectDB(); // connect database


const app = express() ; // express() เป็นการสร้าง Application express ซึ่งกำหนดให้ app
app.use(express.json());
app.use('/api/v1/hospitals',hospitals) ;


const PORT =  process.env.PORT ; //เรียกใช้ค่าจาก .env โดยใช้ process.esv
const server = app.listen(PORT, console.log("Server is running  in",process.env.NODE_ENV , "mode on port " , PORT));// ทำงาน เมื่อเซิร์ฟเวอร์เริ่มต้นสำเร็จ
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    server.close(()=>process.exit(1)) ;
});