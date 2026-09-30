# YouTube-History-Manager

## Description

YouTube-History-Manager is a Chrome Manifest V3 extension
designed to help users manage YouTube watch and search
history using date and month-based controls.

The extension allows the user to calculate older dates, select history ranges and 
access the appropriate YouTube/Google activity management pages.

## Features

- Calculate history dates by months.
- Custom date range selection. 
- YouTube history management. 
- YouTube search history management.
- Select older and newer date ranges.
- Validate date ranges before processing.
- Use a background service worker.
- Scheduled reminders.
- Confirmation before destructive actions.
- Store the project using Git and GitHub.

## Technologies

- HTML
- CSS
- JavaScript
- Chrome Extensions Manifest V3
- Chrome Scripting API
- Chrome ALarms API
- Node.js
- npm
- Vitest
- Git 
- GitHub


## Project Structure

YouTube-History-Manager/
- manifest.json
- popup.html
- popup.css
- popup.js
- package.json
- README.md
- LICENSE
- .gitignore

- src/
    - background.js
    - date-utils.js

tests/
    - date-utils.test.js



## Installation

Requirements before complete installation:
- make sure the following are installed:
    - Google Chrome
    - Visual Studio Code
    - Node.js
    - npm
    - Git


1. Download or clone the repository.
    - Open a terminal and run:

    - git clone https://github.com/YOUR-USERNAME/YouTube-History-Manager.git

    - Replace YOUR-USERNAME with your GitHub username.

    - Enter the project folder:
        - cd YouTube-History-Manager

    Install the project dependencies:
        - npm install

2. Open Chrome.
3. Navigate to chrome://extensions.
4. Enable Developer mode.
5. Select Load unpacked.
6. Select the project folder.
7. The extension should appear in the Chrome extensions list.
8. Test the extension using the available date and history-management features.



# Testing

The project includes unit tests for individual date utility functions.

Testing includes:

- Subtracting one month.
- Subtracting multiple months.
- Subtracting twelve months.
- Zero months.
- Invalid month values.
- Invalid dates.
- End-of-month dates.
- Leap-year dates.
- Date formatting.
- Valid date ranges.
- Invalid or reversed date ranges.



# GitHub Commit History

The project is developed using multiple meaningful Git commits.

The final repository contains at least five commits after the initial commit. Each commit describes a completed development task.

Commit examples include:

1. Add date utility functions
2. Add Chrome extension popup interface
3. Add unit tests
4. Fix date edge cases
5. Complete extension testing
6. Update project documentation

## Permissions

The extension uses in manifestV3:

- alarms
- scripting
- storage



## Limitations

The extension does not request or store Google passwords.
Google account activity remains controlled by Google's
authentication and activity-management pages.

## Licence

MIT License.


# Author

Student software engineering project.