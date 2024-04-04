import { logsServiceInstance } from './service';

class LogsController {
  constructor(private readonly logsService = logsServiceInstance) {}
}
export const logsController = new LogsController();
