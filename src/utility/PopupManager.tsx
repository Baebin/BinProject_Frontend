import Swal from "sweetalert2";
import {colors} from "./ColorManager";

class PopupManager {
    showOkayConfirm(title : string, text : string, onConfirmed : Function) : void {
        Swal.fire({
            title: title,
            text: text,
            icon: 'success',

            confirmButtonColor: colors["blue-400"],
            confirmButtonText: "확인",
        }).then(result => {
            if (result.isConfirmed)
                onConfirmed();
        });
    }
    showBadConfirm(title : string, text : string, onConfirmed : Function) : void {
        Swal.fire({
            title: title,
            text: text,
            icon: 'warning',

            confirmButtonColor: colors["red-400"],
            confirmButtonText: "확인",
        }).then(result => {
            if (result.isConfirmed)
                onConfirmed();
        });
    }
};

export const popupManager = new PopupManager();