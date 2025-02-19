import { View, Text, Image, ScrollView } from "@tarojs/components";
import Taro, { useLoad, usePullDownRefresh } from "@tarojs/taro";
import { Search } from "@taroify/core";
import { Fire } from "@taroify/icons";
import { getSpecsList } from "@/services";
import { useState } from "react";
import { useEditorStore } from "@/stores/editor";
import { SpecsDto } from "@/dtos";
import "./index.scss";
import camera from "../../images/camera.png";

export default function Index() {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const editorStore = useEditorStore((state) => state);
  const [photoSizeList, setPhotoSizeList] = useState<SpecsDto[]>([]);

  const onSearchChange = (e) => {
    const value = e.detail.value;
    setSearchValue(value);
    setPage(1);
    setPhotoSizeList([]);
    if (value) {
      searchData(value);
    }
  };

  const onHotSearch = (e) => {
    const value = e.currentTarget.dataset.keyword;
    setSearchValue(value);
    setPage(1);
    setPhotoSizeList([]);

    if (value) {
      searchData(value);
    }
  };

  const searchData = async (name) => {
    Taro.showLoading({ title: "搜索中..." });
    let data = await getSpecsList({
      page: page,
      page_size: 20,
      name: name,
    });
    Taro.hideLoading();

    setPhotoSizeList(old => old.concat(data));
    setPage(page + 1);
    setHasMore(data.length > 0);
  };

  usePullDownRefresh(() => {
    setPage(1);
    setPhotoSizeList([]);
    searchData(searchValue);
    Taro.stopPullDownRefresh();
  });

  const loadMoreData = () => searchData(searchValue);

  const onReachBottom = () => {
    if (hasMore) {
      loadMoreData();
    } else {
      Taro.showToast({
        title: "没有更多尺寸啦~",
        icon: "none",
      });
    }
  };

  const goNextPage = (e) => {
    editorStore.setSpecId(photoSizeList[e.currentTarget.dataset.index].id);
    Taro.navigateTo({
      url: "/pages/spec-detail/index",
    });
  };

  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View style='display: flex; flex-direction: column;'>
      <Search
        value={searchValue}
        onChange={onSearchChange}
        shape='rounded'
        placeholder='搜索证件照名称、尺寸'
        style='margin: 0rpx 10rpx;'
      />

      {!searchValue && (
        <View>
          <View className='hotSearchBgView'>
            <View style='display: flex; flex-direction: row; margin: 0rpx 0rpx 20rpx 30rpx;'>
              <Fire color='#ec7575' />
              <View style='font-weight: 700; margin-left: 10rpx;'>
                热门搜索
              </View>
            </View>
            <View className='hotSearchTagBgView'>
              <View
                className='hotSearchTag'
                onTap={onHotSearch}
                data-keyword='一寸'
              >
                <Text style='font-size: 24rpx;line-height: 24rpx;'>一寸</Text>
              </View>
              <View
                className='hotSearchTag'
                onTap={onHotSearch}
                data-keyword='二寸'
              >
                <Text style='font-size: 24rpx;line-height: 24rpx;'>二寸</Text>
              </View>
              <View
                className='hotSearchTag'
                onTap={onHotSearch}
                data-keyword='小一寸'
              >
                <Text style='font-size: 24rpx;line-height: 24rpx;'>小一寸</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      <ScrollView
        style='height: calc(100vh - 200rpx);'
        scroll-y
        onScrollToLower={onReachBottom}
        enhanced
        show-scrollbar={false}
      >
        {photoSizeList.map((item, index) => (
          <View
            key={index}
            style='margin: 15rpx 35rpx;'
          >
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
