const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'crystal_cms_items - Copy of Copy of Products.csv');
const rootDir = path.join(__dirname, '..');

function parseCSV(content) {
    const lines = content.split('\n');
    const result = [];
    const headers = lines[0].split(',');
    
    // Improved CSV parsing to handle quotes and commas inside quotes
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const row = [];
        let inQuotes = false;
        let currentValue = '';
        
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                row.push(currentValue.trim());
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        row.push(currentValue.trim());
        
        const obj = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = row[index] ? row[index].replace(/^"|"$/g, '') : '';
        });
        result.push(obj);
    }
    return result;
}

function calculateDiscount(mrp, offer) {
    const m = parseFloat(mrp);
    const o = parseFloat(offer);
    if (isNaN(m) || isNaN(o) || m === 0) return 0;
    return Math.round(((m - o) / m) * 100);
}

const productTemplate = (p) => {
    const discount = calculateDiscount(p['MRP'], p['Offer Selling Price (INR)']);
    const discountBadge = discount > 0 ? `<span class="discount-badge" style="background: #e63946; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.9rem; margin-left: 10px;">Save ${discount}%</span>` : '';
    
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p['Meta Title']}</title>
  <meta name="description" content="${p['Meta Description']}">
  <meta name="keywords" content="${p['Top Keywords']}">
  <meta property="og:title" content="${p['OG Title']}">
  <meta property="og:description" content="${p['OG Description']}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://destininumber.com/2-logo-dn.png">
  <meta property="og:url" content="https://destininumber.com/${p['URL Slug']}.html">
  <link rel="canonical" href="https://destininumber.com/${p['URL Slug']}.html">
  <link rel="icon" href="favicon.ico" sizes="any">
  <link rel="icon" href="2-logo-dn.png" type="image/png">

  <style>body{margin:0;font-family:"SoraLocal","Segoe UI",sans-serif}.site-header{position:sticky;top:0;z-index:40;background:rgba(11,17,41,.95)}.page-hero{padding:82px 0 78px}.hero-copy{padding:40px}</style>
  <link rel="preload" href="assets/css/fonts.css?v=20260306b" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <link rel="preload" href="assets/css/styles.css?v=20260306b" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="assets/css/fonts.css?v=20260306b"><link rel="stylesheet" href="assets/css/styles.css?v=20260306b"></noscript>
