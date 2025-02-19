import Taro from "@tarojs/taro";

export async function check_storage_permission(success) {
    Taro.getSetting({
        success: (res) => {
            if (!res.authSetting['scope.writePhotosAlbum']) {
                Taro.showModal({
                    title: '提示',
                    content: '保存图片需要授权哦',
                    success: (res) => {
                        if (res.confirm) {
                            Taro.openSetting({
                                success: (res) => {
                                    success(res);
                                },
                                fail: (res) => {
                                    console.log(res);
                                }
                            });
                        }
                    },
                });
            }
        }
    });
}

export async function savePicUrlAndImg(image_url: string) {
    Taro.downloadFile({
        url: image_url,
        success: function (res) {
            Taro.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function () {
                    Taro.showToast({
                        title: "保存成功",
                        icon: "success",
                        duration: 2000,
                    });
                },
                fail: function () {
                    check_storage_permission(savePicUrlAndImg);
                },
            });
        },
        fail: function (res) {
            Taro.showToast({
                title: "下载图片失败，请重试",
                icon: "none",
                duration: 2000,
            });
        },
    });
};
