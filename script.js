document.addEventListener('DOMContentLoaded', function () {
    const splashScreen = document.getElementById('splash-screen');
    const mainPage = document.getElementById('main-page');

    // Check localStorage for the splash screen flag
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');

    if (!hasSeenSplash) {
        // Show splash screen only for the first time
        splashScreen.style.display = 'block';
        mainPage.style.display = 'none';

        // Set flag immediately to ensure no re-show on refresh
        localStorage.setItem('hasSeenSplash', 'true');

        setTimeout(function () {
            splashScreen.style.display = 'none';
            mainPage.style.display = 'block';
        }, 3000); // 3 seconds
    } else {
        // Directly show the main page if splash already seen
        splashScreen.style.display = 'none';
        mainPage.style.display = 'block';
    }

    // Function to open detail pages
    window.openDetailPage = function (page) {
        window.location.href = page; // Navigate to the specified file
    };

    // Botpress iframe resizing logic
    const chatFrame = document.getElementById('chat-frame');
    function resizeChatFrame() {
        // Adjust the height of the iframe based on the window size
        if (chatFrame) {
            chatFrame.style.height = `${window.innerHeight - 100}px`;
        }
    }

    // Add an event listener to handle window resizing
    window.addEventListener('resize', resizeChatFrame);

    // Initial resizing
    resizeChatFrame();

    // Ensure links open in PDF viewer
    document.addEventListener('click', function (event) {
        if (event.target.tagName === 'A' && event.target.href) {
            event.preventDefault(); // Prevent default browser behavior
            const targetURL = event.target.href;
            window.location.href = `PDFVIEWER.html?file=${encodeURIComponent(targetURL)}`;
        }
    });
});
