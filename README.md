# A birthday surprise

A responsive, dependency-free HTML/CSS/JavaScript birthday page with an animated gift, confetti, photo scrapbook, personal letter, and a candle to blow out.

## Add your photos

Upload `1.jpg`, `2.jpg`, `3.jpg`, etc. to the repository root, alongside `index.html`. Use lowercase `.jpg`. The gallery checks up to 20 photos and skips missing ones, including gaps. Increase `photoCount` in `script.js` for more photos. The birthday experience works even before photos are uploaded.

## Personalize

Edit `CONFIG` at the top of `script.js` to set your sister's name, sender, photo count, and captions. Edit the letter in `index.html` to add your own message.

## Open or share

Open `index.html` directly in a modern browser. To share a link, enable GitHub Pages in repository Settings → Pages → Deploy from a branch → main → / (root). GitHub shows the published URL after deployment. This repository is public, so uploaded photos are public too.

The original journal page is preserved at `journal.html`.

Keyboard controls, native photo dialogs, and reduced-motion preferences are supported. No external scripts, fonts, analytics, or build step are required.
