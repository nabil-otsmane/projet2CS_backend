import { checkAuth, socketAuth } from './authentification';
import log from './log'

export const Auth = checkAuth;
export const SocketAuth = socketAuth;
export const Log = log;