const User = require('../models/User') ;

//@desc Register user
//@route Post /api/v1/auth/register
//@access public
exports.register = async (req,res,next) =>{
    try{
        
        const{name , email , password , role} = req.body ; 
        //จริงๆใช้ const user = await User.create(req.body); ได้โดยไม่ต้องมี บรรทัด9 แต่ ทำแบบนี้ข้างต้นจะยืดหยุ่นกว่า
        //ยืดหยุ่นกว่าที่ว่า คือ สามารถ นำ field มากำหนดเงื่อนไขต่างๆได้
        const user = await User.create({
            name,
            email,
            password,
            role
        });
        // const token = user.getSignedJwtToken();  <- ทุกครั้งที่มีการ regster จะมีการสร้าง token แล้ว respone กลับไป com ผู้ใช้เสมอ
        // res.status(200).json({success :true,token}) ;
        sendTokenResponse(user,200,res) ; // comment การres 2 บรรทัดบน เพราะก่อนจะ res เราจะนำ jwt ไปเก็บ ใน cookie ก่อน
    }catch(err){
        res.status(400).json({success : false}) ;
        console.log(err.stack) ; //เป็นการบอกว่าผิดพลาดที่ไฟล์ไหน บรรทัดไหน เพิ่มเติม
    }
};


//@desc login user
//@route Post /api/v1/auth/login
//@access public


exports.login = async (req,res,next) => {
    const {email,password} = req.body ;

    if(!email || !password){ // ตรวจสอบว่า email  และ password ที่ user ป้อนเข้ามา ไม่ใช่ค่าว่าง
        return res.status(400).json({success : false,
            msg:'Please provide an email and password'}) ;
    }

    // ดึงข้อมูล user ถ้าหาเจอ ดึงข้อมูล password ของที่เจอมาด้วย (user จะกลายเป็นตัวแปร ที่เป็น object ของ User)
    const user = await User.findOne({email}).select('+password') ; 

    if(!user){ // ถ้า  user เป็นค่าว่าง คือหาไม่เจอเลย
        return res.status(400).json({success:false,
            msg:'Invalid credentials'});
    }

    const isMatch = await user.matchPassword(password) ; //ถ้าหา user เจอ นำ password ที่ป้อน ไปใส่ใน matchPassword เพื่อเปรียบเทียบ กับ password ที่เข้าหรัสไว้ใน db

    if(!isMatch){ // ถ้า ไม่มี password ที่ตรงกัน กับที่ดึงมาเลย
        return res.status(401).json({success:false,
            msg :'Invalid credentials'}) ;
    }

    // const token = user.getSignedJwtToken(); <- ถ้าทุกอย่าง ทั้ง  email  และ password ที่ user ป้อนมามีอยู่จริง ใน db จะสร้าง token
    // res.status(200).json({success:true,token}) ; <- ส่ง token กลับไปที่ com ของ user
    sendTokenResponse(user,200,res) ; // comment การres 2 บรรทัดบน เพราะก่อนจะ res เราจะนำ jwt ไปเก็บ ใน cookie ก่อน
    // นำ email และ password ที่ตรงกับ ข้อมูล ใน database เข้าไปด้วย พร้อม status code ของการ respone และ res object จาก express
} ;

const sendTokenResponse =(user,statusCode,res)=>{
    const token = user.getSignedJwtToken() ; //สร้าง token

    // สร้างการตั้งค่าต่างๆของ cokkie เก็บไว้ในตัวแปร options
    const options = {
        expires : new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000), // จำนวนวันต้องเป็น มิลลิวินาที
        httpOnly : true
    };

    if(process.env.NODE_ENV ==='production'){// ถ้าสถานะ ของ user คือ prodeuction cookie จะถูกตั้งค่า เป็น option.secure = true
        options.secure = true ;  // ซึ่งจะทำให้ cookie จะถูกส่ง ผ่าน HTTPS เท่านั้น ซึ่งปลอดภับ กว่า HTTP
        //ต้องกำหนดแยกจาก options เพราะต้องมีเงื่อนไขสำคัญก่อน
    }

    // สร้าง cookie โดยใช้ .cookie(ชื่อcookie, tokenที่เก็บ ,การตั้งค่าใน cookie )
    res.status(statusCode).cookie('token',token,options).json({
        success : true ,
        token
    })
}

exports.getMe = async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success : true ,
        data : user
    }) ;
};