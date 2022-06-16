const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require('../models/authModel');

// Get all users   =>   /api/v1/users
exports.getUsers = async(req, res, next) => {

    const resUsers = await User.getUsers();

    if(!resUsers.success){
        return res.status(200).json({
            success: false,
            message: resUsers.message
        });
    }

    res.status(200).json({
        success: true,
        results: resUsers.results
    });

};

// Create user   =>   /api/v1/user/new
exports.createUser = catchAsyncErrors( async(req, res, next) => {

    if(!req.body.username || !req.body.password){
        return res.status(200).json({
            success: false,
            message: `No se ha recibido la información necesaria.`,
        });
    } // END IF

    // TODO: valida unique username
    const resUsers = await User.getUsers();
    
    if(!resUsers.success){
        return res.status(200).json({
            success: false,
            message: resUsers.message,
        });
    } // END IF
    let isUsernameUnique = true;
    resUsers.results.forEach(element => {
        if(element.Username == req.body.username){
            isUsernameUnique = false;
        }
    });
    
    if(!isUsernameUnique){
        return res.status(200).json({
            success: false,
            message: `El usuario ${ req.body.username } no está disponible, por favor ingresa uno diferente.`,
        });
    } // END IF

    const resCreate = await  User.createUser(req.body);

    if(!resCreate.success){
        return res.status(200).json({
            success: false,
            message: resCreate.message
        });
    }

    res.status(200).json({
        success: true,
        message: `Usuario creado con éxito`,
        newId: resCreate.results.insertId,
        user: req.body
    });

}); // END