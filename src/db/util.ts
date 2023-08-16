export const backendUrl = process.env.DB_HOST ?? 'http:127.0.0.1:3173';



export function splitIntoParagraphs(sentence:string) {
	const sentences = sentence.split('. ');
	const paragraphs:string[] = [];
	let currentParagraph:string = '';
  
	for (const sentence of sentences) {
	  if (currentParagraph.split('. ').length < 3) {
		currentParagraph += sentence + '. ';
	  } else {
		paragraphs.push(currentParagraph);
		currentParagraph = sentence + '. ';
	  }
	}
  
	if (currentParagraph) {
	  paragraphs.push(currentParagraph);
	}
  
	return paragraphs;
  }
  