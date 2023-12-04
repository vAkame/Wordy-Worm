class Dictionary {
	#wordResults

	searchWord() {
		const search = document.querySelector('#search')
		const searchValue = search.value.trim().toLowerCase()

		if (searchValue) {
			this.#getDefinitions(searchValue)
		} else {
			alert('Search for a word!')
		}

		search.value = ''
	}

	async #getDefinitions(word) {
		try {
			const response = await fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
			)

			if (response.ok) {
				const data = await response.json()
				this.#wordResults = data
				this.#renderSuccess()
			} else {
				throw new Error('Not Found in Database')
			}
		} catch (err) {
			this.#renderError(word)
		}
	}

	// Render Methods
	#renderError(word) {
		const uppercasedWord = word[0].toUpperCase() + word.slice(1)
		const results = document.querySelector('.results')
		results.innerHTML = `
      <h2>${uppercasedWord} can not be found here. Try googling it!</h2>
    `
	}

	#renderSuccess() {
		const results = document.querySelector('.results')
		results.innerHTML = ''

		let resultsInnerHTML = '<button class="save-btn">Save</button>'

		this.#wordResults.forEach((word, index) => {
			resultsInnerHTML += `
        <div class="word">
          <div class="word-name">
            <h2 class="word-title">#${index + 1}: ${word.word}</h2>
          </div>

          <ul class="definition-list">
            ${word.meanings
							.map(meaning => {
								return `
                <li>
                  <div class="definition">
                    <h3>${meaning.partOfSpeech} - 
                    <small>${meaning.definitions[0].definition}</small></h3>

                    ${
											meaning.definitions[0].example
												? `<small>Example: ${meaning.definitions[0].example}</small>`
												: ''
										}
              
                    ${
											meaning.definitions[0].synonyms.length !== 0
												? `<p>Synonyms: ${meaning.definitions[0].synonyms.join(
														', '
												  )}</p>`
												: ''
										}

                    ${
											meaning.definitions[0].antonyms.length !== 0
												? `<p>Antonyms: ${meaning.definitions[0].antonyms.join(
														', '
												  )}</p>`
												: ''
										}

      
                  </div>
                </li>
              `
							})
							.join('')}
          </ul>
        </div>
      `
		})

		results.innerHTML = resultsInnerHTML
	}
}
