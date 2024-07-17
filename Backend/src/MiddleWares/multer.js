import multer from 'multer'

const multerUpload = multer({
    limits : {
        fileSize : 1024 * 1024 * 1024,
    }
})

const attachmentsMulter = multerUpload.array("files", 5)

export { attachmentsMulter }