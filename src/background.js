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
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
     if (message.action === "calculateOldDate") {
        const today = new Date();

        const oldDate = subtractMonths(
            today,
            Number(message.months)
        );

        sendResponse({
            date: formatDate(oldDate)
        });
     }

     if (message.action === "openActivity") {
        chrome.tabs.create({
            url: "https://myactivity.google.com/product/youtube"
        });

        sendResponse({
            success: true
        });
     }

     return true;
});