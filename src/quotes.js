'use strict';

async function fetchRandomQuoteAsync() {
    try {

        let response = await fetch('https://api.quotable.io/random');
        let data = await response.json();
        return data;

    } catch(error) {
        console.error(error);
        return error;
    }
}
