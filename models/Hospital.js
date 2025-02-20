//สร้างเพื่อกำหนดโครงสร้าง หรือข้อกำหนด ของข้อมูลที่เราจะเก็บในฐานข้อมูล เพื่อเพิ่มความถูกต้องของข้อมูลก่อนที่เราจะนำไปเก็บในฐานข้อมูล 


const mongoose = require('mongoose') ;

const HospitalSchema = new mongoose.Schema({
    name:{
        type: String,
        required :[true,'Please add a name'],
        unique : true ,
        trim :true ,
        maxlength : [50 , 'Name can not be more than 50 characters']
    },
    address :{
        type:String,
        required : [true,'Please add an adress']
    },
    district:{
        type :String ,
        required :[true,'Please add a district']
    },
    province:{
        type :String ,
        required: [ true , 'Please add a province']
    },
    postalcode:{
        type :String,
        required :[true,'Please add a postalcode'],
        maxlength : [5,'Postal Code can not be more than 5 digits']
    },
    trl:{
        type :String
    },
    region:{
        type:String,
        required :[true,'Please add a region']
    }
});

module.exports = mongoose.model('Hospital',HospitalSchema) ;
// คำสั่งนี้สำคัญมาก
// Hospital เป็นการตั้งชื่อให้ collection หรือ ค้นหา collection ที่มีอยู่แล้ว ใน database โดยจะเปลี่ยนชื่อที่เรากำหนดเป็น plural และเปลี่ยนเป็นตัวพิมพ์เล็ก
//ใน กรณี นี้ mongoose จะใช้เชื่อม โยงชื่อ Model ='Hospital' กับ hospitals ของ collection ใน database
//ส่วน HospitalSchema เป็น ตัวแปรที่เก็บข้อ Schema จริงๆ
