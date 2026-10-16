<div align="center">

# OMNIS

### Your documents have more to say to each other.

**A workspace for finding the useful threads hidden across your files.**

[Features](#-what-works-today) · [Run locally](#-get-it-running) · [Roadmap](#-where-its-going)

<br>

![Status: early prototype](https://img.shields.io/badge/status-early%20prototype-6D8196?style=for-the-badge)
![Built with: HTML, CSS, JavaScript](https://img.shields.io/badge/built%20with-HTML%20%2F%20CSS%20%2F%20JavaScript-4A4A4A?style=for-the-badge)
![License: not set](https://img.shields.io/badge/license-not%20set-CBCBCB?style=for-the-badge)

</div>

---

## ✳ The idea

Point OMNIS at a collection of documents and start exploring what’s inside: find a useful line, follow a connection, or notice a deadline that deserves another look.

OMNIS is being built for people whose information is everywhere—and who need more than another search box.

> **Right now:** OMNIS is an early prototype. It searches prepared Markdown files and text files, and can extract text from uploaded PDFs. Search results are keyword matches, not AI-generated answers.

## ◉ What works today

- **Search prepared notes** — find matching lines across Markdown documents.
- **Bring in files** — add `.md`, `.txt`, and text-based `.pdf` files in the browser.
- **Follow a source** — see the document and matching line behind a result.
- **Explore the map** — select a sample graph node to explore its connections.
- **Spot a loose end** — review sample deadline and date-conflict prompts.
- **Settle in** — use the responsive interface and Ink Wash color palette.

## ↗ Get it running

### You’ll need

- A modern web browser
- [Node.js and npm](https://nodejs.org/)
- An internet connection to load the PDF.js library and web fonts

### Start OMNIS locally

```bash
git clone https://github.com/YOUR-USERNAME/OMNIS.git
cd OMNIS
npx serve .
```

If prompted, allow `npx` to install `serve`. Open the local address printed in your terminal, usually:

```text
http://localhost:3000
```

Keep the terminal running while you use OMNIS.

### Add your own prepared notes

The prototype looks for these files in `Documents/`:

```text
Documents/
├── project-notes.md
├── meeting-notes.md
└── research.md
```

To use different names, update the `names` list in `app.js`. Keep the folder name exactly `Documents`.

## ◈ What happens when you search

OMNIS splits document text into lines, checks which query words appear in each line, and ranks the matches. The strongest match appears with a link to its source document.

That means search works best with words likely to appear in your files. It is not semantic search, and it does not yet generate answers or combine evidence from multiple documents.

## ▤ File support

| File type | Current behavior |
|---|---|
| Markdown (`.md`) | Prepared files load from `Documents/`; uploaded files can be searched during the current session. |
| Text (`.txt`) | Uploaded and searched during the current session. |
| PDF (`.pdf`) | PDF.js extracts selectable text in the browser. Scanned, image-only PDFs are not searchable yet. |
| DOCX and spreadsheets | Not supported yet. |

Uploaded text stays in browser memory and is cleared when the page is refreshed.

## ⌘ Project map

```text
OMNIS/
├── Documents/       # Prepared Markdown source files
├── Index.Html       # Main interface
├── style.css        # Layout, palette, and animation
├── app.js           # Browser interactions, upload, and search
├── package.json     # Project metadata
└── README.md
```

## ◌ Privacy, for this prototype

Uploaded files are read by your browser and are not sent to an OMNIS backend. Prepared files are served by your local development server. PDF.js and web fonts are loaded from external services.

There is no account system, backend, or persistent file storage yet. **Use sample or non-confidential documents only.**

## ✦ Where it’s going

- Return several useful passages instead of only one matching line.
- Keep uploaded files and extracted text between sessions.
- Add better page-level citations for PDFs and OCR for scans.
- Read DOCX documents and spreadsheets.
- Build graph connections from actual document content.
- Surface possible deadlines and conflicting claims with evidence.
- Add grounded AI answers that cite the passages they use.
- Evaluate answer quality, citation accuracy, privacy, and security before broader use.

## Contributing

OMNIS is a work in progress. Ideas, bug reports, and pull requests are welcome. Please include what changed and how someone can try it.

## License

No license has been selected yet. Until one is added, all rights are reserved.
