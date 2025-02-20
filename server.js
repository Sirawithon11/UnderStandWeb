const express = require("express") ; // นำเข้า สิ่งที่ module.export ที่สร้างจาก framwork express มาไว้ในตัวแปร
const dotenv = require("dotenv") ; // นำเข้า สิ่งที่ module.export ที่สร้าง จากdotenv Library มาไว้ในตัวแปร
const connectDB = require('./config/db'); // นำเข้า สิ่งที่ module.export จากการ path ข้างต้น มาไว้ในตัวแปร
dotenv.config({path:"./config/config.env"}) ; // set ค่า dot env
const hospitals =  require("./routes/hospitals") ; // นำเข้า สิ่งที่ module.export จากการ path ข้างต้น มาไว้ในตัวแปร
const auth = require('./routes/auth') ;
const cookieParser = require('cookie-parser');
connectDB(); // แสดงว่าสิ่งที่ ได้รับจากการ require เป็น  function และ คำสั่งนี้แสดงถึงการเรียกฟังชั่นจากอีกไฟล์ ซึ่งเป็นการเชื่อมต่อ db

const app = express() ; // express() เป็นการสร้าง Application express ซึ่งกำหนดให้ app
app.use(express.json()); // ทุกอย่างที่เราเขียน จะเป็น js object แต่ข้อมูลที่ส่งไปมาจะเป็น json
//แต่ข้อมูล ใน mongo จะมี moongoose แปลงเป็น js object ก่อนส่งมาที่ server ยุแล้ว แต่ข้อมูลที่มาจาก client ยังไม่มี
//ดังนั้น ต้อง ใส่ app.use(express.json()); ก่อนใช้ req.body ซึ่งรับข้อมูลมาจาก client หรือ Postman
app.use(cookieParser()) ;
app.use('/api/v1/auth',auth) ;
app.use('/api/v1/hospitals',hospitals) ; //เป็น path ที่เราออกแบบมาเอง อยู่ในserver portทีกำหนด เพื่อออกแบบโครงสร้างการเข้าถึงข้อมูล


const PORT =  process.env.PORT ; //เรียกใช้ค่าจาก .env โดยใช้ process.esv
const server = app.listen(PORT, console.log("Server is running  in",process.env.NODE_ENV , "mode on port " , PORT));// เป็นคำสั่งสั่งให้ Server ทำงาน
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    server.close(()=>process.exit(1)) ;
});
// process เป็น object ที่ node js สร้างให้ สามารถใช้ได้กับทุก ไฟล์ที่ run ด้วย  node js เช่น db , hospital ,Hospital