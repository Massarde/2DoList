class APIFeatures {
	constructor(query, queryStr) {
		this.query = query
		this.queryStr = queryStr
	}
	// search() {
	// 	const title = this.queryStr.title
	// 		? {
	// 				name: {
	// 					$regex: this.queryStr.title,
	// 					$options: 'i',
	// 				},
	// 		  }
	// 		: {}
	// 	console.log(title)
	// 	this.query = this.query.find({ ...title })
	// 	return this
	// }

	searchName() {
		const name = this.queryStr.name
			? {
					name: {
						$regex: this.queryStr.name,
						$options: 'i',
					},
			  }
			: {}
		console.log(name)
		this.query = this.query.find({ ...name })
		return this
	}

	searchDescription() {
		const description = this.queryStr.description
			? {
					description: {
						$regex: this.queryStr.description,
						$options: 'i',
					},
			  }
			: {}
		console.log(description)
		this.query = this.query.find({ ...description })
		return this
	}
	filter() {
		const queryCopy = { ...this.queryStr }
		//Remove fields from query
		const removeFields = ['name', 'page', 'description']
		removeFields.forEach((el) => delete queryCopy[el])
		this.query = this.query.find(queryCopy)
		console.log(queryCopy)
		return this
	}
	pagination(resPerPage) {
		const currentPage = Number(this.queryStr.page) || 1
		const skip = resPerPage * (currentPage - 1)
		this.query = this.query.limit(resPerPage).skip(skip)
		return this
	}
}
export default APIFeatures
