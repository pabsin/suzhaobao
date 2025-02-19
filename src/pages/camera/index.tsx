import { View, Image, Camera } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { useEditorStore } from "@/stores/editor";
import { useState } from "react";
import { createIdPhoto, uploadPhoto } from "@/services";
import camera2 from "../../images/camera2.png";
import person from "../../images/person.png";
import back from "../../images/back.png";
import go from "../../images/go.png";
import reverse from "../../images/reverse.png";
import "./index.scss";


export default function Index() {
  const editorStore = useEditorStore();
  const [cameraPostion, setCameraPostion] = useState("front");
  const [photoSrc, setPhotoSrc] = useState("");

  const reverseCamera = () => {
    if (cameraPostion === "back") {
      setCameraPostion("front");
      return;
    }
    if (cameraPostion === "front") {
      setCameraPostion("back");
      return;
    }
  };

  // 拍照
  const photo = () => {
    const ctx = Taro.createCameraContext();
    ctx.takePhoto({
      quality: "high",
      success: (res) => {
        setPhotoSrc(res.tempImagePath);
      },
    });
  };

  // 去上传抠图编辑
  const goEditPhoto = () => {
    if (photoSrc) {
      Uploadimg(photoSrc);
    }
  };

  // 返回拍照
  const goBackPhoto = () => {
    setPhotoSrc("");
  };

  //返回前一页
  const goPreEdit = () => {
    setPhotoSrc("");
    Taro.navigateBack({
      delta: 1,
    });
  };

  // 上传原图
  const Uploadimg = (filePath) => {
    const fileSizeMB = filePath.size / (1024 * 1024);
    // 检查文件大小
    if (fileSizeMB > 15) {
      Taro.showToast({
        title: "图片太大啦，不能超15M哦",
        icon: "none",
        duration: 2000,
      });
      return;
    }

    imgUpload(filePath);
  };

  // 上传原图
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
      is_beauty_on: 0,
    });
    Taro.hideLoading();
    editorStore.setOriginImageId(res.image_id);
    editorStore.setImageBase64(res.image_base64);
    Taro.navigateTo({
      url: "/pages/preview/index",
    });
  };

  useLoad(async () => {
    console.log("Page loaded.");
  });

  return (
    <View className='camera'>
      {!photoSrc ? (
        <Camera
          device-position={cameraPostion}
          flash='off'
          onError={(e) => console.log(e)}
          style='width: 100%; height: 100%;'
        ></Camera>
      ) : (
        <View className='contain-photo'>
          <Image src={photoSrc}></Image>
        </View>
      )}

      <View className='person'>
        <Image mode='scaleToFill' src={person}></Image>
      </View>
      {photoSrc ? (
        <View>
          <View className='iconfont icon_back' onTap={goBackPhoto}>
            <Image
              src={back}
              style='width:100%; height:100%'
            ></Image>
          </View>
          <View className='iconfont icon_confirm' onTap={goEditPhoto}>
            <Image
              src={go}
              style='width:100%; height:100%'
            ></Image>
          </View>
        </View>
      ) : (
        <View>
          <View className='iconfont icon_back' onTap={goPreEdit}>
            <Image
              src={back}
              style='width:100%; height:100%'
            ></Image>
          </View>
          <View className='iconfont icon_cameraC' onTap={photo}>
            <Image
              src={camera2}
              style='width:100%; height:100%'
            ></Image>
          </View>
          <View className='iconfont icon_cameraT' onTap={reverseCamera}>
            <Image
              src={reverse}
              style='width:100%; height:100%'
            ></Image>
          </View>
        </View>
      )}
    </View>
  );
}
