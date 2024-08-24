import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import open from 'open';

global.DOMParser = new JSDOM().window.DOMParser;

async function processURL(url, imgSrcs) {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        console.log(`Processing ${url}`);
        console.log(`Processing ${url}`);
        const imgElements = doc.querySelectorAll('img');
        console.log(`Found ${imgElements.length} images on ${url}`);
        
        if (imgElements.length > 0) {
            const firstImgSrc = imgElements[0].src;
            console.log(`First image found on ${url}: ${firstImgSrc}`);
            // Open the image URL in the default web browser
            await open(firstImgSrc);
        } else {
            console.log(`No images found on ${url}`);
        }
    } catch (error) {
        console.error(`Failed to process ${url}:`, error);
    }
}

async function createHTMLFile(imgSrcs) {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Images from VNDB</title>
        </head>
        <body>
            ${imgSrcs.map(src => `<img src="${src}" alt="Image">`).join('')}
        </body>
        </html>
    `;
    const htmlFilePath = path.join(__dirname, 'imageViewer.html');
    fs.writeFileSync(htmlFilePath, htmlContent);

    // Open the HTML file in the default web browser
    await open(htmlFilePath);
}

(async () => {
    const imgSrcs = [];
    for (let i = 1; i <= 2; i++) {
        const url = `https://vndb.org/v${i}`;
        await processURL(url, imgSrcs);
    }
    await createHTMLFile(imgSrcs);
})();