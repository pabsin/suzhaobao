import { View, Image, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { useEditorStore } from "@/stores/editor";
import { Button } from "@taroify/core";
import { useState } from "react";
import { savePicUrlAndImg } from "@/utils";
import "./index.scss";

export default function Index() {
  const editorStore = useEditorStore();
  const [image_url, setImageUrl] = useState('');

  useLoad(async (e) => {
    setImageUrl(e.image_url)
    console.log("Page loaded.");
  });

  return (
    <View className='wrapper'>
      <View className='top'>
        <View className='image-wrapper'>
          <Image
            className='photo'
            mode='aspectFit'
            style='width: 80vw; height: 60vh;'
            src={editorStore.image_base64}
          ></Image>
        </View>
      </View>
      <View className='bottom'>
        <View className='specs'>
          <View className='title'>电子证件照</View>
          <View className='infos'>
            {editorStore.spec?.width_mm}*{editorStore.spec?.height_mm}mm
            <Text> </Text>
            {editorStore.spec?.width_px}*{editorStore.spec?.height_px}px
          </View>
        </View>
        <Button onTap={() => savePicUrlAndImg(image_url)} className='save-btn'>
          下载
        </Button>
      </View>
    </View>
  );
}
