const roleCheck = (allowedRoles) => {
    return (req,res,next) => {
        if(!req.user || !allowedRoles.includes(req.user.role)){
            res.status(403)
            throw new Error("You do not have permission to access this action");
        }
        next()
    }
}

module.exports = roleCheck