import {apiManager} from "./ApiManager";

class ImageManager {
    getProfile(idx : any) : string {
        return `${apiManager.getURL()}account/load/profile/image/${idx}`;
    }
    getNoticeThumbnailImage(idx : any) : string {
        return `${apiManager.getURL()}notice/load/image/thumbnail/${idx}`;
    }
}

export const images = {
    "logo": "/images/logo.jpg",
    "binBean": "/images/bin_bean.png",
    "meunnYa": "/images/meunn_ya.jpg",
    "profileNotFound": "/images/profile_not_found.svg",
    "imageNotFound": "/images/image_not_found.png",
};
export const imageManager= new ImageManager();