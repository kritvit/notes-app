
import Component from 'Utils/Component';

import removeNote from 'Components/removeNote';

import { publish, subscribe } from 'Utils/pubsub';

import { storage, set } from 'Utils/storage';

function isCurrent (id) {

	return id === storage.currentNote.id ? ' note-list__item--current' : '';

}

function render (component) {

	component.forEach(node => {

		node.innerHTML = '';

		storage.currentNoteList.forEach(note => {

			node.innerHTML =  `
				${node.innerHTML}
				<div class="note-list__item${isCurrent(note.id)}" data-id="${note.id}">
					<input type="text" value="${note.title}" />
					${removeNote.html}
				</div>
			`;

			removeNote.render();

		});

	});

}

export default Component('note-list', {

	onLoad (component) {

		render(component);

		subscribe('UPDADTE_LIST', () => {

			render(component);

		});

		component.forEach(node => {

			node.addEventListener('click', event => {

				if (event.target.nodeName === 'INPUT') {

					const id = parseInt(event.target.closest('.note-list__item').getAttribute('data-id'));

					node.querySelectorAll('.note-list__item').forEach(el => {

						el.classList.remove('note-list__item--current');

					});

					event.target.closest('.note-list__item').classList.add('note-list__item--current');

					for (let index = storage.noteList.length - 1; index >= 0; index--) {

						if (storage.noteList[index].id === id) {

							storage.currentNote = storage.noteList[index];

							publish('DISPLAY_NOTE');

							break;
						}

					}

				}

			}, false);

			node.addEventListener('input', event => {

				if (event.target.nodeName === 'INPUT') {

					const id = parseInt(event.target.closest('.note-list__item').getAttribute('data-id'));

					for (let index = storage.noteList.length - 1; index >= 0; index--) {

						if (storage.noteList[index].id === id) {

							storage.noteList[index].title = event.target.value;
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