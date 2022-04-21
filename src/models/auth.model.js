const { fetch } = require('../utils/postgres')

const SIGN_UP = `
    INSERT INTO 
        users(
            user_email,
            user_password
        )
    VALUES($1, $2)
    RETURNING *
`

const CHECK_FOR_EXISTING_USER = `
    SELECT
        *
    FROM
        users
    WHERE
        user_email = $1
    AND
        user_password = $2
`

const USER_BY_ID = `
    SELECT
        *
    FROM
        users
    WHERE
        user_id = $1
`

const signUp = (email, password) => fetch(SIGN_UP, email, password)
const checkExisting = (email, password) => fetch(CHECK_FOR_EXISTING_USER, email, password)
const signIn = (email, password) => fetch(CHECK_FOR_EXISTING_USER, email, password)
const userById = id => fetch(USER_BY_ID, id)

module.exports = {
    signUp,
    checkExisting,
    signIn,
    userById
}