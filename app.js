const documents = [
  { name: 'Project Atlas — research brief', type: 'PDF', size: '2.4 MB', ago: 'Updated 2h ago', icon: 'pdf' },
  { name: 'Q3 market research', type: 'DOCX', size: '842 KB', ago: 'Updated yesterday', icon: 'doc' },
  { name: 'Launch timeline & milestones', type: 'XLSX', size: '126 KB', ago: 'Updated Oct 14', icon: 'sheet' },
  { name: 'Team sync — October 14', type: 'MD', size: '18 KB', ago: 'Updated Oct 14', icon: 'note' }
];

const list = document.querySelector('#document-list');
const toast = document.querySelector('#toast');
let toastTimer;

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function renderDocuments() {
  list.innerHTML = documents.map(doc => `
    <div class="document-row">
      <span class="file-icon ${doc.icon}">${doc.type[0]}</span>
      <span class="document-meta">
        <strong>${escapeHtml(doc.name)}</strong>
        <small>${doc.type} · ${doc.size} · ${doc.ago}</small>
      </span>
      <span class="status">Connected</span>
    </div>
  `).join('');
}

renderDocuments();

const answers = [
  {
    match: /deadline|due|when|date|friday/i,
    text: 'The team sync notes say to send the revised budget by Friday. They also mention a launch date that differs from the launch plan, so it may be worth confirming.',
    sources: ['Team sync — October 14 · p. 2', 'Launch timeline & milestones · row 12']
  },
  {
    match: /launch|atlas|project|plan/i,
    text: 'Project Atlas connects the research brief, market research, and launch timeline. The launch date appears differently in the plan and team notes, so confirm which date is current.',
    sources: ['Project Atlas — research brief · p. 1', 'Q3 market research · p. 4', 'Team sync — October 14 · p. 1']
  },
  {
    match: /budget|cost|spend|finance/i,
    text: 'The team sync notes mention a revised budget due Friday. The launch timeline includes a budget review milestone, but the sample files do not say how much the budget is.',
    sources: ['Team sync — October 14 · p. 2', 'Launch timeline & milestones · row 8']
  }
];

function askQuestion() {
  const question = document.querySelector('#question').value.trim();
  if (!question) {
    document.querySelector('#question').focus();
    return;
  }

  const result = answers.find(answer => answer.match.test(question));
  const answerText = document.querySelector('#answer-text');
  const citations = document.querySelector('#citations');

  answerText.textContent = result
    ? result.text
    : 'This sample workspace does not have enough prepared evidence to answer that confidently. Try asking about launch dates, the budget, or deadlines.';

  citations.innerHTML = (result ? result.sources : ['Project Atlas — research brief · p. 1'])
    .map(source => `<button class="citation">↗ ${escapeHtml(source)}</button>`)
    .join('');

  citations.querySelectorAll('.citation').forEach(button => {
    button.addEventListener('click', () => showToast(`Source: ${button.textContent.slice(2)}`));
  });

  document.querySelector('#answer-card').hidden = false;
}

document.querySelector('#ask-button').addEventListener('click', askQuestion);
document.querySelector('#question').addEventListener('keydown', event => {
  if (event.key === 'Enter') askQuestion();
});

document.querySelector('#add-doc').addEventListener('click', () => {
  document.querySelector('#file-input').click();
});
document.querySelector('#upload-row').addEventListener('click', () => {
  document.querySelector('#file-input').click();
});

document.querySelector('#file-input').addEventListener('change', event => {
  const supported = ['pdf', 'docx', 'md', 'txt', 'csv'];

  [...event.target.files].forEach(file => {
    const extension = file.name.split('.').pop().toLowerCase();
    if (!supported.includes(extension)) {
      showToast(`${file.name}: this file type is not supported.`);
      return;
    }

    const icon = extension === 'pdf' ? 'pdf'
      : extension === 'docx' ? 'doc'
      : extension === 'csv' ? 'sheet'
      : 'note';

    documents.unshift({
      name: file.name,
      type: extension.toUpperCase(),
      size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
      ago: 'Just added',
      icon
    });

    showToast(`${file.name} added. Text extraction is not connected yet.`);
  });

  renderDocuments();
  event.target.value = '';
});

document.querySelectorAll('.node').forEach(node => {
  node.addEventListener('click', () => {
    document.querySelectorAll('.node').forEach(item => item.classList.remove('selected'));
    node.classList.add('selected');
    document.querySelector('#graph-message').textContent =
      `${node.dataset.node} connects to launch timing, customer research, and budget.`;
  });
});

document.querySelectorAll('.insight').forEach(card => {
  card.addEventListener('click', () => {
    const message = card.dataset.insight === 'deadline'
      ? 'Review prompt: confirm who owns sending the revised budget by Friday. Source: Team sync notes, page 2.'
      : 'Possible conflict: the plan and team notes list different launch dates. Compare the sources before deciding.';
    showToast(message);
  });
});