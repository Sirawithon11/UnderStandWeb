const mongoose=require('mongoose');
const bcrypt = require('bcryptjs') ;
const jwt = require('jsonwebtoken') ;
const UserSchema=new mongoose.Schema({
name:{
    type:String,
    required:[true,'Please add a name']
},
email:{
    type: String,
    required:[true,'Please add an email'],
    unique: true,
    match: [
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Please add a valid email'
    ]
},
role: {
    type:String,
    enum: ['user','admin'],
    default: 'user'
},
password: {
    type:String,
    required:[true,'Please add a password'],
    minlength: 6,
    select: false // password จะกำหนด แบบนี้เสมอเพื่อป้องกันการดึงรหัสผ่าน ยกเว้นการดึงจะใช้ select(+password)
},
    resetPasswordToken: String,
    resetPasswordExpire: Date,
createdAt:{
    type: Date,
    default:Date.now
}
});

//Method UserSchema การจัดการค่าต่างๆ เกี่ยวกับการจัดการข้อมูลใน db
//เป็นการเติมเกลือ ซึ่งเป็น func สำหรับสร้างความแตกต่างให้รหัส ที่เหมือนกัน 
//การเข้ารหัส ให้กับรหัสที่เติมเกลือมาแล้ว  
UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt) ;
});


// สร้าง token โดยเลือก _id และ expiredIn เก็บใน payload
// process.env.JWT_SECRET เก็บไว้ฝั่ง server รอตรวจสอบ signature ที่ส่งกลับมา  จาก ผู้ใช้
//header ถูกสร้าง อัติโนมัต มีค่า default อยู่  และ signature ถูกสร้างอัตโนมัติ เช่นกัน โดย ใช้ ้header + payload + secretKey
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE
    });
}


// ในการ login นำรหัส ที่ user ใส่เข้า มาเปรียบเทียบ กับรหัสใน db ที่ผ่านการเข้ารหัส แล้ว
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password) ;
}

module.exports = mongoose.model('User',UserSchema) ;
// User คือ class ที่ ใช้สำหรับการเข้าถึงและจัดการข้อมูล ใน MongoDB ดังนั้น ตัวแปรใดๆ ที่ทำการ สร้าง, ค้นหา, แก้ไข, ลบ ใน db สามารถ
// ใช้ function ที่สร้าง จาก Schema ได้

// UserSchema จะเป็น โครงร่าง ที่นำไปเก็บไว้ใน database