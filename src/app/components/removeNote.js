
import Component from 'Utils/Component';

import helpers from 'Utils/helpers';

import { publish } from 'Utils/pubsub';

import { storage, set } from 'Utils/storage';

function remove (id) {

	let removeIndex = null;

	for (let index = storage.noteList.length - 1; index >= 0; index--) {

		if (storage.noteList[index].id === id) {

			removeIndex = index;

			break;
		}

	}

	if (helpers.isNumber(removeIndex)) {

		if (storage.currentNote.id === storage.noteList[removeIndex].id) {

			storage.currentNote = {};

			publish('DISPLAY_NOTE');

		}

		storage.noteList.splice(removeIndex, 1);

		storage.currentNoteList = storage.noteList;

		publish('CLEAR_SEARCH');
		publish('UPDADTE_LIST');

		set('notes', {data: storage.noteList});

	}

}

export default Component('remove-note', {

	onRender (component) {

		component.forEach(node => {

			node.innerHTML = `
				<button type="button">&#x1f5d1;</button>
			`;

			node.addEventListener('click', event => {

				if (event.target.nodeName === 'BUTTON') {

					const id = parseInt(event.target.closest('.note-list__item').getAttribute('data-id'));

					remove(id);

				}

			});

		});

	}

});