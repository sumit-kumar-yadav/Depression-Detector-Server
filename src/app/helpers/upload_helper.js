const { apiError } = require('./format_response');
const multer = require('multer');


const getUploadInstance = () => {
    try {

        const upload = multer({
            limits: { fileSize: 5000000 }, // 5 MB
            fileFilter(req, file, cb){
                if(!file.originalname.match(/\.(jpj|jpeg|png)$/)){
                    return cb(new Error("Please upload an image within range"));
                }
                cb(undefined, true);
            }
        });

        return upload.single('avatar');

    } catch (e) {
        return apiError(String(e), res, {});
    }
}

module.exports = {
    imageUpload: getUploadInstance()
}