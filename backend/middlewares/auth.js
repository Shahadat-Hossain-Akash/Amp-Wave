import { getSession } from "next-auth/react"
import ErrorHandler from "../utils/errorHandler"
import { getServerSession } from "next-auth/next";

const isAuthenticated = async (req, res, next) => {
    const session = await getServerSession({ req })

    if (!session) {
        return next(new ErrorHandler("Login first to access this route", 401));
    }

    req.user = session.user;

    next();

}

const authorizeRole = (...roles) => {
    return (req, res, next) => {
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