import * as util from 'util';

type logType = 'error' | 'warning';

export const customLog = (response: any, logType?: logType) => {
  switch (logType) {
    case 'error':
      console.error(util.styleText('redBright', `ERROR: ${response}`));
      break;
    case 'warning':
      console.warn(util.styleText('yellowBright', `WARN: ${response}`));
      break;
    default:
      console.log(util.styleText('blueBright', `INFO: ${response}`));
      break;
  }
};
