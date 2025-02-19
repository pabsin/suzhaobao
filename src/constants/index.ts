export const API_LOGIN = '/id-photo/login'
export const API_PHOTO_LIST = '/id-photo/photo-list'
export const API_PHOTO_DETAIL = '/id-photo/photo-detail'
export const API_PHOTO_ITEM = '/id-photo/spec-detail'
export const API_DELETE_PHOTO = '/id-photo/delete-photo'
export const API_ME = '/user/me'
export const API_SPECS_LIST = '/id-photo/spec-list'
export const API_UPLOAD = '/id-photo/upload'
export const API_CREATE_ID_PHOTO = '/id-photo/create-id-photo'
export const API_UPDATE_ID_PHOTO = '/id-photo/update-photo'
export const API_GET_VIDEO_UNIT = '/id-photo/get-video-unit'
export const API_DOWNLOAD_ID_PHOTO = '/id-photo/download-photo'
export const API_MATTING = '/id-photo/matting'
export const API_UPDATE_AVATAR = '/id-photo/update-avatar'
export const API_UPDATE_NICKNAME = '/id-photo/update-nickname'

export interface IDefaultParams {
    page_size?: number;
    page?: number;
}

export const defaultParams: IDefaultParams = {
    page_size: 20,
    page: 1,
};

export const REACH_BOTTOM_EVENT = 'reach_bottom_event';
export const PULL_DOWN_REFRESH_EVENT = 'pull_down_refresh_event';