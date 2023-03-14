const { apiError } = require('./format_response');
const multer = require('multer');
const sharp = require('sharp');


const getUploadInstance = () => {
    try {

        const upload = multer({
            limits: { fileSize: 5000000 }, // 5 MB
            fileFilter(req, file, cb){
                if(!file.originalname.match(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/)){
                    return cb(new Error("Please upload an image of type png/jpg/jpej"));
                }
                cb(undefined, true);
            }
        });

        return upload.single('avatar');

    } catch (e) {
        return apiError(String(e), res, {});
    }
}

const processBufferImage = async (buffer) => (
    await sharp(buffer).resize({width: 250, height: 250}).png().toBuffer()
)

module.exports = {
    imageUpload: getUploadInstance(),
    processBufferImage
}