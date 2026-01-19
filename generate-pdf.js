const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Helper function to create PDF
async function createPDF(htmlFile, outputFile) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const html = fs.readFileSync(htmlFile, 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 0 });
  await page.pdf({ path: outputFile, format: 'A4' });
  await browser.close();
  console.log(`✅ PDF created: ${outputFile}`);
}

// Helper function to create PNG thumbnail
async function createPNG(htmlFile, outputFile) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const html = fs.readFileSync(htmlFile, 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 0 });
  await page.screenshot({ path: outputFile });
  await browser.close();
  console.log(`✅ PNG created: ${outputFile}`);
}

// Array of templates
const templates = [
  { html: 'template1.html', pdf: 'assets/templates/template1.pdf', png: 'assets/images/template1.png' },
  { html: 'template2.html', pdf: 'assets/templates/template2.pdf', png: 'assets/images/template2.png' },
  { html: 'template3.html', pdf: 'assets/templates/template3.pdf', png: 'assets/images/template3.png' }
];

// Run all templates
(async () => {
  for (const t of templates) {
    const htmlPath = path.join(__dirname, t.html);
    const pdfPath = path.join(__dirname, t.pdf);
    const pngPath = path.join(__dirname, t.png);

    await createPDF(htmlPath, pdfPath);
    await createPNG(htmlPath, pngPath);
  }
  console.log('🎉 All PDFs and PNGs generated successfully!');
})();
