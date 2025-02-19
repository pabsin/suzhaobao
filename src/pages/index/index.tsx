import { View, Text, Image, ScrollView } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { useEditorStore } from "@/stores/editor";
import { Search, Tabs } from "@taroify/core";
import { getSpecsList } from "@/services";
import { useEffect, useState } from "react";
import { SpecsDto } from "@/dtos";
import { useUserStore } from "@/stores";
import "./index.scss";
import oneinch from "../../images/one-inch.png";
import twoinch from "../../images/two-inch.png";
import changebg from "../../images/change-bg.png";
import camera from "../../images/camera.png";

export default function Index() {
  const [active, setActive] = useState(1);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [photoSizeList, setPhotoSizeList] = useState<SpecsDto[]>([]);
  const userStore = useUserStore((state) => state);

  useEffect(() => {
    getSizeList();
  }, [active, userStore.token]);

  const editorStore = useEditorStore((state) => state);

  const getSizeList = async () => {
    if (!hasMore) {
      return;
    }

    let data = await getSpecsList({
      page: page,
      page_size: 20,
      class: active,
    });

    setPhotoSizeList(old => old.concat(data));
    setPage(page + 1);
    setHasMore(data.length > 0);
  };

  const moredata = () => {
    if (hasMore) {
      getSizeList();
    } else {
      Taro.showToast({
        title: "没有更多尺寸啦~",
        icon: "none",
      });
    }
  };

  const changeTab = (event) => {
    setActive(() => event);
    setPage(1);
    setPhotoSizeList([]);
    setHasMore(true);
  };

  const goNextPage = (e) => {
    editorStore.setSpecId(photoSizeList[e.currentTarget.dataset.index].id);

    Taro.navigateTo({
      url: `/pages/spec-detail/index`,
    });
  };

  const navigateTo = (e) => {
    Taro.navigateTo({
      url: e.currentTarget.dataset.url,
    });
  };

  const indexGoNextPage = (e) => {
    editorStore.setSpecId(photoSizeList[e.currentTarget.dataset.type].id);
    Taro.navigateTo({
      url: `/pages/spec-detail/index`,
    });
  };

  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View>
      <Search
        onTap={navigateTo}
        data-url='/pages/search/index'
        shape='rounded'
        placeholder='搜索证件照名称、尺寸'
        style='margin: 0rpx 10rpx;'
      />

      <View style='display: flex; width: 100%; height: 370rpx; margin: 15rpx 0rpx 30rpx 0rpx;'>
        <View style='margin-left: 35rpx;' onTap={indexGoNextPage} data-type='0'>
          <Image src={oneinch} style='width: 328rpx; height: 370rpx;'></Image>
        </View>
        <View style='width: 50%; display: flex; flex-direction: column; margin-left: 26rpx;'>
          <View
            style='width: 332rpx; height: 172rpx;'
            onTap={indexGoNextPage}
            data-type='1'
          >
            <Image src={twoinch} style='width: 332rpx; height: 172rpx;'></Image>
          </View>
          <View
            style='width: 332rpx; height: 172rpx; margin-top: 29rpx;'
            onTap={navigateTo}
            data-url='/pages/cutout/index'
          >
            <Image
              src={changebg}
              style='width: 332rpx; height: 172rpx;'
            ></Image>
          </View>
        </View>
      </View>

      <Tabs
        title-active-color='#4E47FD'
        line-width='40rpx'
        ellipsis={false}
        defaultValue='1'
        onChange={changeTab}
        sticky
        animated
        swipeable
      >
        <Tabs.TabPane
          title='常用尺寸'
          value='1'
          title-style='font-size: 28rpx; font-weight: 700;'
        ></Tabs.TabPane>
        <Tabs.TabPane
          title='各类证件'
          value='2'
          title-style='font-size: 28rpx; font-weight: 700;'
        ></Tabs.TabPane>
        <Tabs.TabPane
          title='各类签证'
          value='3'
          title-style='font-size: 28rpx; font-weight: 700;'
        ></Tabs.TabPane>
      </Tabs>

      <ScrollView
        style='height: calc(100vh - 200rpx);'
        scroll-y
        onScrollToLower={moredata}
        enhanced
        show-scrollbar={false}
      >
        {photoSizeList.map((item, index) => (
          <View key={index} style='margin: 15rpx 35rpx;'>
            <View
              style='width: 100%; height: 140rpx; margin-top: 30rpx; display: flex; justify-content: center;'
              onTap={goNextPage}
              data-index={index}
            >
              <View style='width: 675rpx; height: 132rpx; background: #FFFFFF; box-shadow: 2rpx 1rpx 4rpx 3rpx rgba(52, 51, 51, 0.06); border-radius: 20px; display: flex; flex-direction: row;'>
                <View style='width: 100%; height: 100%; margin-left: 35rpx;'>
                  <View style='padding: 24rpx 0rpx 10rpx 5rpx;'>
                    <Text style='font-weight: 600; font-size: 28rpx; line-height: 39rpx; color: #323232;'>
                      {item.name}
                    </Text>
                  </View>
                  <View style='display: flex; flex-direction: row; justify-content: flex-start;'>
                    <View style='height: 30rpx; width: 60rpx; background: #E8E8FF; border-radius: 100rpx;'>
                      <Text style='color: #BDBDFF; font-size: 20rpx; line-height: 28rpx; display: flex; align-items: center; padding-left: 10rpx;'>
                        宽高
                      </Text>
                    </View>
                    <Text style='font-size: 24rpx; line-height: 34rpx; color: #D3D3D3; margin-left: 16rpx;'>
                      {item.width_mm}*{item.height_mm}mm
                    </Text>
                    <View style='height: 30rpx; width: 60rpx; background: #E8E8FF; border-radius: 100rpx; margin-left: 66rpx;'>
                      <Text style='color: #BDBDFF; font-size: 20rpx; line-height: 28rpx; display: flex; align-items: center; padding-left: 10rpx;'>
                        像素
                      </Text>
                    </View>
                    <Text style='font-size: 24rpx; line-height: 34rpx; color: #D3D3D3; margin-left: 16rpx;'>
                      {item.width_px}*{item.height_px}px
                    </Text>
                  </View>
                </View>
                <View style='width: 80rpx; height: 100%; display: flex; flex-direction: column; justify-content: center;'>
                  <Image
                    src={camera}
                    style='width: 44rpx; height: 44rpx;'
                  ></Image>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
