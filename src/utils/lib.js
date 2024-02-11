export const convertToLowerCamelCase = (string) => {
  let convertedString = "";
  const words = string.split(" ");
  words.forEach((word, index) => {
    if (index === 0) convertedString += word.toLowerCase();
    else {
      convertedString += word.charAt(0).toUpperCase() + word.slice(1);
    }
  });
  return convertedString;
};

export const convertCamelCaseToSentence = (camelCaseWord) => {
  // Replace all occurrences of capital letters with a space followed by the same letter in lowercase
  const spacedWord = camelCaseWord.replace(/([A-Z])/g, " $1");
  // Capitalize the first letter of the resulting string
  const capitalizedSentence =
    spacedWord.charAt(0).toUpperCase() + spacedWord.slice(1);
  return capitalizedSentence.trim(); // Remove leading/trailing whitespace
};
