const express = require('express') ;
const {register,login,getMe} = require('../Controllers/auth');
const router = express.Router() ;
const {protect} = require('../middleware/auth');

router.post('/register',register) ;
router.post('/login',login) ;
router.get('/me',protect,getMe) ; 
// protect method ต้องวางไว้ด้านหน้า ของ get me เพราะ ต้องยืนยันสิทธ์ก่อน ว่า user สามารถใช้ getMe ได้ไหม
//ถ้าได้ จะไปทำ getMe ต่อ แต่ถ้า มี err ใน protect จะไม่สามารถใช้ getMe method ได้

module.exports = router ;