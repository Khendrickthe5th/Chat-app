import { io } from 'socket.io-client'
// const HOST = 3100;
const HOST = 'chat-app-production-170a.up.railway.app'

export const socket = io(HOST, {autoConnect: false})