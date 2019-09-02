
import searchNote from 'Components/searchNote/searchNote';

import noteList from 'Components/noteList/noteList';

import addNote from 'Components/addNote/addNote';

import noteDisplay from 'Components/noteDisplay/noteDisplay';

import noteFooter from 'Components/noteFooter/noteFooter';

import { get, storage } from 'Scripts/storage';

import { publish } from 'Scripts/pubsub';

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
			<div class="app__sidebar">
				<div class="app__header">
					${searchNote.html}
					${addNote.html}
				</div>
				${noteList.html}
			</div>
			<div class="app__main">
				${noteDisplay.html}
				${noteFooter.html}
			</div>
		</div>
	`;

}
