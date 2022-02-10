//Desc: The ErrorHandle Class is the child of the Error Class
class ErrorHandler extends Error {
	constructor(message, statusCode) {
		super(message)
		this.statusCode = statusCode
		Error.captureStackTrace(this, this.constructor)
	}
}
export default ErrorHandler
