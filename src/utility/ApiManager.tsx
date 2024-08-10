import axios from "axios";
import {ErrorDto} from "../model/dto/ErrorDto";
import {NavigateFunction} from "react-router-dom";
import {popupManager} from "./PopupManager";

const API_URL = "http://piebin.kro.kr:8080/api/";

class ApiManager {
    handleForbidden(dto : ErrorDto, navigate : NavigateFunction, title : string) : boolean {
        if (dto.httpStatus !== "FORBIDDEN")
            return false;
        localStorage.removeItem("token");
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
    connect(method : string, api : string, params : any, data : any, resFunc : Function, errorFunc : Function) : void {
        const token = localStorage.getItem("token");
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
                    error.response?.data?.message
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
}

export const apiManager= new ApiManager();