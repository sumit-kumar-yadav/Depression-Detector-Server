const UserDetail = require('../models/user_details');
const { apiError } = require('../../helpers/format_response');


const allowedRolesMiddleware = (allowedRoles) => {
    try {

        return async (req, res, next) => {

            const userDetails = await UserDetail.findOne({user: req.user._id});

            if(!userDetails) return apiError("Please complete sign up details.", res, {}, 401);

            if (allowedRoles.includes(userDetails.role))
              next();
            else 
              return apiError(`Access denied. Only ${allowedRoles} can access this API.`, res, {}, 403);
        };

    } catch (e) {
        return apiError(String(e), res, {});
    }
  };

module.exports = {
    allowedRolesMiddleware,
}