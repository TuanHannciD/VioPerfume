const CLOUDINARY_UPLOAD_PRESET = 'Vioperfumer'; // Tạo trong Cloudinary settings
const CLOUDINARY_CLOUD_NAME = 'dmyorju2e';

export const uploadImageToCloudinary = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        const data = await response.json();
        if (data.secure_url) {
            return data.secure_url;
        }
        throw new Error('Upload failed');
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}; 