const GREETING = "Hi — I'm the HELLFIRE agent. Ask me about the modules, contract specialists, or how an engagement starts.";
const FALLBACK = "I'm offline right now — but a person who owns the outcome isn't. Book a call below and we'll pick this up directly.";

const THEMES = {
  light: {
    user: { bg: '#141414', color: '#FAFAF8', border: 'none' },
    agent: { bg: 'rgba(255,255,255,0.7)', color: '#141414', border: '1px solid rgba(20,20,20,0.08)' },
  },
  dark: {
    user: { bg: '#F2B705', color: '#141414', border: 'none' },
    agent: { bg: 'rgba(250,250,248,0.1)', color: 'rgba(250,250,248,0.9)', border: 'none' },
  },
};

export function createChatController({ messagesEl, typingEl, inputEl, sendBtn, theme = 'light' }) {
  const palette = THEMES[theme];
  const state = {
    messages: [{ role: 'agent', text: GREETING }],
    typing: false,
  };

  function renderMessages() {
    messagesEl.innerHTML = '';
    for (const msg of state.messages) {
      const isUser = msg.role === 'user';
      const bubble = document.createElement('div');
      const style = isUser ? palette.user : palette.agent;
      bubble.className = 'chat-bubble';
      bubble.style.alignSelf = isUser ? 'flex-end' : 'flex-start';
      bubble.style.background = style.bg;
      bubble.style.color = style.color;
      bubble.style.border = style.border;
      bubble.textContent = msg.text;
      messagesEl.appendChild(bubble);
    }
    typingEl.style.display = state.typing ? 'block' : 'none';
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function send() {
    const text = inputEl.value.trim();
    if (!text || state.typing) return;
    state.messages.push({ role: 'user', text });
    inputEl.value = '';
    state.typing = true;
    sendBtn.disabled = true;
    renderMessages();

    // No LLM backend is deployed yet for this static site (that arrives with
    // the office-agent/RAG-01 modules) — respond with an honest fallback
    // rather than fake a working AI reply.
    await new Promise((resolve) => setTimeout(resolve, 700));
    state.messages.push({ role: 'agent', text: FALLBACK });
    state.typing = false;
    sendBtn.disabled = false;
    renderMessages();
    inputEl.focus();
  }

  sendBtn.addEventListener('click', send);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') send();
  });

  renderMessages();
}
