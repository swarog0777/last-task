function send(code, content, cb, token) {
    var result = {code: code, success: true, message: content};
    if (code !== 200) {
        result.success = false
    }
    if (content == "Authorization successful")
        result.token = token;
    if (typeof cb.status === 'function' && typeof cb.send === 'function') {
        cb.status(code).send(result)
    }
}

function scb(content, cb, token) {
    return send(200, content, cb, token)
}

module.exports = {
    scb: scb,
    ecb: send
};