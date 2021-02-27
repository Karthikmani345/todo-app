import winston from "winston";

export interface ILogger {
  info(args: unknown): void;
  warn(args: unknown): void;
  error(args: unknown): void;
  debug(args: unknown): void;
}

type severity = 0 | 1;

export type ILoggerConfig = {
  log: boolean;
  levels: {
    error: severity;
    info: severity;
    warn: severity;
    debug: severity;
  };
};

export default class BaseLogger implements ILogger {
  private configuration: ILoggerConfig;
  private logger: winston.Logger;

  constructor(configuration: ILoggerConfig) {
    this.configuration = configuration;
    this.logger = this.initLogger();
  }

  private initLogger() {
    const config = {
      levels: this.configuration.levels,
      silent: !this.configuration.log,
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.colorize({ all: true }),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}  ${info.message}`
        )
      ),
    };
    const loggerInstance = winston.createLogger(config);
    loggerInstance.add(new winston.transports.Console());
    return loggerInstance;
  }

  private parseArgs(args: unknown): string {
    if (typeof args === "object") return JSON.stringify(args);
    else return args as string;
  }

  info(args: unknown): void {
    this.logger.info(this.parseArgs(args));
  }

  warn(args: unknown): void {
    this.logger.warn(this.parseArgs(args));
  }

  error(args: unknown): void {
    this.logger.error(this.parseArgs(args));
  }

  debug(args: unknown): void {
    this.logger.debug(this.parseArgs(args));
  }
}
