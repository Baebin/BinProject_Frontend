import {NavigateFunction} from "react-router-dom";
import {popupManager} from "./PopupManager";

class PermissionManager {
    handleForbidden(navigate : NavigateFunction, title : string) : void {
        localStorage.removeItem("token");
        popupManager.showBadConfirm(
            title,
            "접근 권한이 없습니다.",
            () => {
                navigate("/");
            }
        );
    }
}

export const permissionManager = new PermissionManager()