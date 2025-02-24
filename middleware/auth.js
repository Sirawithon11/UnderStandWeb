const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect= async(req,res,next)=>{
    let token ;
    // เช็คว่าข้อมูล ที่เราส่งมา มาจาก authorization ไหม และ ขึ้นต้นด้วย Bearer หรือเปล่า
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){ 
        token = req.headers.authorization.split(' ')[1] ; // นำ token ที่มี bearer อยู่ด้านหน้า ใส่ในตัวแปร bearer
    }

    if(!token){ //ถ้า if ด้านบน ผิด token จะเป็นค่าว่าง  ไม่สามารถผ่านเงื่อนไขนี้ได้
        return res.status(401).json({success:false , message : 'Not authorize to access this route'}) ;
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET) ; // ยืนยัน token ที่ส่งมาด้วย secret key
        console.log(decoded) ; // แสดงข้อมูลที่เก็บใน payload
        req.user = await User.findById(decoded.id); // เลือกข้อมูลที่ส่งมาจาก payload  ไปเก็บ req.user เพื่อให้ค่าจาก database นำไปใช้ต่อ ใน method ถัดไปได้
        next(); //เรียกใช้ method ถัดไปที่อยู่ใน block เดียวกัน กับ protect
    }catch(err){
        console.log(err.stack);
        return res.status(401).json({success:false , message :'Not authorize to access this route'}) ;
    }
};


//เพิ่มการจัดการสิทธ์การเข้าถึงมากขึ้น
exports.authorize =(...roles) =>{ //parameter ที่เป็น roles จะกำหนด role ที่สามารถเข้าถึงได้  
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){ // req.user.role คือ role ที่ user ส่ง มา ถ้าตรงกับ parameter ก็สามารถ ไปยัง method block ถัดไปได้ 
            return res.status(403).json({success:false,
                message:`User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    }
}