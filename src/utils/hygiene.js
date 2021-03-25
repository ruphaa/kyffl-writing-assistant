// Calculate reading time of the post
const calcReadingTime = (content) => {
  const wordsPerMinute = 200; // Average case.
  let result;
  let textLength = content.split(/\s/g).length; // Split by words
  if (textLength > 0) {
    let value = Math.ceil(textLength / wordsPerMinute);
    result = `${value} min read`;
  }
  return result;
};

// Calculate Character count in a text
const calcCharacterCount = (text) => {
  return text.length;
};

// Calculate the word count in a text
const calcWordCount = (text) => {
  console.log('text', text);
  return text && text.split(/\s/g).length;
};

// Calculate Readability Score
function calculateFlesch(totalSentences, totalWords, totalSyllables) {
  return (
    206.835 -
    1.015 * (totalWords / totalSentences) -
    84.6 * (totalSyllables / totalWords)
  );
}

function getSyllables(word) {
  word = word.toLowerCase();
  if (word.length <= 3) {
    return 1;
  }
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  var syl = word.match(/[aeiouy]{1,2}/g);
  return (syl && syl.length) || 0;
}

const calcReadabilityScore = (text) => {
  let totalSentences = 0,
    totalWords = 0,
    totalSyllables = 0;
  var sentences = text.split(/[\\.!\?]/);
  totalSentences = sentences.length;
  sentences.forEach(function(sentence) {
    var word = "";
    for (var i = 0; i < sentence.length; i++) {
      word += sentence[i];
      if (sentence[i] == " ") {
        totalWords++;
        totalSyllables += getSyllables(word);
        word = "";
      }
    }

    if (word.length > 0) {
      totalWords++;
      totalSyllables += getSyllables(word);
      word = "";
    }
  });
  return (
    Math.round(
      calculateFlesch(totalSentences, totalWords, totalSyllables) * 100
    ) / 100
  );
};

export {
  calcReadabilityScore,
  calcReadingTime,
  calcCharacterCount,
  calcWordCount,
  calculateFlesch,
  getSyllables
}

// Calculate Subjectivity

// https://github.com/ticup/emotional

// For calculating subjectivity, we'll install the above library in our product and directly call their subjectivity method
