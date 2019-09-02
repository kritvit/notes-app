
export default {
	checkIf (util, value, defaultValue) {

		util = this.isFunction(this[util]) ? this[util] : false;

		return util && util.call(this, value) ? value : defaultValue;

	},
	isArray (value) {
		return value instanceof Array;
	},
	isFunction (check) {
		return typeof check === 'function';
	},
	isNumber (value) {
		return typeof value === 'number' && !isNaN(value);
	},
	isString (value) {
		return typeof value === 'string';
	},
	isNotEmptyString (value) {
		value = 'string' === typeof value ? value.trim() : false;
		return value !== false && '' !== value;
	},
	isNotEmptyObjectLiteral (obj) {
		return obj && Object.entries(obj).length > 0 && obj.constructor === Object;
	},
	hasLocalStorage () {

		const name = 'hasLocalStorage';

		try {

			localStorage.setItem(name, name);

			localStorage.removeItem(name);

			return true;

		} catch(e) {

			return false;

		}

	}
};
