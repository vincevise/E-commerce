
const logout = (req,res) => {
    try{
        res.cookie('login',' ',{maxAge:1})
        res.status(200).json({message:'Loggedout successfully'})
    }catch(error){
        res.status(400).json({error:error.message})
    }
    
}

module.exports = {
    logout
}