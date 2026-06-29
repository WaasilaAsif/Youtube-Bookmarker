(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";

    const newVideoLoaded = () => {
        console.log("Setting up bookmark button for video:", currentVideo);
        // Your logic to inject the button goes here
    };

    chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
        const { type, videoId } = obj;

        // 1. Respond to the background script's health check (PING)
        if (type === "PING") {
            sendResponse({ status: "alive" });
            return true; // Keeps the message channel open for async response
        }

        // 2. Handle the actual NEW video message
        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
            sendResponse({ status: "loaded" });
            return true;
        }
    });
})(); // <-- Added the missing () here to actually run the script!
