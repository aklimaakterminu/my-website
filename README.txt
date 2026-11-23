AKLIMA AKTER MINU — PORTFOLIO WEBSITE
How to put it online (no coding needed)
=====================================================

WHAT'S IN THIS FOLDER
  index.html      the website itself
  css/            the design
  js/main.js      the animations
  js/config.js    YOUR DETAILS (email, LinkedIn, WhatsApp, project links) — edit this one
  img/            your photos, the favicon and the social-sharing picture
  img/work/       screenshots of your three websites and your Hirespan posts

The site is plain files. There is nothing to install, build or run.
Keep the folders exactly as they are. If index.html is separated from the css, js
and img folders, the site will look broken.


STEP 1 — BUY A DOMAIN
  Any registrar works (Namecheap, Spaceship, GoDaddy, Cloudflare...).
  Something like  aklimaakterminu.com  or  hireminu.com  looks professional.
  Prefer .com. Pick a name that is easy to say out loud.


STEP 2 — PUT THE SITE ONLINE (choose ONE option)

  OPTION A — Paid hosting with cPanel (what most "buy hosting" plans give you)
    1. Log in to your hosting account and open "File Manager".
    2. Open the folder called  public_html  (sometimes  www  or  htdocs).
    3. Delete any placeholder file there (for example "default.html" or "index.php").
    4. Upload the CONTENTS of this folder: index.html, css, js and img.
       Tip: upload portfolio.zip, then right-click it and choose "Extract".
       Make sure index.html ends up directly inside public_html, not inside
       another folder.
    5. Point your domain to the hosting (your host will tell you the nameservers;
       paste them into your domain registrar). This can take up to a few hours.
    6. In your hosting panel, switch on the free SSL certificate (the padlock,
       "https"). Most hosts call it "Let's Encrypt" or "AutoSSL".

  OPTION B — Free hosting (works just as well for a site like this)
    Netlify Drop:   go to app.netlify.com/drop and drag this whole folder onto the page.
                    You get a free link right away, and you can add your domain
                    in Site settings > Domain management.
    Cloudflare Pages or GitHub Pages also work and are free.


STEP 3 — PUT YOUR DETAILS IN  js/config.js
  Open js/config.js in Notepad (or any text editor), change the values between
  the quote marks, save, and upload the file again.
    email      where messages should go
    linkedin   your profile link
    whatsapp   digits only with country code, no + sign. Example: 8801712345678
               Leave '' to hide WhatsApp.
    nexusUrl     the address of the Nexus Abroad website
    miroraUrl    the address of Mirora BD
    resume       optional. Make a folder called  resume  next to index.html, put your
               PDF in it, and write its path here, for example
               'resume/Aklima-Akter-Minu-Resume.pdf'. A "Download my resume" link
               then appears in the contact section.
    hirespanUrl  the address of Hirespan
               These make the "Visit" links in the Projects section work.
               Leave one as '' to hide its link.


STEP 4 — FINAL POLISH (after your domain works)
  In index.html, find these two lines near the top:
      <meta property="og:image" content="img/og.jpg">
      <meta name="twitter:image" content="img/og.jpg">
  Change  img/og.jpg  to your full address, for example:
      https://www.yourdomain.com/img/og.jpg
  This makes the preview picture appear when you share your link on LinkedIn,
  WhatsApp or Facebook. If a platform shows an old preview, paste your link into
  its debugger tool (for example LinkedIn Post Inspector) to refresh it.


HOW THE CONTACT FORM WORKS
  When someone presses "Send message", it opens THEIR email app with your address,
  a subject and their message already filled in. This needs no server, so it
  works on any hosting. The downside: if a visitor has no email app set up,
  nothing opens. That is why your email address and LinkedIn also sit next to
  the form. If you later want messages to arrive directly in your inbox, a free
  form service such as Formspree can be connected.


EDITING THE WORDS
  Open index.html in Notepad and search (Ctrl+F) for the sentence you want to change.
  Only change the words, not anything inside < > brackets.
  Keep a copy of the original file before you edit.


THINGS TO CHECK BEFORE YOU SHARE IT
  * Dates and job titles on the Experience section are correct.
  * The Hirespan results: two test ads, about RM59 in total, 9 WhatsApp conversations, 2 sales at RM45. When the real numbers grow, update the "Traction" line, the story "The result" line, the glance strip and the sales proof line in index.html (search for RM59).
  * The Transfotech stories do not show any numbers, as you asked.


GOOD TO KNOW
  * The fonts (Tinos, a Times New Roman look-alike, for headings; Instrument Sans for text) load from Google Fonts,
    so visitors need an internet connection, which they will have anyway.
  * The opening animation plays each time the page opens. People who have "reduce motion"
    switched on in their phone or computer will see the site without the animations.
  * Every photo and file is yours. Nothing is hosted by anyone else.


UPDATING THE PROJECT PREVIEWS AND POSTS
  The website pictures in the Projects section and the post pictures in the
  Content section are normal image files in  img/work/ .
  To refresh one (for example after Nexus Abroad's next update), save a new
  screenshot with the SAME file name and the same shape, then upload it over the
  old one:
      nexus-home.webp, nexus-tools.webp, nexus-countries.webp, nexus-guides.webp, nexus-mobile.webp
      mirora-home.webp, mirora-shop.webp, mirora-how.webp, mirora-mobile.webp
      hirespan-home.webp, hirespan-resumes.webp, hirespan-business.webp, hirespan-mobile.webp
      post-01.webp to post-09.webp  (the Hirespan Instagram posts)
  The "mobile" pictures are phone screenshots (tall); the others are laptop-width.
  Your numbers (for example "42 pages" for Nexus Abroad) are plain words in index.html;
  search for them with Ctrl+F and change them when the websites grow.

