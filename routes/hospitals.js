const express = require('express') ;
const router = express.Router() ;
const {getHospital,getHospitals,postHospital,putHospital,deleteHospital} =require('../Controllers/hospitals')


router.route('/').get(getHospitals).post(postHospital);
router.route('/:id').get(getHospital).put(putHospital).delete(deleteHospital);


module.exports = router ;