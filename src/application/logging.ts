import * as windston from 'winston'

export const logger = windston.createLogger({
    level: 'debug',
    format: windston.format.json(),
    transports: [
        new windston.transports.Console({})
    ]
})