import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function validatePassword(password) {
	return bcrypt.compare(password, this.password);
}

export function generateJWTToken() {
	const today = new Date();
	const expiry = new Date(today);

	expiry.setDate(today.getDate() + 2);
	return jwt.sign({
		id: this._id,
		exp: Number.parseInt(expiry.getTime() / 100, 10)
	}, process.env.JWT_SECRET);
}

export function toAuthJSON() {
	return {
		_id: this._id,
		name: this.name,
		token: this.generateJWTToken()
	};
}
