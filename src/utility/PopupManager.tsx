import Swal, {SweetAlertInput} from "sweetalert2";
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
    showInput(title : string, text : string, input : SweetAlertInput, inputValue : any, inputPlaceholder : string, onConfirmed : Function, onDismissed : Function) : void {
        Swal.fire({
            title: title,
            text: text,
            icon: 'question',

            input: input,
            inputValue: inputValue,
            inputPlaceholder: inputPlaceholder,

            confirmButtonColor: colors["blue-400"],
            confirmButtonText: "확인",

            showCancelButton: true,
            cancelButtonColor: colors["red-400"],
            cancelButtonText: "취소",
        }).then(result => {
            if (result.isConfirmed)
                onConfirmed(result.value);
            else if (result.isDismissed)
                onDismissed(result.value);
        });
    }
    showMoreInput(title : string, text : string, input : SweetAlertInput, inputValue : any, inputPlaceholder : string, onConfirmed : Function, onDenied : Function, onDismissed : Function) : void {
        Swal.fire({
            title: title,
            text: text,
            icon: 'question',

            input: input,
            inputValue: inputValue,
            inputPlaceholder: inputPlaceholder,

            confirmButtonColor: colors["blue-400"],
            confirmButtonText: "확인",

            showDenyButton: true,
            denyButtonColor: colors["orange-400"],
            denyButtonText: "삭제",

            showCancelButton: true,
            cancelButtonColor: colors["red-400"],
            cancelButtonText: "취소",
        }).then(result => {
            if (result.isConfirmed)
                onConfirmed(result.value);
            else if (result.isDenied)
                onDenied(result.value);
            else if (result.isDismissed)
                onDismissed(result.value);
        });
    }
};

export const popupManager = new PopupManager();