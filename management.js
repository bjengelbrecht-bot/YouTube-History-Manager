
/**
 * Read the selected date range from the page URL.
 */
const pageParameters = new URLSearchParams(
    window.location.search
);

/**
 * Retrieve the selected history type and dates.
 */
const historyType = pageParameters.get("historyType");
const startDate = pageParameters.get("startDate");
const endDate = pageParameters.get("endDate");

/**
 * Find the HTML elements used to display the information.
 */
const historyTypeDisplay =
    document.getElementById("historyType");

const startDateDisplay =
    document.getElementById("startDate");

const endDateDisplay =
    document.getElementById("endDate");

const openOfficialPageButton =
    document.getElementById("openOfficialPage");

const statusMessage =
    document.getElementById("statusMessage");

/**
 * Define the official activity pages.
 */
const activityPages = {
    watch: "https://www.youtube.com/feed/history",
    search: "https://myactivity.google.com/product/youtube"
};

/**
 * Display the selected history type and date range.
 */
function displaySelectedRange() {
    if (
        !activityPages[historyType] ||
        !startDate ||
        !endDate ||
        startDate > endDate
    ) {
        historyTypeDisplay.textContent = "Invalid selection";
        startDateDisplay.textContent = "Not available";
        endDateDisplay.textContent = "Not available";

        statusMessage.textContent =
            "The selected date range is missing or invalid.";

        openOfficialPageButton.disabled = true;
        return;
    }

    historyTypeDisplay.textContent =
        historyType === "watch"
            ? "Watch History"
            : "Search History";

    startDateDisplay.textContent = startDate;
    endDateDisplay.textContent = endDate;
}

/**
 * Open the official page for the selected history type.
 */
function openOfficialActivityPage() {
    const pageUrl = activityPages[historyType];

    if (!pageUrl) {
        statusMessage.textContent =
            "The selected history page is unavailable.";
        return;
    }

    chrome.tabs.create(
        { url: pageUrl },
        () => {
            if (chrome.runtime.lastError) {
                statusMessage.textContent =
                    "Could not open the activity page.";

                console.error(
                    chrome.runtime.lastError.message
                );

                return;
            }
            
            statusMessage.textContent =
                "Activity page opened. Review your selected dates manually.";
        }
    );            
}

/**
 * Connect the button to the activity page function.
 */
openOfficialPageButton.addEventListener(
    "click",
    openOfficialActivityPage
);

/**
 * Display the selected date range when the page loads.
 */
displaySelectedRange();
