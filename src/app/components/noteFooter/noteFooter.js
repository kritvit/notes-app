
import Component from 'Scripts/Component';

import helpers from 'Scripts/helpers';

import { subscribe } from 'Scripts/pubsub';

import { storage } from 'Scripts/storage';

function footer () {

	const note = storage.currentNote;

	const created = `
		<div class="note-footer__created">
			Created: ${new Date(note.created).toLocaleDateString()} ${new Date(note.created).toLocaleTimeString()}
		</div>
	`;

	const edited = note.edited ? `
		<div class="note-footer__edited">
			Edited: ${new Date(note.edited).toLocaleDateString()} ${new Date(note.edited).toLocaleTimeString()}
		</div>
	` : '';

	return `
		${created}
		${edited}
	`;
}

function render (component) {

	const hasNote = helpers.isNumber(storage.currentNote.created);

	component.forEach(node => {

		if (hasNote) {

			node.innerHTML = footer();

		} else {

			node.innerHTML = '';

		}

	});

}

export default Component('note-footer', {

	onLoad (component) {

		render(component);

		subscribe('DISPLAY_NOTE', () => {

			render(component);

		});

	}

});
