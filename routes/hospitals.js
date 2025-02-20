const express = require('express') ;
const router = express.Router() ; // สร้าง router object
const {getHospital,getHospitals,postHospital,putHospital,deleteHospital} =require('../Controllers/hospitals')

//เรียก function จากการ Controller มาทำงานที่นี่
router.route('/').get(getHospitals).post(postHospital);
router.route('/:id').get(getHospital).put(putHospital).delete(deleteHospital);


module.exports = router ; 
// คืนค่าเฉพาะ router ซึ่งจะเป็นตัวแปรประเภทอะไรก็ได้ หรือ object หรือ แม้แต่ function ณ ที่นี่ router เป็น object