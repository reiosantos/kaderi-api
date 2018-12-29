import { body, param } from 'express-validator/check';

class ValidatorHelper {
	static validateCreateUser() {
		return [
			body('firstName', 'First Name is required').exists(),
			body('lastName', 'Last Name is required').exists(),
			body('contact', 'Phone number is required').exists(),
			body('email').optional().isEmail(),
			body('password', 'Password is required').exists(),
			body('isAdmin').optional().isBoolean()
		];
	}

	static validateUpdateUser() {
		return [
			param('userId', 'The user ID provided is invalid')
				.exists().isMongoId(),
			body('firstName').optional(),
			body('lastName').optional(),
			body('contact').optional(),
			body('email').optional().isEmail(),
			body('password').optional(),
			body('isAdmin').optional().isBoolean()
		];
	}
}

class UserMiddleware {
	static validate(method) {
		switch (method) {
			case 'createUser':
				return ValidatorHelper.validateCreateUser();
			case 'getUser':
				return [
					param('userId', 'The user ID provided is invalid')
						.exists().isMongoId()
				];
			case 'updateUser':
				return ValidatorHelper.validateUpdateUser();
			default:
				return [];
		}
	}

	static async returnErrors(req, res, next) {
		const errors = await req.getValidationResult();
		if (errors.isEmpty()) {
			return next();
		}
		const responseErrors = errors.array().map(error => ({
			field: error.param,
			message: error.msg
		}));
		return res.status(400).json({ errors: responseErrors });
	}
}

export default UserMiddleware;
