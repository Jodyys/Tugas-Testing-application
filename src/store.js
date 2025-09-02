let STORE = '[]'; // <— inti penyimpanan: satu string

function _read() {
  try {
    return JSON.parse(STORE);
  } catch {
    // jika korup, reset
    STORE = '[]';
    return [];
  }
}

function _write(arr) {
  STORE = JSON.stringify(arr);
  return STORE;
}

export function listNotes() {
  return _read();
}

export function getNote(id) {
  return _read().find(n => n.id === id) || null;
}

export function createNote({ title = '', body = '' }) {
  const data = _read();
  const id = String(Date.now());
  const note = { id, title: String(title), body: String(body) };
  data.push(note);
  _write(data);
  return note;
}

export function updateNote(id, { title, body }) {
  const data = _read();
  const idx = data.findIndex(n => n.id === id);
  if (idx === -1) return null;
  const curr = data[idx];
  const updated = {
    ...curr,
    ...(title !== undefined ? { title: String(title) } : {}),
    ...(body !== undefined ? { body: String(body) } : {}),
  };
  data[idx] = updated;
  _write(data);
  return updated;
}

export function deleteNote(id) {
  const data = _read();
  const before = data.length;
  const after = data.filter(n => n.id !== id);
  _write(after);
  return after.length < before;
}

// Util buat demo/eksperimen sonar
export function resetStore() { STORE = '[]'; }
export function rawString() { return STORE; }

