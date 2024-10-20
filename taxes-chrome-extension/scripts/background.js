chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.text) {
    const selectedWord = request.text;

    // Make an API call to Groq with the selected word
    fetch("http://localhost:3000/get-meaning", {
      // Your FastAPI backend URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word: selectedWord }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Send the result back to the popup or content script
        chrome.runtime.sendMessage({ meaning: data.meaning });
      })
      .catch((error) => console.error("Error fetching word meaning:", error));
  }
});
