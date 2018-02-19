const admin = require('../admin');

module.exports = (data) => {
    return new Promise((resolve, reject) => {
        admin.auth().verifyIdToken(data).then((decodedToken) => {
            resolve(decodedToken);
        })
            .catch(() => {
                reject({
                    iss: null,
                    aud: null,
                    auth_time: null,
                    user_id: null,
                    sub: null,
                    iat: null,
                    exp: null,
                    email: null,
                    email_verified: false,
                    firebase: { identities: { email: [] }, sign_in_provider: null },
                    uid: null
                })
            })
    })
}
