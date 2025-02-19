import { View, Text } from "@tarojs/components";
import { Button, Image, Field, Input } from "@taroify/core";
import Taro, { useLoad } from "@tarojs/taro";
import { matting, uploadPhoto } from "@/services";
import { check_storage_permission } from "@/utils";
import { useState } from "react";
import "./index.scss";
import plusgray from "../../images/plus-gray.png";
import rightblack from "../../images/right-black.png";
import { useUserStore } from "@/stores";

export default function Index() {
  const token = useUserStore((state) => state.token);
  const [disabled, setDisabled] = useState(true);
  const [image_id, setImageId] = useState("");

  const [data, setData] = useState({
    uploadedImageUrl: "",
    dpi: "",
    isGenerated: 1,
    mattingCount: 0,
    count: null,
  });

  const handleBack = () => {
    setData({
      uploadedImageUrl: "",
      dpi: "",
      isGenerated: 1,
      mattingCount: 0,
      count: null,
    });
  };

  const onDpiInput = (e) => {
    let value = e.detail.value || "";
    setData((old) => {
      return { ...old, ...{ dpi: value } };
    });
  };

  const chooseImage = () => {
    if (token.length < 1) {
      Taro.navigateTo({
        url: "/pages/login/index",
      });
      return;
    }
    if (data.mattingCount == -1) {
      Taro.showToast({
        title: "功能维护中，暂停使用",
        duration: 3000,
        icon: "none",
      });
      return;
    }

    Taro.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sourceType: ["album"],
      sizeType: ["original"],
      success: (res) => {
        const file = res.tempFiles[0];
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 10) {
          Taro.showToast({
            title: "图片大小不能超过10MB",
            icon: "none",
            duration: 2000,
          });
          return;
        }
        imgUpload(file.tempFilePath);
      },
    });
  };

  const imgUpload = async (filePath) => {
    Taro.showLoading({
      title: "图片检测中",
    });

    let result = await uploadPhoto(filePath);
    Taro.hideLoading();
    setImageId(result);
    setDisabled(false);
    setData((old) => {
      return { ...old, ...{ isGenerated: 2 } };
    });
  };

  const imageDivision = async () => {
    const dpi = parseInt(data.dpi, 10);

    if (dpi < 72) {
      Taro.showToast({
        title: "DPI最低75哦~",
        icon: "none",
        duration: 2000,
        mask: true,
      });
      return;
    }

    if (dpi > 1000) {
      Taro.showToast({
        title: "DPI最高只能1000哦~",
        icon: "none",
        duration: 2000,
        mask: true,
      });
      return;
    }

    Taro.showLoading({
      title: "处理中...",
      mask: true,
    });

    setTimeout(() => {
      Taro.showLoading({
        title: "正在处理细节...",
        mask: true,
      });
    }, 1000);

    let result = await matting({
      image_id: image_id,
      dpi: data.dpi == "" ? "300" : data.dpi,
    });
    Taro.hideLoading();

    setData((old) => {
      return { ...old, ...{ isGenerated: 3, uploadedImageUrl: result } };
    });
  };

  const downloadPic = () => {
    Taro.downloadFile({
      url: data.uploadedImageUrl,
      success: function (res) {
        Taro.hideLoading();
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
            check_storage_permission(downloadPic);
          },
        });
      },
      fail: function () {
        Taro.showToast({
          title: "下载图片失败，请重试",
          icon: "none",
          duration: 2000,
        });
      },
    });
  };

  useLoad(() => {
    console.log("Page loaded..");
  });

  return (
    <>
      <View className="main" style="top:88px">
        {(data.isGenerated == 1 || data.isGenerated == 2) && (
          <View className="rect white">
            <Text className="top-left"></Text>
            <Text className="top-right"></Text>
            <Text className="bottom-left"></Text>
            <Text className="bottom-right"></Text>
            {data.isGenerated == 1 && (
              <View className="upload-photo" onTap={chooseImage}>
                <View>
                  <Image src={plusgray} />
                </View>

                <View style="font-size: 28rpx">上传照片</View>
                {data.count != null && (
                  <View style="font-size: 24rpx; color: #999; margin-top: 8rpx">
                    今日免费剩余：
                    {data.count === -1 ? "无限次" : data.count + "次"}
                  </View>
                )}
              </View>
            )}

            {data.isGenerated == 2 && (
              <View className="upload-photo">
                <View>
                  <Image src={rightblack}></Image>
                </View>
                <View style="font-size: 28rpx">上传成功</View>
              </View>
            )}
          </View>
        )}

        {data.isGenerated == 3 && (
          <Image
            src={data.uploadedImageUrl}
            mode="aspectFit"
            className="uploaded-image"
          ></Image>
        )}
      </View>

      {(data.isGenerated == 1 || data.isGenerated == 2) && (
        <View className="bottom">
          <View className="dpi-title">DPI设置：</View>
          <View className="dpi-input">
            <Field bordered={false}>
              <Input
                value={data.dpi}
                type="number"
                input-align="center"
                style="background: #F5F7FA; border-radius: 32rpx; padding: 10rpx 24rpx"
                placeholder="非必填（默认300）"
                onInput={onDpiInput}
              ></Input>
            </Field>
          </View>
          <View className="btn-wrapper">
            <Button
              className="btn btn-blue"
              onTap={imageDivision}
              disabled={disabled}
            >
              开始抠图
            </Button>
          </View>
        </View>
      )}

      {data.isGenerated == 3 && (
        <View className="bottom">
          <View className="btn-wrapper">
            <Button className="btn btn-back" onTap={handleBack}>
              返回
            </Button>
            <Button className="btn btn-download" onTap={downloadPic}>
              下载
            </Button>
          </View>
        </View>
      )}
    </>
  );
}
