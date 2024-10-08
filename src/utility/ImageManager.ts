import {apiManager} from "./ApiManager";

class ImageManager {
    getProfile(idx : any) : string {
        return `${apiManager.getURL()}account/load/profile/image/${idx ?? -1}`;
    }
    getNoticeThumbnailImage(idx : any) : string {
        return `${apiManager.getURL()}notice/load/image/thumbnail/${idx ?? -1}`;
    }
    getPostThumbnailImage(idx : any) : string {
        return `${apiManager.getURL()}post/load/image/thumbnail/${idx ?? -1}`;
    }
    getNoticeImage(idx : any, fileIdx : any) : string {
        return `${apiManager.getURL()}notice/load/image/${idx}/${fileIdx ?? -1}`;
    }
    getPostImage(idx : any, fileIdx : any) : string {
        return `${apiManager.getURL()}post/load/image/${idx}/${fileIdx ?? -1}`;
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