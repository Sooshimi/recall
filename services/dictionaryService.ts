export const fetchDefinitions = async (word: string) => {
	if (!word.trim()) throw new Error('No word provided');

	const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

	if (!response.ok) {
		throw new Error('Failed to fetch data from API');
	}

	const data = await response.json();
	const entry = data?.[0];

	const meanings: Record<string, string[]> =
		entry?.meanings?.reduce((acc: Record<string, string[]>, meaning: any) => {
			const partOfSpeech = meaning?.partOfSpeech ?? 'unknown';
			const definition = meaning?.definitions?.map((d: any) => d?.definition).filter(Boolean) ?? [];

			acc[partOfSpeech] = definition;
			return acc;
			}, {}
		) ?? {};

	return meanings
};