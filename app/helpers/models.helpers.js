import bcrypt from 'bcrypt';

export async function saveUser(next) {
	const SALT_WORK_FACTOR = 10;
	if (!this.isModified('password')) return next();
	try {
		const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
		this.password = await bcrypt.hash(this.password, salt);
		return next();
	} catch (error) {
		return next(error);
	}
}
