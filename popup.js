/**
 * Find important controls from the popup.
 * Intergrat with popup - HTML.
 */
const monthsInput = document.getElementById("months");

const calculateButton = 
    document.getElementById("calculateButton");

const calculateDate = 
    document.getElementById("calculateDate");

const openActivityButton =
    document.getElementById("openActivityButton");

const rangeButton =
    document.getElementById("rangeButton");

const watchHistoryButton = 
    document.getElementById("watchHistory");

const searchHistoryButton =
    document.getElementById("searchHistoryButton");

const statusMessage =
    document.getElementById("status");   // fix code



/**
 * Find the Custom Date Range history-type selector
 * and the element that displays the selected dates.
 */
const historyTypeInput = 
    document.getElementById("historyType");

const selectedDateRange =
    document.getElementById("selectedDateRange");




/**
 * Calculate the date that is a number of months
 * before today
 */
calculateButton.addEventListener("click", () => {
    const months = Number(monthsInput.value);

    if (!Number.isInteger(months) || months < 1) {
        statusMessage.textContent = 
            "Please enter a valid number of months.";

        return;
    }

    chrome.runtime.sendMessage(
        {
            action: "calculateOldDate",
            months: months
        },
        (response) => {
            calculateDate.textContent = 
                `History before ${response.date} is eligible for review.`;

            statusMessage.textContent = 
                "Date calculated successfully.";
        }
    );
});

/**
 * Open a history page by sending the selected history type
 * to the background service worker.
 */
function openHistoryPage(historyType) {
    chrome.runtime.sendMessage(
        {
            action: "openActivity",
            historyType: historyType
        },
        (response) => {
            if (chrome.runtime.lastError) {
                statusMessage.textContent =
                    "Could not open the history page. Reload the extension and try again.";
                console.error(chrome.runtime.lastError.message);
                return;
            }

            if (response && response.success) {
                statusMessage.textContent =
                    historyType === "watch"
                        ? "YouTube Watch History page opened."
                        : "YouTube Search History page opened.";
            } else {
                statusMessage.textContent =
                    "Could not open the history page.";
            }
        }
    );
}

/**
 * Open YouTube Watch History.
 */
watchHistoryButton.addEventListener("click", () => {
    openHistoryPage("watch");
});

/**
 * Open YouTube Search History.
 */
searchHistoryButton.addEventListener("click", () => {
    openHistoryPage("search");
});

/**
 * Open the history page selected in the Custom Date Range dropdown.
 */
openActivityButton.addEventListener("click", () => {
    const historyType =
        document.getElementById("historyType").value;

    openHistoryPage(historyType);
});


/**
 * Open the YouTube activity page for
 * custom date-range management.
 */
rangeButton.addEventListener("click", () => {
    const startDate = 
        document.getElementById("startDate").value;

    const endDate = 
        document.getElementById("endDate").value;

    const historyType = historyTypeInput.value;

    // Check that both dates have been selected.
    if (!startDate || !endDate) {
        statusMessage.textContent =
            "Please select both dates.";
        return;
    }

    // Check that the date range is valid.
    if (startDate > endDate) {
        statusMessage.textContent = 
            "The start date must be on or before the end date.";
        return;
    }

    // Prepare a readable history type.
    const historyLabel =
        historyType === "watch"
            ? "Watch History"
            : "Search History";

    // Display the selected dates and history type.
    selectedDateRange.textContent =
        `${historyLabel}: ${startDate} to ${endDate}`;

    // Send the selection to the background service worker.
    chrome.runtime.sendMessage({
        action: "openActivity",
        historyType: historyType,
        startDate: startDate,
        endDate: endDate
    }, (response) => {
        if (chrome.runtime.lastError) {
            statusMessage.textContent =
                "Could not open the history page. Please reload the extension.";
            return;
        }

        if (response && response.success) {
            statusMessage.textContent =
                `Opening ${historyLabel} for ${startDate} to ${endDate}.`;
        } else {
            statusMessage.textContent =
                "The history page could not be opened.";
        }
    });
});


/**
 * Open YouTube history management Watch history.
 */
watchHistoryButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({
        action: "openActivity"
    });

  statusMessage.textContent =
    "Open YouTube activity and select watch history.";
});



/**
 * Open YouTube history management for search history.
 */
searchHistoryButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({
        action: "openActivity"
    });

    statusMessage.textContent = 
    "Open YouTube activity and select search history.";
});






/**
 * Toggle between normal and inverted popup colours.
 */
const invertColorsButton =
    document.getElementById("invertColorsButton");

invertColorsButton.addEventListener("click", () => {
    const isInverted =
        document.body.classList.toggle("inverted-colors");

    invertColorsButton.setAttribute(
        "aria-pressed",
        String(isInverted)
    );

    invertColorsButton.innerHTML = isInverted
        ? '<span aria-hidden="true">◑</span> Restore Colours'
        : '<span aria-hidden="true">◐</span> Invert Colours';
});