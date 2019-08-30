
import searchNote from 'Components/searchNote';

import noteList from 'Components/noteList';

import addNote from 'Components/addNote';

import noteDisplay from 'Components/noteDisplay';

import noteFooter from 'Components/noteFooter';

import { get, storage } from 'Utils/storage';

import { publish } from 'Utils/pubsub';

get('notes').then(response => {

	storage.noteList = response.data;

	storage.currentNoteList = response.data;

	publish('UPDADTE_LIST');

	if (response.data[0]) {

		storage.currentNote = response.data[0];

		publish('DISPLAY_NOTE');

	}

});

export default function App () {

	return `
		<div class="app">
			<div class="global-sidebar">
				<div class="global-header">
					${searchNote.html}
					${addNote.html}
				</div>
				${noteList.html}
			</div>
			<div class="global-main">
				${noteDisplay.html}
				${noteFooter.html}
			</div>
		</div>
	`;

}
