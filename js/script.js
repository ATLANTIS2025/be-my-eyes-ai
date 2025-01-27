// Handle Sign In
document.getElementById('sign-in-form')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Assuming the form is valid and the user is signed in
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // For demonstration, we will assume any email/password combo is valid
    if (email && password) {
        // Redirect to the main page after sign-in
        window.location.href = 'main.html';  // This redirects to the main page
    } else {
        alert("Please enter a valid email and password.");
    }
});

// Handle Sign Up
document.getElementById('sign-up-form')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Assuming the form is valid and the user has been signed up
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // For demonstration, we will assume any email/password combo is valid
    if (email && password) {
        // Redirect to the main page after sign-up
        window.location.href = 'main.html';  // This redirects to the main page
    } else {
        alert("Please enter a valid email and password.");
    }
});

// Access the user's camera
const video = document.getElementById('video');
const aiButton = document.getElementById('ai-button');
const welcomeText = document.getElementById('welcome-text');

// Start the camera stream
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        video.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Error accessing camera: ", error);
    });

// AI Functionality
function toggleAI() {
    // When the user clicks the button
    if (aiButton.classList.contains('listening')) {
        aiButton.classList.remove('listening');
        aiButton.style.backgroundColor = 'green';
        welcomeText.innerHTML = 'Speak now. What would you like me to identify?';

        // AI responds (with a pause)
        setTimeout(function() {
            speak("I am now ready to identify objects. Speak the name of the object.");
        }, 1000);
    } else {
        aiButton.classList.add('listening');
        aiButton.style.backgroundColor = 'red';
        speak("Please wait while I process your request.");
        
        // Simulate AI response after a delay
        setTimeout(function() {
            speak("This is what the camera is pointing at: A book.");
            aiButton.classList.remove('listening');
            aiButton.style.backgroundColor = 'green';
        }, 2000); // Simulated response delay
    }
}

// Function for AI to speak
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.pitch = 1;
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
}

// Initial AI greeting
window.onload = function() {
    speak("Welcome! You can ask me to identify what you want now.");
};
