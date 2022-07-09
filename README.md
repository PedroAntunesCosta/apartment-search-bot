# Apartment search bot

Google app script I created to get the most recent apartments listed for sale in dfimoveis.com.br, a real estate website from Brasília.

## What it does

This bot daily registers the block, link and search date for every apartment on the search that satisfies these conditions:
- Is on one of the selected city blocks.
- Is in Asa sul.
- Has two or three bedrooms (native search filter from the website).
- Contains the word "vazado" in its description.
- Is not yet on the list.

There are more native search filters that can be used by editing the search URL.

## Implementation

To implement it, follow these steps:
1. Create a new spreadsheet in google drive.
2. Go to `Extensions` > `Apps Script`.
3. This will open a new app script project in a new tab. Create the files there and copy my code.
4. Run the `trigger.gs` function in order for the daily trigger to be created.

> Learn more about [Google Apps script](https://www.google.com/script/start/)
