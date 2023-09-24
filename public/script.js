document.addEventListener('DOMContentLoaded', async function() {
    const chatBox = document.getElementById('chatBox');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    // Fetch Messages from Server
    const response = await fetch('/messages');
    const messages = await response.json();
    messages.forEach(message => displayMessage(message));

    sendButton.addEventListener('click', sendMessage);

    function displayMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');

        const senderElement = document.createElement('div');
        senderElement.classList.add('sender');
        senderElement.textContent = message.sender.username;

        const contentElement = document.createElement('div');
        contentElement.classList.add('content');
        contentElement.textContent = message.content;

        messageElement.appendChild(senderElement);
        messageElement.appendChild(contentElement);

        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function sendMessage() {
        const message = messageInput.value;

        if (message) {
            const response = await fetch('/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: message,
                    sender: 'E4434' 
                    //todo: replace with actual user id
                })
            });

            if (response.ok) {
                messageInput.value = '';
            } else {
                alert('Error sending message');
            }
        }
    }
});
