
let increment = 0;

class Note {

	constructor () {

		this.created 	= Date.now();
		this.edited 	= null;
		this.id 		= parseInt(this.created.toString()+increment);
		this.body 		= '';
		this.tags 		= [];
		this.title 		= 'New note...';

		increment++;

	}

}

export default () => {

	return new Note();

};
