
import helpers from 'Scripts/helpers';

const hasLocalStorage = helpers.hasLocalStorage();

export const storage = {
	noteList: [],
	currentNote: {},
	currentNoteList: [],
	components: []
};

export function get (name) {

	return new Promise((resolve, reject) => {

		if (!hasLocalStorage) {

			reject({status: 'no storage'});

		} else {

			const data = JSON.parse(localStorage.getItem(name));

			if (helpers.isNotEmptyObjectLiteral(data)) {

				resolve(data);

			}

		}

	});

}

export function set (name, data) {

	if (hasLocalStorage) {

		localStorage.setItem(name, JSON.stringify(data));

	}

}
