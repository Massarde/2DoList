import ErrorHandler from '../utils/errorHandler'

// eslint-disable-next-line import/no-anonymous-default-export
export default (err, req, res, next) => {
	err.statusCode = err.statusCode || 500
	let error = { ...err }
	error.message = err.message
	//Wrong Mongoose Object ID Error->
	if (err.name === 'CastError') {
		const message = `Resource Not Found. Invalid: ${err.path}`
		error = new ErrorHandler(message, 400)
	}
	//Handling Mongoose Validation Error->
	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map((values) => values.message)
		error = new ErrorHandler(message, 400)
	}

	res.status(err.statusCode).json({
		success: false,
		error,
		message: error.message,
		stack: error.stack,
	})
}
