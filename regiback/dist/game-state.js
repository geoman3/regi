"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardGame = void 0;
class CardGame {
    constructor(socketRoomId) {
        this.gameId = socketRoomId;
        this.players = [];
    }
    addPlayer(playerId) {
        this.players.push(playerId);
    }
}
exports.CardGame = CardGame;
