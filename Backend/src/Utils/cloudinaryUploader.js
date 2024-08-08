import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

const cloudinaryUploader = async (images) => {

    const imageUrls = [];
    try {
        for (const image of images) {
        const uploadResult = await cloudinary.uploader.upload(image.buffer, {
            folder: 'your_folder_name', // Replace with your desired folder
            public_id: image.originalname, // Use original filename as public_id
        });
        imageUrls.push(uploadResult.secure_url);
        }
        return imageUrls;
    } catch (error) {
        console.error('Error uploading images:', error);
        throw error;
    }

}   

export { cloudinaryUploader }