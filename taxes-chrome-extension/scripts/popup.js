chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.meaning) {
      // Update the message container with the meaning
      document.getElementById('word-meaning').textContent = request.meaning;
    }
  });
  