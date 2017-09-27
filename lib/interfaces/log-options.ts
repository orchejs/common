import { FileTransportOptions, ConsoleTransportOptions } from 'winston';

export interface LogOptions {
  disableLog?: boolean;
  fileOptions?: FileTransportOptions;
  consoleOptions?:ConsoleTransportOptions;
}
