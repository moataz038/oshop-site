'use strict';
const http = require('node:http');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const execFileAsync = promisify(execFile);
const cli = process.env.REDIS_CLI_BIN;
const socket = process.env.REDIS_SOCKET;
const bundle = process.env.OSHOP_BUNDLE;

function redisFetch(url, options = {}) {
  const parsed = new URL(url);
  if (parsed.hostname === 'open.er-api.com') {
    return Promise.resolve(new Response(JSON.stringify({ result: 'error', rates: {} }), { status: 200, headers: { 'content-type': 'application/json' } }));
  }
  if (parsed.protocol !== 'https:' || !['local.redis.test', 'upstash.local'].includes(parsed.hostname)) {
    return Promise.reject(new Error('external network blocked in runtime integration child'));
  }
  let command;
  try { command = JSON.parse(options.body); } catch { return Promise.reject(new Error('invalid redis command')); }
  return execFileAsync(cli, ['--json', '-s', socket, ...command.map(String)], { timeout: 10000, maxBuffer: 16 * 1024 * 1024 })
    .then(({ stdout }) => {
      const text = stdout.trim();
      let result = null;
      if (text) { try { result = JSON.parse(text); } catch { return new Response(JSON.stringify({ error: 'redis response' }), { status: 500 }); } }
      return new Response(JSON.stringify({ result }), { status: 200, headers: { 'content-type': 'application/json' } });
    });
}
global.fetch = redisFetch;
const mod = require(bundle);
const handler = typeof mod === 'function' ? mod : (typeof mod.default === 'function' ? mod.default : mod.handler);
if (typeof handler !== 'function') throw new Error(`unsupported export shape: ${Object.keys(mod || {})}`);

const server = http.createServer((req, res) => {
  const chunks = [];
  req.on('data', c => chunks.push(c));
  req.on('end', async () => {
    const bodyText = Buffer.concat(chunks).toString();
    let body;
    if (bodyText) { try { body = JSON.parse(bodyText); } catch { body = undefined; } }
    req.body = body;
    if (typeof req.headers['x-test-host'] === 'string') req.headers.host = req.headers['x-test-host'];
    req.path = new URL(req.url, 'http://localhost').pathname;
    req.query = Object.fromEntries(new URL(req.url, 'http://localhost').searchParams);
    req.ip = req.headers['x-test-ip'] || '127.0.0.1';
    const originalEnd = res.end.bind(res);
    res.json = value => { if (!res.headersSent) res.setHeader('content-type', 'application/json'); originalEnd(JSON.stringify(value)); };
    res.send = value => originalEnd(Buffer.isBuffer(value) ? value : String(value));
    res.download = async (file, name) => { try { const fs = require('node:fs'); if (!res.headersSent) { res.setHeader('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); res.setHeader('content-disposition', `attachment; filename="${name}"`); } originalEnd(fs.readFileSync(file)); } catch { res.statusCode = 500; originalEnd(JSON.stringify({ error: 'download failed' })); } };
    res.status = code => { res.statusCode = code; return res; };
    try {
      await handler(req, res);
      if (!res.writableEnded) await new Promise((resolve) => {
        res.once('finish', resolve);
        res.once('close', resolve);
      });
    } catch (error) {
      if (!res.headersSent) { res.statusCode = 500; originalEnd(JSON.stringify({ error: 'internal error' })); }
    }
  });
});
server.listen(Number(process.env.PORT), '127.0.0.1', () => process.stdout.write(`READY ${process.env.PORT}\n`));
process.on('SIGTERM', () => server.close(() => process.exit(0)));
process.on('SIGINT', () => server.close(() => process.exit(0)));
