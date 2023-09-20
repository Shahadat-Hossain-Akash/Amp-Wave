import {getSession} from "next-auth/react"
import ErrorHandler from "../utils/errorHandler"

const isAuthenticated = async (req, res, next) => {
    const session = await getSession({req})

    console.log(session)

    if (!session) {
        return next(new ErrorHandler("Login first to access this route", 401));
    }

    req.user = session.user;

    console.log(req.user)

    next();

}

const authorizeRole = (...roles) => {
    return(req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to access resource`)
            )
        }
        next()
    }
}

export {
    isAuthenticated, authorizeRole
}