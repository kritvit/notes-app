
import Component from 'Scripts/Component';

import Note from 'Scripts/Note';

import { publish } from 'Scripts/pubsub';

import { storage, set } from 'Scripts/storage';

function addNote () {

	const newNote = Note();

	storage.noteList.unshift(newNote);
	storage.currentNoteList = storage.noteList;
	storage.currentNote = newNote;

	publish('CLEAR_SEARCH');
	publish('UPDADTE_LIST');
	publish('DISPLAY_NOTE');

	set('notes', {data: storage.noteList});

}

export default Component('add-note', {

	onLoad (component) {

		component.forEach(node => {

			node.innerHTML = `
				<button type="button">&#x1f4dd;</button>
			`;

			node.addEventListener('click', event => {

				if (event.target.nodeName === 'BUTTON') {

					addNote();

				}

			}, false);

		});

	}

});
