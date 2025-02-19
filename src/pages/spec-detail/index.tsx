import {
  View,
  Image,
  Swiper,
  SwiperItem,
  Switch,
  Text,
} from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { createIdPhoto, getPhotoItem, uploadPhoto } from "@/services";
import { useEditorStore } from "@/stores/editor";
import { useState } from "react";
import { Button } from "@taroify/core";
import "./index.scss";
import guide from "../../images/guide_icon.png";
import guide1 from "../../images/guide1.png";
import guide2 from "../../images/guide2.png";
import guide3 from "../../images/guide3.png";
import guide4 from "../../images/guide4.png";
import guide5 from "../../images/guide5.png";
import { useUserStore } from "@/stores";

export default function Index() {
  const editorStore = useEditorStore();
  const token = useUserStore((state) => state.token);
  const [isBeautyOn, setIsBeautyOn] = useState(0);
  const swiperDatas = [guide1, guide2, guide3, guide4, guide5];

  const onBeautySwitch = (e) => {
    setIsBeautyOn(e.detail.value ? 1 : 0);
  };

  const chooseImage = () => {
    if (token.length < 1) {
      Taro.navigateTo({
        url: "/pages/login/index",
      });
      return;
    }
    Taro.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sourceType: ["album"],
      sizeType: ["original"],
      camera: "back",
      success: (res) => {
        const file = res.tempFiles[0];
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 15) {
          Taro.showToast({
            title: "图片太大啦，不能超15M哦",
            icon: "none",
            duration: 2000,
          });
          return;
        }
        imgUpload(res.tempFiles[0].tempFilePath);
      },
    });
  };

  const openConfirm = () => {
    Taro.showModal({
      content: "检测到您没打开访问摄像头权限，是否打开？",
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          Taro.openSetting({
            success: () => {},
          });
        }
      },
    });
  };

  const chooseCamera = () => {
    if (token.length < 1) {
      Taro.navigateTo({
        url: "/pages/login/index",
      });
      return;
    }
    Taro.getSetting({
      success(res) {
        if (res.authSetting["scope.camera"]) {
          Taro.navigateTo({
            url: "/pages/camera/index",
          });
        } else {
          Taro.authorize({
            scope: "scope.camera",
            success() {},
            fail() {
              openConfirm();
            },
          });
        }
      },
      fail() {},
    });
  };

  const imgUpload = async (filePath) => {
    Taro.showLoading({
      title: "图片检测中",
    });

    let data = await uploadPhoto(filePath);
    Taro.hideLoading();

    imageDivision(data);
  };

  const imageDivision = async (image_id) => {
    Taro.showLoading({
      title: "制作中...",
    });

    editorStore.setOriginImageId(image_id);

    let res = await createIdPhoto({
      image_id: image_id,
      item_id: editorStore.spec_id,
      is_beauty_on: isBeautyOn,
    });
    Taro.hideLoading();
    editorStore.setOriginImageId(res.image_id);
    editorStore.setImageBase64(res.image_base64);

    Taro.navigateTo({
      url: "/pages/preview/index",
    });
  };

  useLoad(async () => {
    let item = await getPhotoItem({ id: editorStore.spec_id });
    editorStore.setSpec(item);
    console.log("Page loaded.");
  });

  return (
    <View>
      <View className="info">
        <View className="info-title">{editorStore.spec?.name}</View>
        <View className="info-data">
          <View className="info-data-title">照片尺寸</View>
          <View className="info-data-content">
            {editorStore.spec?.width_mm}*{editorStore.spec?.height_mm}
          </View>
        </View>
        <View className="info-data">
          <View className="info-data-title">照片规格</View>
          <View className="info-data-content">
            {editorStore.spec?.width_px}*{editorStore.spec?.height_px}
          </View>
        </View>
        <View className="info-data">
          <View className="info-data-title">照片底色</View>
          <View
            className="info-data-content"
            style="display: flex; flex-direction: row;"
          >
            <View className="color white"></View>
            <View className="color blue"></View>
            <View className="color red"></View>
            <View className="color rainbow"></View>
          </View>
        </View>
        <View className="info-data">
          <View className="info-data-title">文件大小</View>
          <View className="info-data-content">不限制</View>
        </View>
      </View>

      <View style="margin-top: 35rpx;">
        <View style="display: flex; margin-left: 35rpx;">
          <Image src={guide} style="width: 44rpx; height: 44rpx;"></Image>
          <View style="margin-left: 26rpx; font-weight: 700; font-size: 34rpx;">
            拍摄指南
          </View>
        </View>
        <Swiper autoplay className="guide">
          {swiperDatas.map((item, index) => (
            <SwiperItem key={index}>
              <Image src={item} className="guide-item"></Image>
            </SwiperItem>
          ))}
        </Swiper>
      </View>

      <View className="beauty-switch">
        <Text>美颜</Text>
        <Switch
          checked={isBeautyOn == 1}
          onChange={onBeautySwitch}
          color="#8280FF"
        />
      </View>

      <View className="bottom">
        <Button className="btn btn-left" onTap={chooseImage}>
          从相册中选择
        </Button>
        <Button className="btn btn-right" onTap={chooseCamera}>
          拍摄
        </Button>
      </View>
    </View>
  );
}
