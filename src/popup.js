// Check API status
async function checkAPI() {
    try {
        const response = await fetch("http://127.0.0.1:5000/status");
        setAPIStatus(response.ok);
    } catch (error) {
        setAPIStatus(false);
    }
}

function setAPIStatus(isOnline) {
    const apiStatus = document.getElementById("apiStatus");
    apiStatus.classList.toggle("online", isOnline);
    apiStatus.classList.toggle("offline", !isOnline);
}

setInterval(checkAPI, 5000);
checkAPI();

// Summarization
document.getElementById("summarizeBtn").addEventListener("click", function() {
    const userInput = document.getElementById("inputText").value.trim();
    if (userInput) {
        fetch("http://127.0.0.1:5000/summarize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: userInput })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("summaryText").textContent = data.summary;
            document.getElementById("inputPage").style.display = "none";
            document.getElementById("outputPage").style.display = "block";
        })
        .catch(error => console.error("Error:", error));
    }
});

// Back
document.getElementById("backBtn").addEventListener("click", function() {
    document.getElementById("inputPage").style.display = "block";
    document.getElementById("outputPage").style.display = "none";
});
