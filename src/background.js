// imports the date functions from your other source file
import {
    subtractMonths,
    formatDate
} from "./date-utils.js";


/**
 * Run when the extension is installed or updated.
 */
chrome.runtime.onInstalled.addListener(() => {
    console.log("YouTube History Cleaner installed.");   //Console message

    chrome.alarms.create("historyReminder", {    //create an alarm
        periodInMinutes: 60 * 24 * 30    //Monthly period
    });
});

/**
 * Run whenever the scheduled history reminder fires.
 */
chrome.alarms.onAlarm.addListener((alarm) => {  //Alarm handler = Waits for an alarm
    if (alarm.name !== "historyReminder") {
        return;
    }

    console.log("History reminder triggered.");
});

/**
 * Receive commands from popup.js.
 */
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    // Calulate a date by subtracting months.
    if (message.action === "calculateOldDate") {
        const today = new Date();

        const oldDate = subtractMonths(
            today,
            Number(message.months)
        );

        sendResponse({
            date: formatDate(oldDate)
        });

        return;
    }

    if (message.action === "openActivity") {
        // Choose the appropriate history page.
        const historyPages = {
            watch: "https://www.youtube.com/feed/history",
            search: "https://myactivity.google.com/product/youtube"
        };

        const historyType = message.historyType;
        const startDate = message.startDate;
        const endDate = message.endDate;

        const pageUrl = historyPages[historyType];

        // Reject an unknown history type.
        if (!pageUrl) {
            sendResponse({
                success: false,
                error: "Invalid history type."
            });
            return;
        }

        // Validate the date range when dates are provided.
        if (startDate !== undefined || endDate !== undefined) {
            const isValidDate = (value) => {
                if (
                    typeof value !== "string" ||
                    !/^\d{4}-\d{2}-\d{2}$/.test(value)
                ) {
                    return false;
                }

                const parsed = new Date(`${value}T00:00:00Z`);

                return (
                    !Number.isNaN(parsed.getTime()) &&
                    parsed.toISOString().slice(0, 10) === value
                );
            };

            if (
                !isValidDate(startDate) ||
                !isValidDate(endDate) ||
                startDate > endDate
            ) {
                sendResponse({
                    success: false,
                    error: "Please provide a valid start and end date."
                });
                return;
            }
        }

        // Open the selected history page.
        chrome.tabs.create({ url: pageUrl }, (tab) => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    success: false,
                    error: chrome.runtime.lastError.message
                });
                return;
            }

            sendResponse({
                success: true,
                tabId: tab.id,
                historyType: historyType,
                startDate: startDate ?? null,
                endDate: endDate ?? null
            });
        });

        // Keep the message channel open for the callback.
        return true;
    }
});
    
