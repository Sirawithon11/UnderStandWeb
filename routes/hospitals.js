const express = require('express') ;
const router = express.Router() ; // สร้าง router object
const {getHospital,getHospitals,postHospital,putHospital,deleteHospital} =require('../Controllers/hospitals')
const {protect,authorize} = require('../middleware/auth');
//เรียก function จากการ Controller มาทำงานที่นี่
router.route('/').get(getHospitals).post(protect,authorize('admin'),postHospital);
router.route('/:id').get(getHospital).put(protect,authorize('admin'),putHospital).delete(protect,authorize('admin'),deleteHospital);
//ถ้าผ่าน protect ไปได้ ก็ตรงตรวจสอบอีกว่า role ที่ ส่งมาเป็น admin ไหม ถ้าใช้ ก็สามารถเข้าไปทำไงที่ method ถัดไปได้

module.exports = router ; 
// คืนค่าเฉพาะ router ซึ่งจะเป็นตัวแปรประเภทอะไรก็ได้ หรือ object หรือ แม้แต่ function ณ ที่นี่ router เป็น object