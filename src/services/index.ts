import { API_CREATE_ID_PHOTO, API_DELETE_PHOTO, API_DOWNLOAD_ID_PHOTO, API_GET_VIDEO_UNIT, API_LOGIN, API_MATTING, API_ME, API_PHOTO_DETAIL, API_PHOTO_ITEM, API_PHOTO_LIST, API_SPECS_LIST, API_UPDATE_AVATAR, API_UPDATE_ID_PHOTO, API_UPDATE_NICKNAME, API_UPLOAD } from "@/constants";
import { PhotoDto, SpecsDto, UserDto } from "@/dtos";
import request, { upload } from "@/services/request";


export interface SpecsListReq {
    page: number;
    page_size: number;
    class: number;
    name: string;
}

export interface PageReq {
    page: Number,
    page_size: Number,
}

export interface DeletePhotoReq {
    image_id: string,
}

export const login = (code: string, app_id: string) => {
    return request<string>({
        url: API_LOGIN,
        data: { code: code, app_id: app_id },
        method: "POST",
    });
};

export const getUserInfo = () => {
    return request<UserDto>({
        url: API_ME,
        method: "GET",
    });
};

export const getSpecsList = (data: Partial<SpecsListReq>) => {
    return request<Array<SpecsDto>>({
        url: API_SPECS_LIST,
        method: "GET",
        data
    });
};

export const getPhotoList = (data: PageReq) => {
    return request<Array<PhotoDto>>({
        url: API_PHOTO_LIST,
        method: "GET",
        data
    });
};

export interface IdReq {
    id: string,
}

export const getPhotoItem = (data: IdReq) => {
    return request<SpecsDto>({
        url: API_PHOTO_ITEM,
        method: "GET",
        data
    });
};

export const deletePhoto = (data: DeletePhotoReq) => {
    return request<Array<PhotoDto>>({
        url: API_DELETE_PHOTO,
        method: "DELETE",
        data
    });
};

export interface CreateIdPhotoReq {
    image_id: string,
    item_id: string,
    is_beauty_on: number,
}

export interface CreateIdPhotoResponse {
    image_id: string,
    image_base64: string,
}

export const createIdPhoto = (data: CreateIdPhotoReq) => {
    return request<CreateIdPhotoResponse>({
        url: API_CREATE_ID_PHOTO,
        method: "POST",
        data
    });
};

export interface GetVideoUnitReq {
    app_id: string
}

export interface GetVideoUnitResponse {
    video_unit_id: string
}

export const getVideoUnit = (data: GetVideoUnitReq) => {
    return request<GetVideoUnitResponse>({
        url: API_GET_VIDEO_UNIT,
        method: "POST",
        data
    });
};

export interface UpdateIdPhotoReq {
    image_id: string
    color: string
    render: number
}

export interface UpdateIdPhotoResponse {
    image_id: string
    image_base64: string
}

export const updateIdPhoto = (data: UpdateIdPhotoReq) => {
    return request<UpdateIdPhotoResponse>({
        url: API_UPDATE_ID_PHOTO,
        method: "POST",
        data
    });
};

export interface DownloadIdPhotoRequest {
    image_id: string
}

export const downloadIdPhoto = (data: DownloadIdPhotoRequest) => {
    return request<string>({
        url: API_DOWNLOAD_ID_PHOTO,
        method: "POST",
        data
    });
};


export const uploadPhoto = (filePath: string) => {
    return upload<string>({
        url: API_UPLOAD,
        name: "file",
        filePath
    });
};

export const updateAvatar = (filePath: string) => {
    return upload<string>({
        url: API_UPDATE_AVATAR,
        name: "file",
        filePath
    });
};


export interface MattingRequest {
    image_id: string
    dpi: string
}

export const matting = (data: MattingRequest) => {
    return request<string>({
        url: API_MATTING,
        method: "POST",
        data
    });
};

export const getPhotoDetail = (data: IdReq) => {
    return request<PhotoDto>({
        url: API_PHOTO_DETAIL,
        method: "GET",
        data
    });
};


export interface UpdateNicknameRequest {
    name: string
}


export const updateNickname = (data: UpdateNicknameRequest) => {
    return request({
        url: API_UPDATE_NICKNAME,
        method: "POST",
        data
    });
};