</head>
<body data-page="product-detail">
  <header class="site-header">
    <div class="container nav-wrap">
      <a class="brand" href="index.html">
        <img src="2-logo-dn.png" alt="Destini Numbers logo | देस्तिनी नंबर" width="52" height="52" decoding="async" fetchpriority="high">
        <span class="brand-title">Destini Numbers</span>
      </a>
      <button type="button" class="nav-toggle" aria-expanded="false" aria-label="Open menu">Menu</button>
      <nav class="site-nav" aria-label="Main navigation">
        <a href="index.html" data-nav="home">Home</a>
        <a href="numerology-astrology-services.html" data-nav="services">Services</a>
        <a href="spiritual-store.html" data-nav="store">Store</a>
        <a href="about-diipeshh-barara.html" data-nav="about">About</a>
        <a href="free-alignment-report.html" data-nav="tools">Tools</a>
        <a href="contact-us.html" data-nav="contact">Contact</a>
      </nav>
      <a class="nav-cta" href="https://wa.me/917269031175?text=Hello%20Destini%20Numbers%2C%20I%20want%20to%20order%20${encodeURIComponent(p['Main Label'])}." target="_blank" rel="noopener">Order on WhatsApp</a>
    </div>
  </header>

  <main>
    <section class="page-hero product-hero">
      <div class="container hero-layout">
        <article class="hero-copy surface reveal">
          <span class="kicker">${p['Category']} <span class="lang-hi">हीलिंग क्रिस्टल</span></span>
          <h1>${p['H1 Title']}</h1>
          <p class="hero-subhead">${p['Short Description']}</p>
          <p class="lang-hi hero-hindi-subhead">यह क्रिस्टल आपके ऊर्जा स्तर और जीवन पथ के अनुसार चुना गया है।</p>
          <div class="product-pricing" style="margin-bottom: 20px;">
            <span style="font-size: 0.9rem; text-decoration: line-through; color: #888;">MRP: ₹${p['MRP']}</span>
            <span style="font-size: 1.8rem; font-weight: bold; color: var(--gold); margin-left: 10px;">₹${p['Offer Selling Price (INR)']}</span>
            ${discountBadge}
          </div>
          <div class="btn-row">
            <a class="btn btn-primary" href="https://wa.me/917269031175?text=Hello%20Destini%20Numbers%2C%20I%20want%20to%20order%20${encodeURIComponent(p['Main Label'])}">Buy Now on WhatsApp</a>
            <a class="btn btn-secondary" href="free-alignment-report.html">Check My Alignment First</a>
          </div>
          <p style="margin-top: 15px; font-size: 0.85rem; color: var(--sand);">* Energetically cleansed and charged before dispatch.</p>
        </article>
        <aside class="hero-side surface reveal" style="display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 0; position: relative;">
          <img src="${p['Image Link']}" alt="${p['Image Alt Text']}" onerror="this.src='assets/img/crystal-gems.svg'" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;">
          ${discount > 0 ? `<div style="position: absolute; top: 10px; right: 10px; background: #e63946; color: white; padding: 5px 12px; font-weight: bold; border-radius: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.3); animation: pulse 2s infinite;">SPECIAL OFFER</div>` : ''}
        </aside>
      </div>
    </section>

    <section class="section reveal">
      <div class="container">
        <div class="grid grid-2">
          <article>
            <h2>Overview</h2>
            <p class="lead">${p['Impact Description']}</p>
            <div class="long-description">
                ${p['Long Description'].split('\n').map(para => `<p>${para}</p>`).join('')}
            </div>
            
            <h3>Who It Is For</h3>
            <p>Ideal for users looking for ${p['Focus Keyword']}, people doing meditation or manifestation work, and professionals seeking spiritual alignment.</p>
            
            <h3>Vedic Wisdom</h3>
            <p>According to Vedic crystal wisdom, ${p['Main Label']} is known to support ${p['Focus Keyword']} when worn consistently or used during meditation.</p>
          </article>
          <aside class="surface" style="padding: 30px;">
            <h3>Impact & Usage</h3>
            <p><strong>Impact:</strong> ${p['Impact Description']}</p>
            <p><strong>How to Use:</strong> Wear daily on the receiving hand during meditation, prayer, journaling, work, or travel. Cleanse periodically with incense, intention, or moonlight.</p>
            
            <ul class="checklist" style="margin-top: 20px;">
              <li>Focused intention support for ${p['Focus Keyword']}</li>
              <li>Handpicked crystal combination</li>
              <li>Energetically charged for you</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>

    <section class="section-tight reveal">
      <div class="container">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">Who should wear the ${p['Main Label']}?<span class="faq-symbol">+</span></button>
          <div class="faq-answer">Ideal for users looking for ${p['Focus Keyword']}, and those pursuing spiritual growth and mental clarity.</div>
        </div>
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">How do I cleanse my bracelet?<span class="faq-symbol">+</span></button>
          <div class="faq-answer">Cleanse periodically with incense smoke, placing it under moonlight, or using a Selenite charging plate.</div>
        </div>
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">Is this authentic?<span class="faq-symbol">+</span></button>
          <div class="faq-answer">Yes, all our crystals are hand-selected for quality and authenticity, then energetically cleansed before shipping.</div>
        </div>
      </div>
    </section>

    <section class="section reveal">
      <div class="container">
        <div class="cta-strip" style="background: linear-gradient(135deg, var(--ink), var(--ink-soft)); border: 1px solid var(--gold); color: white;">
          <div style="flex: 1;">
            <strong style="color: var(--gold); font-size: 1.4rem;">Order ${p['Main Label']}</strong>
            <p style="color: var(--sand);">Order now from Destini Numbers or book a personalised consultation for crystal selection based on your life path.</p>
          </div>
          <a class="btn btn-primary" href="https://wa.me/917269031175?text=Hello%20Destini%20Numbers%2C%20I%20want%20to%20order%20${encodeURIComponent(p['Main Label'])}">Message on WhatsApp</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <h3>Destini Numbers</h3>
        <p>Healing store and practical guidance for crystals, gemstones, rudraksha, puja kits, and spiritual consultations.</p>
      </div>
      <div>
        <h3>Quick Links</h3>
        <p><a href="index.html">Home</a></p>
        <p><a href="numerology-astrology-services.html">Services</a></p>
        <p><a href="spiritual-store.html">Store</a></p>
      </div>
      <div>
        <h3>Contact</h3>
        <p><a href="tel:+917269031175">+91 7269031175</a></p>
        <p><a href="mailto:destininumbers37@gmail.com">destininumbers37@gmail.com</a></p>
        <p>Lucknow, India</p>
      </div>
    </div>
    <div class="container">
      <small>Copyright 2026 Destini Numbers. All rights reserved.</small>
    </div>
  </footer>

  <script defer src="assets/js/main.js?v=20260306b"></script>
