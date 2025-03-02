let chatOpened = false;

function openChat() {
    document.getElementById('chatbotPanel').style.right = '0';

    chatOpened = true;
}

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const age = document.getElementById('age').value;
    const income = document.getElementById('income').value;
    const savings = document.getElementById('savings').value;
    const expenses = document.getElementById('expenses').value;
    console.log('Form Submitted:', { age, income, savings, expenses });

    if (!chatOpened) {
        openChat();
    }
});

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatContent = document.getElementById('chatContent');
    const userMessage = chatInput.value;
    if (userMessage.trim() !== '') {
        const messageElement = document.createElement('div');
        messageElement.textContent = 'You: ' + userMessage;
        chatContent.appendChild(messageElement);
        chatInput.value = '';
    }

    // Chatbot API Integration
}

document.getElementById('chatInput').addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        event.preventDefault;
        sendMessage();
    }
});

function closeChat() {
    document.getElementById('chatbotPanel').style.right = '-500px';
    chatOpened = false;
}