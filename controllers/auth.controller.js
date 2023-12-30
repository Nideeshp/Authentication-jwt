const register = async(req,res,next)=>{
    res.send('register route')
}

const login = async(req,res,next)=>{
    res.send('login route')
}


const refreshToken = async(req,res,next)=>{ 
    res.send('refresh token route')
}

const logout = async(req,res,next)=>{
    res.send('logout route')
}



module.exports={
    register,
    login,
    refreshToken,
    logout
}
