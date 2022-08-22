export const supportedVideoFormats = ["mov", "mp4", "mpeg", "mpg", "wmv", "3gp"];

export const isVideoType = function (url) {
    const extension = url.split(".").pop().toLowerCase();
    if (supportedVideoFormats.indexOf(extension) !== -1) {
        return true;
    }
    return false;
} 
