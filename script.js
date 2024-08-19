let startTime;
let interval;
let typedCharacters = 0;
let textToType = '';

function getRandomParagraph(wordCount = 100) {
    const words = [
        "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", 
        "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", 
        "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", 
        "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", 
        "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", 
        "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", 
        "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", 
        "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", 
        "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
    ];
    
    let paragraph = [];
    for (let i = 0; i < wordCount; i++) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        paragraph.push(randomWord);
    }
    
    // Combine the words into a sentence-like structure
    return paragraph.join(' ') + '.';
}

function startTyping() {
    const inputArea = document.getElementById('input-area');

    if (!startTime) {
        startTime = new Date().getTime();
        interval = setInterval(updateTime, 1000);
    }

    const inputText = inputArea.value;
    typedCharacters = inputText.length;

    if (inputText === textToType) {
        clearInterval(interval);
        calculateResults();
    } else {
        calculateResults();  // Update results in real-time
    }
}

function updateTime() {
    const timeElapsed = Math.floor((new Date().getTime() - startTime) / 1000);
    document.getElementById('time').innerText = timeElapsed;
}

function calculateResults() {
    const inputArea = document.getElementById('input-area');
    const inputText = inputArea.value;

    const timeTaken = Math.floor((new Date().getTime() - startTime) / 1000);
    const wordsTyped = typedCharacters / 5;
    const wpm = Math.floor((wordsTyped / timeTaken) * 60);

    let correctCharacters = 0;
    for (let i = 0; i < inputText.length; i++) {
        if (inputText[i] === textToType[i]) {
            correctCharacters++;
        }
    }
    
    const accuracy = Math.floor((correctCharacters / textToType.length) * 100);

    document.getElementById('wpm').innerText = wpm;
    document.getElementById('accuracy').innerText = accuracy;
}

function restartTest() {
    clearInterval(interval);
    startTime = null;
    typedCharacters = 0;

    textToType = getRandomParagraph(100);  // Generate approximately 100 words
    document.getElementById('text-to-type').innerText = textToType;

    document.getElementById('input-area').value = '';
    document.getElementById('time').innerText = '0';
    document.getElementById('wpm').innerText = '0';
    document.getElementById('accuracy').innerText = '0';
}

// Initialize with a random paragraph
window.onload = function() {
    restartTest();
}
