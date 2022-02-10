import mongoose from 'mongoose'

const connDB = async () => {
	if (mongoose.connection.readyState > 1) {
		return
	}
	mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	// .then((con) => console.log('Connected to local Data-Base'))
}

export default connDB
