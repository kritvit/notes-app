
import helpers from 'Utils/helpers';

function init (component) {

	if (component.onLoad) {

		if (document.readyState === 'loading') {

			document.addEventListener('readystatechange', event => {

				if (event.target.readyState === 'interactive') {

					component.onLoad(document.querySelectorAll(component.selector));

				}

			});

		} else {

			component.onLoad(document.querySelectorAll(component.selector));

		}

	}

}

class Component {

	constructor (name, params) {

		if (!helpers.isNotEmptyString(name)) {

			return;

		}

		this.name 		= name;
		this.selector 	= '.'+name;
		this.fn 		= helpers.checkIf('isNotEmptyObjectLiteral', params.fn, null);
		this.onLoad 	= helpers.checkIf('isFunction', params.onLoad, null);
		this.onRender 	= helpers.checkIf('isFunction', params.onRender, null);
		this.html 		= `<div class="${this.name}"></div>`;

		init(this);

		this.render = () => {

			if (this.onRender) {

				this.onRender(document.querySelectorAll(this.selector));

			}

		};

	}

}

export default (name, params) => {

	return new Component(name, params);

};
