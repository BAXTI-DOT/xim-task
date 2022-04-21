const fileModel = require('../models/file.model')
const path = require('path')
const fs = require('fs')

module.exports = {
    UPLOAD_FILE: async(req, res) => {
        try {
            if(!req.files) {
                return res.status(400).send("No files are uploaded")
            }

            const { file } = req.files

            if(!file) {
                return res.status(400).json({
                    message: "This key is not supported"
                })
            }

            const extension = file.name.split('.')[file.name.split('.').length - 1]

            fs.readFile(path.join(__dirname, `../uploads/${file.name}`), (_, data) => {
                if(data) {
                    return res.status(400).json({
                        message: "File already exists"
                    })
                }

                file.mv(path.join(__dirname, '../uploads', file.name), err => {
                    if(err) {
                        return res.status(500).send(err)
                    }

                    const uploadedFile = fileModel.uploadFile(
                        file?.name, 
                        file?.mimetype, 
                        extension,
                        file?.size
                    )

                    if(uploadedFile) {
                        return res.status(200).json({
                            message: "File uploaded"
                        })
                    }
                })
            })
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    FILE_LIST: async(req, res) => {
        try {
            const { page, list_size } = req.query

            const allFiles = await fileModel.getFiles(page ? page - 1 : 0, list_size ? list_size : 10)

            if(!allFiles.length) {
                return res.status(400).json({
                    message: "Files are not found !!"
                })
            }

            res.status(200).json(allFiles)
        } catch(err) {
            res.sendStatus(500)
        }
    },
    FILE_DELETE: async(req, res) => {
        try {
            const { id } = req.params

            const file = await fileModel.getFileById(id)

            if(!file) {
                return res.status(400).json({
                    message: "File not found"
                })
            }

            fs.unlink(path.join(__dirname, '../uploads/', file.file_name), async(err) => {
                if(err) console.error(err)

                const deletedFile = await fileModel.deleteFile(file?.file_id)

                if(deletedFile) {
                    res.status(200).json({
                        message: "File has been deleted"
                    })
                }
            })
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    FILE_BY_ID: async(req, res) => {
        try {
            const { id } = req.params

            const file = await fileModel.getFileById(id)

            if(!file) {
                return res.status(400).json({
                    message: "File with this is not found !!"
                })
            }

            res.status(200).json(file)
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    FILE_DOWNLOAD: async(req, res) => {
        try {
            const { id } = req.params

            const file = await fileModel.getFileById(id)

            if(!file) {
                return res.status(400).json({
                    message: "File with this is not found !!"
                })
            } 

            const pathToDownload = path.join(__dirname, '../uploads/', file.file_name)

            res.download(pathToDownload)
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    FILE_UPDATE: async(req, res) => {
        try {
            const { id } = req.params

            const oldFile = await fileModel.getFileById(id)

            if(!oldFile) {
                return res.status(400).json({
                    message: "File with this id is not found !!"
                })
            } 

            if(!req.files) {
                return res.status(400).send("No files are uploaded")
            }

            const { file } = req.files

            if(!file) {
                return res.status(400).json({
                    message: "This key is not supported"
                })
            }

            const extension = file.name.split('.')[file.name.split('.').length - 1]

            const pathToDelete = path.join(__dirname, '../uploads/', oldFile?.file_name)
            const pathToUpdate = path.join(__dirname, '../uploads/', file?.name)

            fs.readFile(pathToDelete, (_, data) => {
                if(!data) {
                    return res.status(400).json({
                        message: "File is not found"
                    })
                }

                fs.unlink(pathToDelete, err => {
                    if(err) console.error(err)

                    file.mv(pathToUpdate, fileErr => {
                        if(fileErr) {
                            return res.status(500).send(fileErr)
                        }

                        const updatedFile = fileModel.updateFile(
                            file?.name ? file?.name : oldFile.file_name, 
                            file?.mimetype ? file?.mimetype : oldFile.file_mime_type, 
                            extension ? extension : oldFile.file_extension,
                            file?.size ? file?.size : oldFile.file_size,
                            oldFile?.file_id
                        )
                        
                        if(updatedFile) {
                            return res.status(200).json({
                                message: "File updated"
                            })
                        }
                    })
                })
            })
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
}