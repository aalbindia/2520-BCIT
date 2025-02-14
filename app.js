const process = require('node:process')

const rs = process.stdin;
const ws = process.stdout;

rs.pipe(ws)