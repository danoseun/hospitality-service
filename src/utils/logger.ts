import dotenv from 'dotenv';

import { createLogger, format, transports } from 'winston';
import appRootPath from 'app-root-path';


dotenv.config();

const environment = process.env.NODE_ENV;

const variables = {
    app: {
      port: process.env.PORT,
      environment,
      isDev: environment === 'development',
      isTesting: environment === 'test',
      isProd: environment === 'production',
      isStaging: environment === 'staging'
    },
    logs: {
      showAppLogs: process.env.SHOW_APPLICATION_LOGS === 'true',
      databaseLogs: process.env.SHOW_DATABASE_LOGS === 'true'
    }
  };
  


export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    }),
    format.json()
  ),
  ...(!variables.app.isTesting && {
    transports: [
      new transports.File({
        filename: `${appRootPath}/logs/error.log`,
        level: 'error',
        silent: variables.app.isTesting
      }),
      new transports.File({
        filename: `${appRootPath}/logs/combined.log`,
        silent: variables.app.isTesting
      })
    ]
  })
});

if (variables.logs.showAppLogs) {
  logger.add(
    new transports.Console({
      format: format.combine(format.simple(), format.json())
    })
  );
}
