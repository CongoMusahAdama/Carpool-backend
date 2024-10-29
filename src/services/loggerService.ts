
type LogLevel = 'info' | 'error';

class LoggerService {
  private formatMessage(level: LogLevel, message: string, context?: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${context ? `[${context}] ` : ''}${message}`;
  }

  public error(message: string, context?: string): void {
    console.error(this.formatMessage('error', message, context));
  }

  public info(message: string, context?: string): void {
    console.info(this.formatMessage('info', message, context));
  }
}

// Export a single instance of the logger service
export const loggerService = new LoggerService();
