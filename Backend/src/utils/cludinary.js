import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localPath) => {
    try {
        if (!localPath) return null
        const uploadResult = await cloudinary.uploader.upload(localPath, { resource_type: "auto" })
        console.log("File uploaded successfully", uploadResult.secure_url)

        return uploadResult

    } catch (error) {
        return null
    }
}


const deleteFromCloudinary = async (public_id) => {
    try {

        const response = await cloudinary.uploader.destroy(public_id, { resource_type: "auto" })
        console.log("Response", response)
        console.log("File deleted successfully")

    } catch (error) {
        console.log("Error while deletion file from cludinary", error)
        throw error
    }
}

export { uploadOnCloudinary, deleteFromCloudinary }