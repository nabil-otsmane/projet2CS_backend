import connections from './getConnections'
import * as init from './initialize'
import * as error from './error'

export const getConnections = connections;

export const connect = init.connect;
export const openConnection = init.openConnection;
export const disconnect = init.disconnect;

export const redisErrorHandler = error.redisErrorHandler;