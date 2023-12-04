class App {
	#dictionary

	constructor() {
		this.#dictionary = new Dictionary()
		this.#addEventListeners()
	}

	#addEventListeners() {
		document.querySelector('form').addEventListener('submit', e => {
			e.preventDefault()
			const word = document.querySelector('#search').value
			this.#dictionary.searchWord(word)
		})
	}
}

const app = new App()
