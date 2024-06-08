document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('guestbook-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const author = document.getElementById('author').value;
        const message = document.getElementById('message').value;

        // Send a POST request to the back-end
        const response = await fetch('http://localhost:8000/guestbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ author, message })
        });

        if (response.ok) {
            const entry = await response.json();
            addEntryToGuestbook(entry);
        }
    });

    // Function to add a guestbook entry to the DOM
    function addEntryToGuestbook(entry) {
        const entriesDiv = document.getElementById('guestbook-entries');
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');
        entryDiv.innerHTML = `
            <p><strong>${entry.author}</strong> <em>${new Date(entry.timestamp).toLocaleString()}</em></p>
            <p>${entry.message}</p>
        `;
        entriesDiv.prepend(entryDiv);
    }
});
