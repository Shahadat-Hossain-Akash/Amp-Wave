import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

function fileFilter(req, file, cb) {

    if (file.mimetype === 'image/jpeg' || 
    file.mimetype === 'image/jpg' || 
    file.mimetype === 'image/png') {
        cb(null, true)
    }else{
        cb(null, false)
    }

}

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024
    },
    fileFilter
})

export default upload