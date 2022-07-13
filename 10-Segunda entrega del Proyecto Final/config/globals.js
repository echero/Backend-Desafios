require('dotenv').config()

module.exports = {
	ENGINE: process.env.ENGINE,
	MONGO_URI: process.env.MONGO_URI || '',
	FIRESTORE_FILE: process.env.FIRESTORE_FILE || ''
}