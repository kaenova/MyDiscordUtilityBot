import express, { Express } from 'express';
import { appendFile } from 'fs';
const server = express();

function InitExpress(): Express {
  server.get('/', (req, res) => res.send('Express + TypeScript Server'));
  return server
}

export { InitExpress, server }