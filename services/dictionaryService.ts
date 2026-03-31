export const fetchDefinitions = async (word: string) => {
	if (!word.trim()) throw new Error('No word provided');

	const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

	if (!response.ok) {
		throw new Error('Failed to fetch data from API');
	}

	const data = await response.json();

	const definition: string = data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ?? 'No definition found';
	const partOfSpeech: string = data?.[0]?.meanings?.[0]?.partOfSpeech ?? 'No part of speech found';

	return {definition, partOfSpeech};
};