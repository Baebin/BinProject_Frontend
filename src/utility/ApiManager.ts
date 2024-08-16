import axios from "axios";
import {ErrorDto} from "../model/dto/ErrorDto";
import {NavigateFunction} from "react-router-dom";
import {popupManager} from "./PopupManager";
import {permissionManager} from "./PermissionManager";
import {accountManager} from "./AccountManager";

export const API_URL = "http://piebin.kro.kr:8080/api/";

class ApiManager {
    getURL(): string {
        return API_URL;
    }
    handleException(dto : ErrorDto, navigate : NavigateFunction, title : string) : boolean {
        // Forbidden
        if (dto.status === 403) {
            permissionManager.handleForbidden(navigate, title);
            return true;
        }
        else if (dto.httpStatus === "UNAUTHORIZED") {
            accountManager.logout();
            popupManager.showBadConfirm(
                title,
                "로그인이 필요합니다.",
                () => {
                    navigate("/login");

                    // for Header Refresh
                    window.location.reload();
                }
            );
            return true;
        }
        return false;
    }
    connect(method : string, api : string, params : any, data : any, resFunc : Function, errorFunc : Function) : void {
        const token = accountManager.getToken();
        axios({
            method: method,
            url: API_URL + api,
            params: params,
            data: data,
            headers: {
                Authorization: token,
            },
        }).then((res) => {
            console.log(res.data);
            console.log(res);
            resFunc(res);
        }).catch((error) => {
            console.log(error.response?.data);
            console.log(error);

            errorFunc(
                new ErrorDto(
                    error.response?.data?.http_status,
                    error.request.status,
                    error.response?.data?.message,
                )
            );
        });
    }
    get(api : string, data : any, resFunc : Function, errorFunc : Function) : void {
        this.connect("get", api, data, null, resFunc, errorFunc);
    }
    post(api : string, data : any, resFunc : Function, errorFunc : Function) : void {
        this.connect("post", api, null, data, resFunc, errorFunc);
    }
    put(api : string, data : any, resFunc : Function, errorFunc : Function) : void {
        this.connect("put", api, null, data, resFunc, errorFunc);
    }
    patch(api : string, data : any, resFunc : Function, errorFunc : Function) : void {
        this.connect("patch", api, null, data, resFunc, errorFunc);
    }
    delete(api : string, data : any, resFunc : Function, errorFunc : Function) : void {
        this.connect("delete", api, null, data, resFunc, errorFunc);
    }

    // Multipart
    private getFormData(file : any | any[], data : any) : FormData {
        const formData = new FormData();
        if (Array.isArray(file)) {
            let files : any[] = file;
            for (var f of files)
                formData.append("file", f);
        } else formData.append("file", file);
        if (data !== null)
            formData.append("dto", new Blob([JSON.stringify(data)], { type: 'application/json' }));
        return formData;
    }
    postFormData(api : string, file : any | any[], data : any, resFunc : Function, errorFunc : Function) : void {
        const token = accountManager.getToken();
        const formData = this.getFormData(file, data);

        axios.post(
            API_URL + api,
            formData,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data",
                }
            }
        ).then((res) => {
            console.log(res.data);
            console.log(res);
            resFunc(res);
        }).catch((error) => {
            console.log(error.response?.data);
            console.log(error);

            errorFunc(
                new ErrorDto(
                    error.response?.data?.http_status,
                    error.request.status,
                    error.response?.data?.message,
                )
            );
        });
    }
    putFormData(api : string, file : any | any[], data : any, resFunc : Function, errorFunc : Function) : void {
        const token = accountManager.getToken();
        const formData = this.getFormData(file, data);

        axios.put(
            API_URL + api,
            formData,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data",
                }
            }
        ).then((res) => {
            console.log(res.data);
            console.log(res);
            resFunc(res);
        }).catch((error) => {
            console.log(error.response?.data);
            console.log(error);

            errorFunc(
                new ErrorDto(
                    error.response?.data?.http_status,
                    error.request.status,
                    error.response?.data?.message,
                )
            );
        });
    }
}

export const apiManager= new ApiManager();