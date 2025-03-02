let chatOpened = false;

function openChat() {
    document.getElementById('chatbotPanel').style.right = '0';

    chatOpened = true;
}
/*
document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        const result = await response.json();
        document.getElementById('responseMessage').textContent = result.message;
    } catch (error) {
        console.error('Error submitting form:', error);
        document.getElementById('responseMessage').textContent = 'An error occurred.';
    }
});
*/
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const guarantor = document.getElementById('guarantor').value;
    const highest_education = document.getElementById('highest-education').value;
    const terms = document.getElementById('terms').value;
    const data = { age, gender, guarantor, highest_education };
/*
    fetch('/submit-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        if (!chatOpened) {
            openChat();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
*/
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