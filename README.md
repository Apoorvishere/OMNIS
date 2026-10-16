# OMNIS prototype

A small front-end prototype for exploring the OMNIS idea: a workspace that connects information across documents and answers questions with source references.

## Run locally

Open `index.html` in a browser. No build step or package installation is needed.

## Prototype boundaries

- The documents, answers, graph connections, and review prompts are sample data.
- Adding a file changes the visible list only; it does not upload or parse the file.
- There is no model API, backend, or database yet.
- The upload picker accepts PDF, DOCX, Markdown, TXT, and CSV file names.

## Next milestones

1. Extract document text and preserve page or section locations.
2. Store documents and extracted passages locally or in a database.
3. Retrieve relevant passages before answering questions.
4. Connect a model API through a server route and require citations.
5. Evaluate extraction and citation accuracy before considering model training.
