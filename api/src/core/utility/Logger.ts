import BaseLogger from "./BaseLogger";

class Logger extends BaseLogger {
  constructor() {
    super({
      log: true,
      levels: {
        debug: 0,
        info: 0,
        warn: 0,
        error: 0,
      },
    });
  }
}
export default new Logger();
