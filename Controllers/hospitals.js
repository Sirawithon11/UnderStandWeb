// @desc Get all hospitals
//@route GET /api/v1/hospitals
//@access public
exports.getHospitals =(req,res,next) =>{
    res.status(200).json({success:true , msg:'Get all Hospitals'}) ;
}


// @desc Get single hospitals
//@route GET /api/v1/hospitals/:id
//@access public
exports.getHospital =(req,res,next) =>{
    res.status(200).json({success:true , msg:`Get all Hospitals ${req.params.id}`}) ;
}

// @desc Create single hospitals
//@route post /api/v1/hospitals
//@access public
exports.postHospital =(req,res,next)=>{
    res.status(200).json({success:true , msg :'Create new hospitals'}) ;
}

// @desc Update single hospitals
//@route put /api/v1/hospitals/:id
//@access public
exports.putHospital =(req,res,next)=>{
    res.status(200).json({success:true , msg :`Update hospital ${req.params.id}`}) ;
}
// @desc Delete single hospitals
//@route delete /api/v1/hospitals/:id
//@access public
exports.deleteHospital = (req,res,next)=>{
    res.status(200).json({success:true , msg :`Delete hospital ${req.params.id}`}) ;
}


