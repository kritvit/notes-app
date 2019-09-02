
import Component from 'Scripts/Component';

import helpers from 'Scripts/helpers';

import { subscribe } from 'Scripts/pubsub';

import { storage, set } from 'Scripts/storage';

function render (component) {

	component.forEach(node => {

		node.innerHTML = helpers.isString(storage.currentNote.body) ? `
			<textarea style="width:100%;">${storage.currentNote.body}</textarea>
		` : '';

	});

}

export default Component('note-display', {

	onLoad (component) {

		render(component);

		subscribe('DISPLAY_NOTE', () => {

			render(component);

		});

		component.forEach(node => {

			node.addEventListener('input', event => {

				if (event.target.nodeName === 'TEXTAREA') {

					const id = storage.currentNote.id;

					for (let index = storage.noteList.length - 1; index >= 0; index--) {

						if (storage.noteList[index].id === id) {

							storage.noteList[index].body = event.target.value;
							storage.noteList[index].edited = Date.now();

							set('notes', {data: storage.noteList});

							break;
						}

					}

				}

			}, false);

		});

	}

});
