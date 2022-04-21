const { fetch, fetchAll } = require('../utils/postgres')

const UPLOAD_FILE = `
    INSERT INTO
        files(
            file_name,
            file_mime_type,
            file_extension,
            file_size
        )
    VALUES($1, $2, $3, $4)
    RETURNING *
`

const FILE_LIST = `
    SELECT
        *
    FROM
        files
    OFFSET $1 LIMIT $2
`

const FILE_BY_ID = `
    SELECT
        *
    FROM
        files
    WHERE
        file_id = $1
`

const DELETE_FILE = `
    DELETE FROM
        files
    WHERE
        file_id = $1
    RETURNING *
`

const UPDATE_FILE = `
    UPDATE
        files
    SET
        file_name = $1,
        file_mime_type = $2,
        file_extension = $3,
        file_size = $4,
        updated_at = CURRENT_TIMESTAMP
    WHERE
        file_id = $5
    RETURNING 
        *
`

const uploadFile = (name, mimetype, extension, size) => fetch(UPLOAD_FILE, name, mimetype, extension, size)
const getFiles = (page, list_size) => fetchAll(FILE_LIST, page, list_size)
const getFileById = id => fetch(FILE_BY_ID, id)
const deleteFile = id => fetch(DELETE_FILE, id)
const updateFile = ( name, mimetype, extension, size, id ) => {
    return fetch(
        UPDATE_FILE,
        name,
        mimetype,
        extension,
        size,
        id
    )
}

module.exports = {
    uploadFile,
    getFiles,
    getFileById,
    deleteFile,
    updateFile
}