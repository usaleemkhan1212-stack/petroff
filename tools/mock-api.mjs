/**
 * A LOCAL STUB of the Petroff Laravel API. **This is not the API.**
 *
 * It exists so the admin and the contact forms can be run and looked at on a
 * machine that does not have the backend — nothing more. It implements the
 * documented contract (response shapes, status codes, both rate limiters, the
 * paginator, filters and sort, read-on-detail, server-managed closed_at, soft
 * delete) against in-memory data that is thrown away when the process stops.
 *
 * **Never treat its behaviour as the API's.** Where the two disagree, the real
 * one is right; this only knows what the written contract said.
 *
 *     npm run mock:api        # then npm run dev, in another terminal
 *
 * Credentials come from the environment and default to obvious placeholders —
 * the real seeded ones are deliberately not in this file:
 *
 *     MOCK_ADMIN_EMAIL     (default admin@example.test)
 *     MOCK_ADMIN_PASSWORD  (default mock-password)
 *
 * It mirrors a default Laravel CORS config: supports_credentials false and
 * `Retry-After` NOT exposed, so 429 handling exercises the client's fallback.
 * The `/__` routes are test levers for the verification scripts.
 */
import http from 'node:http';
import crypto from 'node:crypto';

const USER = {
  id: 1, name: 'Petroff Admin',
  email: process.env.MOCK_ADMIN_EMAIL || 'admin@example.test',
  role: 'admin', is_active: true, last_login_at: null,
  created_at: '2026-09-08T13:40:57.000000Z',
};
const PASSWORD = process.env.MOCK_ADMIN_PASSWORD || 'mock-password';

let seq = 1;
const tokens = new Map();
const attempts = new Map();
let forbidMe = false;
let down = false; // 503 on /me, to test the unreachable panel without losing tokens

/* ---------------------------------------------------------------- enquiries */
let nextId = 1;
let enquiries = [];
const contactHits = new Map(); // ip -> timestamps

const SOURCES = ['contact-popup', 'consultation-drawer', 'lawcard-section', 'landing-page'];
const STATUSES = ['new', 'in_progress', 'closed', 'spam'];

function seed() {
  enquiries = [];
  nextId = 1;
  const base = Date.parse('2026-09-09T09:58:17.000Z');
  for (let i = 0; i < 27; i++) {
    const received = new Date(base - i * 3600_000 * 7).toISOString().replace('Z', '000Z');
    const status = STATUSES[i % 4 === 3 ? 3 : i % 3];
    enquiries.push({
      id: nextId++,
      name: `Visitor ${String(i + 1).padStart(2, '0')}`,
      email: `visitor${i + 1}@example.com`,
      phone: i % 3 === 0 ? null : `+44 1234 5678${String(i).padStart(2, '0')}`,
      subject: i % 5 === 0 ? null : `Enquiry about ${['contracts', 'litigation', 'tax', 'property', 'IP'][i % 5]}`,
      message: `Full message body for enquiry ${i + 1}. `.repeat(9),
      status,
      source: SOURCES[i % SOURCES.length],
      page_url: 'https://petroff.example/contact',
      assigned_to: i % 6 === 0 ? 1 : null,
      notes: null,
      received_at: received,
      read_at: i % 4 === 0 ? received : null,
      closed_at: status === 'closed' ? received : null,
      created_at: received,
      updated_at: received,
      deleted: false,
    });
  }
}
seed();

const assignee = (id) => (id === USER.id ? USER : null);
const preview = (m) => (m.length > 150 ? m.slice(0, 150) : m);

function toRow(e) {
  const { message, notes, deleted, ...rest } = e;
  void notes; void deleted;
  return { ...rest, message_preview: preview(message), assignee: assignee(e.assigned_to) };
}
function toDetail(e) {
  const { deleted, ...rest } = e;
  void deleted;
  return { ...rest, assignee: assignee(e.assigned_to) };
}

