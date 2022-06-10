// given a word
// get the meaning of the word
// using the freeDictionaryAPI on github
// at https://github.com/meetDeveloper/freeDictionaryAPI

// button to show and hide dictionary
function openCloseDictionary() {
  let d = document.getElementById("dictionary");
  if (d.style.display == "none") {
    d.style.display = "flex";
  } else {
    d.style.display = "none";
  }
}

// handles dictinary search to parse to function which gets definition
function handleDictionarySearch() {
  const word = document.getElementById("dictionary-word").value;
  getWordDefinition(word).then((definition) => {
    document.getElementById("dictionary-result").innerHTML = definition;
  });
}
// asychronously fetchgin data while search is handled
async function getWordDefinition(word) {
  const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      // just returns the first definition
      const definition = data[0].meanings[0].definitions[0].definition;
      return definition;
    });
}
