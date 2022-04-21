const PORT = process.env.PORT || 9000

const connection = {
    connectionString: 'postgres://uaazodzm:3BmffjDp2jwqbhO8B9EGcfeHJtxTqEWB@rajje.db.elephantsql.com/uaazodzm'
}

const authJWT = {
    secret_key_bearer: '1q2w3e4r',
    secret_key_refresh: '1a2s3d4f',
    bearerTokenExp: 600
} 

module.exports = {
    PORT,
    connection,
    authJWT
}