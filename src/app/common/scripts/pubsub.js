
import helpers from 'Scripts/helpers';

const storage = {};

export function publish (subscription, args) {

	args = helpers.checkIf('isArray', args, [args]);

	helpers.checkIf('isArray', storage[subscription], []).forEach(callback => {

		callback.apply(null, args);

	});

}

export function subscribe (subscription, callback) {

	storage[subscription] = storage[subscription] || [];

	if (!storage[subscription].includes(callback)) {

		storage[subscription].push(callback);

	}

	return [subscription, callback];

}

export function unsubscribe (subscription, callback) {

	callback 		= helpers.isArray(subscription) ? subscription[1] : callback;
	subscription 	= helpers.isArray(subscription) ? subscription[0] : subscription;

	if (helpers.isArray(storage[subscription]) && storage[subscription].indexOf(callback) > -1) {

		storage[subscription].splice(storage[subscription].indexOf(callback), 1);

	}

}
