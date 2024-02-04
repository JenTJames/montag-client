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