</body>
</html>`;
};

async function generate() {
    const content = fs.readFileSync(csvPath, 'utf8');
    const products = parseCSV(content);
    
    console.log(`Found ${products.length} products.`);
    
    let storeGridHtml = '';
    let storeTableHtml = '';
    
    for (const p of products) {
        if (!p['URL Slug']) continue;
        
        const html = productTemplate(p);
        const filePath = path.join(rootDir, `${p['URL Slug']}.html`);
        fs.writeFileSync(filePath, html);
        console.log(`Generated: ${p['URL Slug']}.html`);
        
        const discount = calculateDiscount(p['MRP'], p['Offer Selling Price (INR)']);
        
        // Build Store Grid Item
        storeGridHtml += `
          <article class="crystal-card">
            <div style="position: relative;">
              <img loading="lazy" decoding="async" src="${p['Image Link']}" alt="${p['Image Alt Text']}" onerror="this.src='assets/img/crystal-gems.svg'">
              ${discount > 0 ? `<span style="position: absolute; top: 10px; left: 10px; background: #e63946; color: white; padding: 2px 8px; font-size: 0.7rem; font-weight: bold; border-radius: 4px;">${discount}% OFF</span>` : ''}
            </div>
            <h3>${p['Main Label']}</h3>
            <p class="crystal-benefit">${p['Short Description']}</p>
            <div class="price-row" style="margin-bottom: 10px;">
              <span style="font-size: 0.8rem; text-decoration: line-through; color: #888;">₹${p['MRP']}</span>
              <span class="crystal-price" style="margin-left: 8px;">₹${p['Offer Selling Price (INR)']}</span>
            </div>
            <div class="btn-row" style="margin-top:10px;">
              <a class="btn btn-outline" href="${p['URL Slug']}.html" style="font-size:0.8rem; padding:8px 12px;">View Details</a>
              <a class="btn btn-primary" href="https://wa.me/917269031175?text=I%20want%20to%20order%20${encodeURIComponent(p['Main Label'])}" style="font-size:0.8rem; padding:8px 12px;">Buy Now</a>
            </div>
          </article>`;
          
        // Build Store Table Row
        storeTableHtml += `
          <tr>
            <td style="padding: 12px; border: 1px solid var(--border-color);"><strong>${p['Main Label']}</strong></td>
            <td style="padding: 12px; border: 1px solid var(--border-color);">${p['Short Description']}</td>
            <td style="padding: 12px; border: 1px solid var(--border-color);">
              <span style="text-decoration: line-through; color: #888; font-size: 0.8rem;">₹${p['MRP']}</span><br>
              <strong>₹${p['Offer Selling Price (INR)']}</strong>
            </td>
            <td style="padding: 12px; border: 1px solid var(--border-color);"><a href="${p['URL Slug']}.html" class="btn btn-outline" style="font-size:0.7rem; padding:5px 10px;">Details</a></td>
            <td style="padding: 12px; border: 1px solid var(--border-color);"><a href="https://wa.me/917269031175?text=I%20want%20to%20order%20${encodeURIComponent(p['Main Label'])}" class="btn btn-primary" style="font-size:0.7rem; padding:5px 10px;">Order</a></td>
          </tr>`;
    }
    
    // Update spiritual-store.html
    const storePath = path.join(rootDir, 'spiritual-store.html');
    let storeContent = fs.readFileSync(storePath, 'utf8');
    
    // Replace grid
    const gridStartMarker = '<!-- GRID_START -->';
    const gridEndMarker = '<!-- GRID_END -->';
    const gridRegex = new RegExp(`${gridStartMarker}[\\s\\S]*?${gridEndMarker}`);
    storeContent = storeContent.replace(gridRegex, `${gridStartMarker}\n        <div class="crystal-grid">${storeGridHtml}</div>\n        ${gridEndMarker}`);
    
    // Replace table body
    const tableStartMarker = '<!-- TABLE_START -->';
    const tableEndMarker = '<!-- TABLE_END -->';
    const tableRegex = new RegExp(`${tableStartMarker}[\\s\\S]*?${tableEndMarker}`);
    storeContent = storeContent.replace(tableRegex, `${tableStartMarker}\n            <tbody>${storeTableHtml}</tbody>\n            ${tableEndMarker}`);
    
    fs.writeFileSync(storePath, storeContent);
    console.log('Updated spiritual-store.html');

    // Cleanup old files
    const allFiles = fs.readdirSync(rootDir);
    const validSlugs = new Set(products.map(p => p['URL Slug']).filter(Boolean));
    
    allFiles.forEach(file => {
        if (file.endsWith('-crystal-bracelet-combo.html')) {
            fs.unlinkSync(path.join(rootDir, file));
            console.log(`Deleted old file: ${file}`);
        }
        if (file === "{p['URL Slug']}.html") {
            fs.unlinkSync(path.join(rootDir, file));
            console.log(`Deleted template file: ${file}`);
        }
    });
}

generate().catch(console.error);
