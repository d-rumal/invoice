import puppeteer from 'puppeteer';

const makePDF = async (id) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/invoice/makePDF/' + id, { waitUntil: 'networkidle0' });
    await page.pdf({ format: 'A4', path: 'public/pdfs/' + id + '.pdf' })
    await browser.close();
}

export default makePDF;