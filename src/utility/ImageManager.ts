import {apiManager} from "./ApiManager";

class ImageManager {
    getProfile(idx : any) : string {
        return `${apiManager.getURL()}account/load/profile/image/${idx}`;
    }
}

export const images = {
    "logo": "/images/logo.jpg",
    "binBean": "/images/bin_bean.png",
    "profileNotFound": "/images/profile_not_found.svg",
};
export const imageManager= new ImageManager();