const send = (res, status, body, extra = {}) => {
  res.writeHead(status, { 'Content-Type': 'application/json', ...extra });
  res.end(JSON.stringify(body));
};

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  const url = new URL(req.url, 'http://localhost:8000');
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString();
  let body = {};
  try { body = raw ? JSON.parse(raw) : {}; } catch { body = {}; }

  // test-only levers
  if (url.pathname === '/__forbid') { forbidMe = url.searchParams.get('on') === '1'; return send(res, 200, { forbidMe }); }
  if (url.pathname === '/__reset') { tokens.clear(); attempts.clear(); contactHits.clear(); forbidMe = false; seed(); return send(res, 200, { ok: true }); }
  if (url.pathname === '/__down') { down = url.searchParams.get('on') === '1'; return send(res, 200, { down }); }
  if (url.pathname === '/__tokens') return send(res, 200, { count: tokens.size });
  if (url.pathname === '/__enquiries') return send(res, 200, { count: enquiries.filter((e) => !e.deleted).length, latest: enquiries.filter(e => !e.deleted).slice(-1)[0] ?? null });

  const bearer = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');

  /* ------------------------------------------------------------ public form */
  if (url.pathname === '/api/contact-enquiries' && req.method === 'POST') {
    const ip = req.socket.remoteAddress;
    const now = Date.now();
    const hits = (contactHits.get(ip) || []).filter((t) => now - t < 60_000);
    if (hits.length >= 5) {
      contactHits.set(ip, hits);
      return send(res, 429, { message: 'Too Many Attempts.' }, { 'Retry-After': '38' });
    }

    const errors = {};
    const str = (v) => (typeof v === 'string' ? v : '');
    if (!str(body.name).trim()) errors.name = ['The name field is required.'];
    else if (str(body.name).length > 255) errors.name = ['The name field must not be greater than 255 characters.'];
    if (!str(body.email).trim()) errors.email = ['The email field is required.'];
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str(body.email))) errors.email = ['The email field must be a valid email address.'];
    if (!str(body.message).trim()) errors.message = ['The message field is required.'];
    else if (str(body.message).length > 10000) errors.message = ['The message field must not be greater than 10000 characters.'];
    if (str(body.phone).length > 100) errors.phone = ['The phone field must not be greater than 100 characters.'];
    if (str(body.subject).length > 500) errors.subject = ['The subject field must not be greater than 500 characters.'];
    if (body.page_url && !/^https?:\/\//.test(str(body.page_url))) errors.page_url = ['The page url field must be a valid URL.'];

    hits.push(now); contactHits.set(ip, hits);

    if (Object.keys(errors).length) {
      return send(res, 422, { message: Object.values(errors)[0][0], errors });
    }

    const now2 = new Date().toISOString().replace('Z', '000Z');
    const e = {
      id: nextId++, name: body.name.trim(), email: body.email.trim(),
      phone: body.phone ?? null, subject: body.subject ?? null,
      message: body.message, status: 'new', source: body.source ?? null,
      page_url: body.page_url ?? null, assigned_to: null, notes: null,
      received_at: now2, read_at: null, closed_at: null,
      created_at: now2, updated_at: now2, deleted: false,
    };
    enquiries.push(e);
    return send(res, 201, {
      success: true,
      message: 'Your enquiry has been submitted successfully.',
      data: { id: e.id },
    });
  }

  /* ------------------------------------------------------------------- auth */
  if (url.pathname === '/api/admin/login' && req.method === 'POST') {
    const key = `${body.email || ''}|${req.socket.remoteAddress}`;
    const now = Date.now();
    const hits = (attempts.get(key) || []).filter((t) => now - t < 60_000);
    const strike = () => { hits.push(now); attempts.set(key, hits); };
    if (hits.length >= 5) { attempts.set(key, hits); return send(res, 429, { message: 'Too Many Attempts.' }, { 'Retry-After': '47' }); }

    const errors = {};
    if (!body.email) errors.email = ['The email field is required.'];
    if (!body.password) errors.password = ['The password field is required.'];
    if (Object.keys(errors).length) { strike(); return send(res, 422, { message: 'The given data was invalid.', errors }); }
    if (body.email === 'inactive@gmail.com') return send(res, 403, { message: 'Your account is inactive.' });
    if (body.password === 'shortpw') { strike(); return send(res, 422, { message: 'The given data was invalid.', errors: { password: ['The password must be at least 8 characters.'] } }); }
    if (body.email !== USER.email || body.password !== PASSWORD) { strike(); return send(res, 422, { message: 'Invalid credentials.', errors: { email: ['Invalid credentials.'] } }); }

    attempts.delete(key);
    const token = `${seq++}|${crypto.randomBytes(20).toString('hex')}`;
    const user = { ...USER, last_login_at: new Date().toISOString() };
    tokens.set(token, user);
    return send(res, 200, { success: true, message: 'Login successful.', data: { user, token } });
  }

  if (url.pathname === '/api/admin/me' && req.method === 'GET') {
    if (down) return send(res, 503, { message: 'Service Unavailable.' });
    const user = tokens.get(bearer);
    if (!user) return send(res, 401, { message: 'Unauthenticated.' });
    if (forbidMe) return send(res, 403, { message: 'Forbidden.' });
    return send(res, 200, { success: true, data: user });
  }

  if (url.pathname === '/api/admin/logout' && req.method === 'POST') {
    if (!tokens.has(bearer)) return send(res, 401, { message: 'Unauthenticated.' });
    tokens.delete(bearer);
    return send(res, 200, { success: true, message: 'Logged out successfully.' });
  }

  /* ------------------------------------------------------- admin enquiries */
  if (url.pathname.startsWith('/api/admin/contact-enquiries')) {
    if (!tokens.has(bearer)) return send(res, 401, { message: 'Unauthenticated.' });
    if (forbidMe) return send(res, 403, { message: 'Forbidden.' });

    const rest = url.pathname.slice('/api/admin/contact-enquiries'.length);

    if (rest === '' || rest === '/') {
      if (req.method !== 'GET') return send(res, 405, { message: 'Method Not Allowed.' });
      const q = url.searchParams;
      const errors = {};
      const status = q.get('status');
      if (status && !STATUSES.includes(status)) errors.status = ['The selected status is invalid.'];
      const perPage = q.get('per_page') ? Number(q.get('per_page')) : 20;
      if (q.get('per_page') && (!Number.isInteger(perPage) || perPage < 1 || perPage > 100)) errors.per_page = ['The per page field must be between 1 and 100.'];
      if (Object.keys(errors).length) return send(res, 422, { message: 'The given data was invalid.', errors });

      let list = enquiries.filter((e) => !e.deleted);
      if (status) list = list.filter((e) => e.status === status);
      const at = q.get('assigned_to');
      if (at) list = list.filter((e) => String(e.assigned_to) === at);
      const src = q.get('source');
      if (src) list = list.filter((e) => e.source === src);
      const from = q.get('date_from');
      if (from) list = list.filter((e) => e.received_at.slice(0, 10) >= from);
      const to = q.get('date_to');
      if (to) list = list.filter((e) => e.received_at.slice(0, 10) <= to);
      const search = (q.get('search') || '').toLowerCase();
      if (search) list = list.filter((e) =>
        [e.name, e.email, e.phone, e.subject, e.message].some((v) => (v || '').toLowerCase().includes(search)));

      const sort = q.get('sort') || 'received_at';
      const dir = q.get('direction') === 'asc' ? 1 : -1;
      list = [...list].sort((a, b) => (String(a[sort]) > String(b[sort]) ? dir : String(a[sort]) < String(b[sort]) ? -dir : 0));

      const page = Math.max(1, Number(q.get('page') || 1));
      const lastPage = Math.max(1, Math.ceil(list.length / perPage));
      const slice = list.slice((page - 1) * perPage, page * perPage);

      return send(res, 200, {
        success: true,
        data: slice.map(toRow),
        links: { first: '...', last: '...', prev: page > 1 ? '...' : null, next: page < lastPage ? '...' : null },
        meta: {
          current_page: page, last_page: lastPage, per_page: perPage, total: list.length,
          from: slice.length ? (page - 1) * perPage + 1 : null,
          to: slice.length ? (page - 1) * perPage + slice.length : null,
        },
      });
    }

    const m = rest.match(/^\/(\d+)$/);
    if (!m) return send(res, 404, { message: 'Not Found.' });
    const e = enquiries.find((x) => x.id === Number(m[1]) && !x.deleted);
    if (!e) return send(res, 404, { message: 'Not Found.' });

    if (req.method === 'GET') {
      // opening the detail marks it read, the first time only
      if (e.read_at === null) e.read_at = new Date().toISOString().replace('Z', '000Z');
      return send(res, 200, { success: true, data: toDetail(e) });
    }

    if (req.method === 'PATCH') {
      const errors = {};
      if ('status' in body && !STATUSES.includes(body.status)) errors.status = ['The selected status is invalid.'];
      if ('assigned_to' in body && body.assigned_to !== null && body.assigned_to !== USER.id)
        errors.assigned_to = ['The selected user cannot be assigned enquiries.'];
      if (Object.keys(errors).length) return send(res, 422, { message: 'The given data was invalid.', errors });

      if ('status' in body) {
        e.status = body.status;
        // the server owns closed_at: set on closed, cleared on reopen, spam never sets it
        if (body.status === 'closed') e.closed_at = new Date().toISOString().replace('Z', '000Z');
        else e.closed_at = null;
      }
      if ('assigned_to' in body) e.assigned_to = body.assigned_to;
      if ('notes' in body) e.notes = body.notes;
      e.updated_at = new Date().toISOString().replace('Z', '000Z');
      return send(res, 200, { success: true, message: 'Enquiry updated successfully.', data: toDetail(e) });
    }

    if (req.method === 'DELETE') {
      e.deleted = true;
      return send(res, 200, { success: true, message: 'Enquiry deleted successfully.' });
    }

    return send(res, 405, { message: 'Method Not Allowed.' });
  }

  return send(res, 404, { message: 'Not Found.' });
});

const PORT = Number(process.env.MOCK_API_PORT) || 8000;
server.listen(PORT, () => {
  console.log(`
  API STUB — not the real API — on http://localhost:${PORT}`);
  console.log(`  sign in with  ${USER.email}  /  ${PASSWORD}`);
  console.log(`  ${enquiries.length} sample enquiries, discarded on exit
`);
});
