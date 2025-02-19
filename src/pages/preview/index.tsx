import { View, Image, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { downloadIdPhoto, updateIdPhoto } from "@/services";
import { useEditorStore } from "@/stores/editor";
import { useEffect, useState } from "react";
import { Button, Dialog, Tabs } from "@taroify/core";
import "./index.scss";

export default function Index() {
  const editorStore = useEditorStore();
  const [color, setColor] = useState("#428eda");
  const [downloadable, setDownloadable] = useState(false);
  const colors = [
    "#ffffff",
    "#428eda",
    "#D9001B",
    "#539fed",
    "#b3b3b3",
    "#ac020b",
    "#2c4c80",
    "#ffdad8",
    "#fef7c6",
    "#d1f0dc",
    "#e4d7f3",
    "#c0e8e7",
    "#d0ddf5",
  ];

  useEffect(() => {
    updateColor();
  }, [color]);

  const changeBackgroundColor = (e) => {
    setColor(e.currentTarget.dataset.color);
  };

  const updateColor = async () => {
    let data = await updateIdPhoto({
      image_id: editorStore.origin_image_id,
      color: color,
      render: 0,
    });
    editorStore.setProcessedImageId(data.image_id);
    editorStore.setImageBase64(data.image_base64);
    setDownloadable(true);
  };

  const openSavePhoto = () => {
    if (downloadable) {
      return saveNormalPhoto();
    }
    Taro.showToast({
      title: "您还没有选择背景颜色哦~",
      icon: "none",
      duration: 3000,
    });
  };

  // 保存证件照
  const saveNormalPhoto = async () => {
    let data = await downloadIdPhoto({
      image_id: editorStore.processed_image_id,
    });
    Taro.navigateTo({
      url: `/pages/save-image/index?image_url=${data}`,
    });
  };


  useLoad(async () => {
    console.log("Page loaded.");
  });

  return (
    <View>
      <View className='wrapper'>
        <View className='rect'>
          <Text className='top-left'></Text>
          <Text className='top-right'></Text>
          <Text className='bottom-left'></Text>
          <Text className='bottom-right'></Text>
          <View className='bg white'></View>
          <Image
            className='photo'
            mode='widthFix'
            src={editorStore.image_base64}
          ></Image>
        </View>
      </View>
      <View className='edit-wrapper'>
        <View className='content'>
          <Tabs title-active-color='#4E47FD' line-width='40rpx'>
            <Tabs.TabPane
              title='背景'
              title-style='font-size: 24rpx; font-weight: 700;'
            ></Tabs.TabPane>
          </Tabs>
          <View className='colors'>
            {colors.map((item, index) => (
              <View
                key={index}
                className='color'
                onTap={changeBackgroundColor}
                data-color={item}
                style={`background: ${item}`}
              ></View>
            ))}
          </View>
        </View>
        <View className='bottom'>
          <Button className='btn' onTap={openSavePhoto} data-type='1'>
            保存预览照
          </Button>
          <Button className='btn' onTap={openSavePhoto} data-type='2'>
            保存高清照
          </Button>
        </View>
        <Dialog id='van-dialog' />
      </View>
    </View>
  );
}
