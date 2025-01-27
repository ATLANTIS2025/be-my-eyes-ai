// For the Intro Page
if (window.location.pathname.includes("index.html")) {
    document.getElementById("sign-in-button").onclick = function() {
        window.location.href = "sign-in.html"; // Navigate to the sign-in page
    };

    document.getElementById("sign-up-button").onclick = function() {
        window.location.href = "sign-up.html"; // Navigate to the sign-up page
    };
}

// For the Sign In Page
if (window.location.pathname.includes("sign-in.html")) {
    document.getElementById("sign-in-form").onsubmit = function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email && password) {
            // Dummy check for email and password (Replace with your real validation logic)
            if (email === "test@example.com" && password === "password123") {
                // Redirect to the main page
                window.location.href = "main.html"; // Make sure to change this to the actual file path
            } else {
                alert("Invalid credentials, please try again.");
            }
        } else {
            alert("Please enter both email and password.");
        }
    };
}

// For the Sign Up Page
if (window.location.pathname.includes("sign-up.html")) {
    document.getElementById("sign-up-form").onsubmit = function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email && password) {
            // Dummy sign-up process (Replace with your actual sign-up logic)
            alert("Account created successfully! Please sign in.");
            window.location.href = "sign-in.html"; // Redirect to the Sign In page
        } else {
            alert("Please fill in all fields.");
        }
    };
}

// For the Main Page (AI and Camera Interaction)
if (window.location.pathname.includes("main.html")) {
    // Set up camera access
    let aiButton = document.getElementById("ai-button");
    let welcomeText = document.getElementById("welcome-text");

    // Load the COCO-SSD model for object recognition
    let model;
    cocoSsd.load().then((loadedModel) => {
        model = loadedModel;
        console.log("Model loaded successfully");
    });

    // Function to toggle between AI listening and speaking
    function toggleAI() {
        if (aiButton.classList.contains("green")) {
            aiButton.classList.remove("green");
            aiButton.classList.add("red");
            aiButton.textContent = "Listening...";
            welcomeText.textContent = "AI is identifying the object... Please wait.";
            speakText("Please wait, I am identifying the object.");
            // Start the object recognition
            recognizeObject();
        } else {
            aiButton.classList.remove("red");
            aiButton.classList.add("green");
            aiButton.textContent = "Speak Now";
            welcomeText.textContent = "You can now speak to the AI.";
            speakText("You can now speak to the AI.");
        }
    }

    // Function to speak the text using the SpeechSynthesis API
    function speakText(text) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;  // Adjust speed
        utterance.pitch = 1;  // Adjust pitch
        utterance.volume = 1;  // Adjust volume
        window.speechSynthesis.speak(utterance);
    }

    // Function to recognize objects from the camera stream
    async function recognizeObject() {
        const video = document.getElementById("video");

        // Use the model to detect objects in the current frame
        const predictions = await model.detect(video);

        if (predictions.length > 0) {
            let object = predictions[0].class;
            welcomeText.textContent = This is a ${object}.;
            speakText(This is a ${object}. You can speak now.); // AI speaks the object name
        } else {
            welcomeText.textContent = "No objects detected, please try again.";
            speakText("No objects detected, please try again.");
        }

        // Once object recognition is complete, change the button back to green
        aiButton.classList.remove("red");
        aiButton.classList.add("green");
        aiButton.textContent = "Speak Now";
    }

    // Initialize the camera for object recognition
    function startCamera() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                let video = document.getElementById("video");
                video.srcObject = stream;
                video.play();
            })
            .catch(function (error) {
                console.error("Error accessing the camera: ", error);
            });
    }

    // Initialize the camera when the page is loaded
    window.onload = function () {
        startCamera();
    };

    // Handle AI button click
    aiButton.onclick = toggleAI;
}
