 // Splash screen timeout
 document.addEventListener('DOMContentLoaded', function () {
    const splashScreen = document.getElementById('splash-screen');
    const mainPage = document.getElementById('main-page');

    // Check localStorage for the splash screen flag
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');

    if (!hasSeenSplash) {
        // Show splash screen only for the first time
        splashScreen.style.display = 'block';
        mainPage.style.display = 'none';

        // Set flag immediately to ensure no re-show on refresh
        localStorage.setItem('hasSeenSplash', 'true');

        setTimeout(function () {
            splashScreen.style.display = 'none';
            mainPage.style.display = 'block';
        }, 3000); // 3 seconds
    } else {
        // Directly show the main page if splash already seen
        splashScreen.style.display = 'none';
        mainPage.style.display = 'block';
    }
});

// Function to open detail pages
function openDetailPage(page) {
    window.location.href = page; // Navigate to the specified file
}

// Chat functionality
document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    addMessage(userInput, 'user-message');
    document.getElementById('user-input').value = '';

    fetchReply(userInput);
}

function addMessage(text, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = text;
    document.getElementById('messages').appendChild(messageElement);
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
}

async function fetchReply(userInput) {
    const apiKey = "AIzaSyACXlYkQ81Q7LVKe9dEqiyDQXJ0NfksBtk";
    const apiUrl = `https://gemini.googleapis.com/v1/chat:complete?key=${apiKey}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: userInput,
            temperature: 0.7,
            max_tokens: 150,
        }),
    });

    const data = await response.json();
    const botReply = data.choices[0].text.trim();
    addMessage(botReply, 'bot-message');
}