import { View, Button, Image, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { useState } from "react";
import { savePicUrlAndImg } from "@/utils";
import { PhotoDto } from "@/dtos";
import { getPhotoDetail } from "@/services";
import "./index.scss";

export default function Index() {
  const [photo, setPhoto] = useState<PhotoDto>();

  const loadPhoto = async (image_id) => {
    let data = await getPhotoDetail({id: image_id});
    setPhoto(data);
  }

  useLoad((e) => {
    loadPhoto(e.image_id);
    console.log("Page loaded.");
  });

  return (
    <View className="wrapper">
      {photo ? (
        <>
          <View className="top">
            <View className="image-wrapper">
              <Image
                className="photo"
                mode="aspectFit"
                style="width: 80vw; height: 60vh;"
                src={photo.file_path}
              ></Image>
            </View>
          </View>
          <View className="bottom">
            <View className="specs">
              <View className="title">电子证件照</View>
              <View className="infos">
                <Text>
                  {photo.width} x {photo.height}
                </Text>
                <View></View>
                {photo.created_at}
              </View>
            </View>
            <Button
              className="save-btn"
              onTap={() => savePicUrlAndImg(photo.file_path)}
            >
              下载
            </Button>
          </View>
        </>
      ) : (
        <></>
      )}
    </View>
  );
}
