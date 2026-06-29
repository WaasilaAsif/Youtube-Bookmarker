chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const targetUrl = changeInfo.url || tab.url;

    // if (changeInfo.url && tab.url && tab.url.includes("youtube.com/watch")){
    //  if (changeInfo.url && changeInfo.url.includes("youtube.com/watch")) {
    if (targetUrl && targetUrl.includes("youtube.com/watch")){
        const urlParameters = new URL(targetUrl);
        console.log(urlParameters);
        const videoId = urlParameters.searchParams.get("v");
        if (videoId){
            console.log("found video id : " , videoId);
        }
        if (chrome.runtime.lastError) {
                    console.log("Content script not injected yet. Waiting for tab.");
                    return; 
                }

                // If content script responds successfully, dispatch the actual message
                chrome.tabs.sendMessage(tabId, {
                    type: "NEW",
                    videoId: videoId
                });
    }   
});