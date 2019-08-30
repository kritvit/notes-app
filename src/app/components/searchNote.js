
import Component from 'Utils/Component';

import { publish, subscribe } from 'Utils/pubsub';

import { storage } from 'Utils/storage';

function search (event) {

	if (event.target.value.length >= 1) {

		storage.currentNoteList = storage.noteList.filter(item => {

			return item.title.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase());

		});

	} else {

		storage.currentNoteList = storage.noteList;

	}

	if (storage.currentNoteList[0]) {

		storage.currentNote = storage.currentNoteList[0];

		publish('DISPLAY_NOTE');

	}

	publish('UPDADTE_LIST');

}

export default Component('search-note', {

	onLoad (component) {

		component.forEach(node => {

			node.innerHTML = `
				<input type="search" placeholder="Search notes" />
			`;

			node.querySelector('input').addEventListener('input', search, false);

		});

		subscribe('CLEAR_SEARCH', () => {

			component.forEach(node => {

				node.querySelector('input').value = '';

			});

		});

	}

});
