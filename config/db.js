const mongoose = require('mongoose')
// เป็นการสร้าง function connentDB 
const connectDB = async()=> {  
    //async เหมือน thread ใน java 
    mongoose.set('strictQuery',true) ; //ตั้งค่าใน mongoose
    const conn = await mongoose.connect(process.env.MONGO_URL);
//await เป็นการบอกว่าต้องรอการทำงาน ด้าน หลังของมันให้เสร็จก่อน func ถึงจำทำงานต่อได้ (ต้องใช้คู่กับ Async เสมอ)
// ถ้าการทำงานหลัง await ผิดพลาด funtion จะหยุดทำงาน แต่ โปรแกรมหลักภายนอก จะทำงานต่อ
    console.log(`MongoDB Connected : ${conn.connection.host}`) ;
}
module.exports = connectDB ;
//คืนค่าเฉพาะ connectDB ซึ่งจะเป็นตัวแปรประเภทอะไรก็ได้ หรือ object หรือ แม้แต่ function ณ ที่นี่ connectDB เป็น function