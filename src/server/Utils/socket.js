module.exports = {
    getToken: (socket) => {
        const cookie = socket.handshake.headers.cookie;
        var match = cookie.match(new RegExp('(^| )POKEMON_AUTH_TOKEN=([^;]+)'));
        if (match) return match[2];
        else return null;
    }
}