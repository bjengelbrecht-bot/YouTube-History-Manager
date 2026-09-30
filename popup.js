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

const searchHistoryButton =
    document.getElementById("searchHistoryButton");

const statusMessage =
    document.getElementById("status");   // fix code


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
 * Open the YouTube activity page.
 */
openActivityButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({
        action: "openActivity"
    });

    statusMessage.textContent = 
        "YouTube activity page opened.";
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

    if (!startDate || !endDate) {
        statusMessage.textContent = 
            "Please select both dates.";

        return;
    }

    if (startDate > endDate) {
        statusMessage.textContent = 
            "The start date must be before the end date.";

        return;
    }

    chrome.runtime.sendMessage({
        action: "openActivity"
    });

    statusMessage.textContent = 
        `Review activity from ${startDate} to ${endDate}.`;
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