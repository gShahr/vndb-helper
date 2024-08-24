// ==UserScript==
// @name         vndb-helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Browse files via images
// @author       You
// @match        https://vndb.org/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Wait for the DOM to be fully loaded
    window.addEventListener('load', function() {
        // Select all <a> elements on the page
        const links = document.querySelectorAll('a');
        
        // Extract the href attribute from each <a> element
        const hrefs = Array.from(links).map(link => link.href);
        
        // Log the collected hyperlinks to the console
        console.log(hrefs);
        
        // Optionally, you can perform other actions with the hrefs array
        // For example, save the links to a file using FileSaver.js
        const blob = new Blob([hrefs.join('\n')], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'hyperlinks.txt');
    });
})();