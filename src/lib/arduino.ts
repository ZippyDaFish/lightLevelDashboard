import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

const port = new SerialPort({
  path: 'COM5',
  baudRate: 9600
});

const parser = (port as any).pipe(new ReadlineParser({ delimiter: '\r\n' }));

let values: number[] = [];

parser.on('data', (line: string) => {
  const n = Number(line.trim());
  if (!isNaN(n)) {
    values.push(n);
    if (values.length > 20) values.shift();
  }
});

export function getValues() {
  return values;
}