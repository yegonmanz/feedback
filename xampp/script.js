document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback').value;

    const feedbackObject = { name, email, feedback };
    
    // Assuming the backend API endpoint is /submitFeedback
    fetch('/submitFeedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackObject)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            displayFeedback(feedbackObject);
            document.getElementById('feedbackForm').reset();
        } else {
            alert('Error submitting feedback');
        }
    })
    .catch(error => console.error('Error:', error));
});

function displayFeedback(feedback) {
    const feedbackDisplay = document.getElementById('feedbackDisplay');
    const feedbackElement = document.createElement('div');
    feedbackElement.classList.add('feedback-item');
    feedbackElement.innerHTML = `
        <p><strong>Name:</strong> ${feedback.name}</p>
        <p><strong>Email:</strong> ${feedback.email}</p>
        <p><strong>Feedback:</strong> ${feedback.feedback}</p>
    `;
    feedbackDisplay.appendChild(feedbackElement);
}
