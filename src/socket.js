import { io } from 'socket.io-client'
const HOST = 3100;

export const socket = io(HOST, {autoConnect: false})