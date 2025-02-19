import { View, Button, Image, Text } from "@tarojs/components";
import Taro, {
  usePullDownRefresh,
  useReachBottom,
} from "@tarojs/taro";
import { deletePhoto, getPhotoList } from "@/services";
import { SwipeCell } from "@taroify/core";
import "./index.scss";
import none from "../../images/none.png";
import { PhotoDto } from "@/dtos";
import useRequestWithMore from "@/hooks/useRequestWIthMore";

export default function Index() {
  const [eventsData, hasMore, refresh, getMoreData] =
    useRequestWithMore<PhotoDto>(getPhotoList);

  const remove = async (e) => {
    const itemId = e.target.dataset.item_id;
    await deletePhoto({
      image_id: itemId,
    });
    refresh!();
  };

  useReachBottom(() => {
    getMoreData!();
  });

  usePullDownRefresh(() => {
    refresh!();
  });

  const gotoDetail = (e) => {
    var itemId = e.currentTarget.dataset.item_id;
    Taro.navigateTo({
      url: `/pages/album-detail/index?image_id=${itemId}`,
    });
  };

  return (
    <View className="list">
      {eventsData ? (
        eventsData.map((item, index) => (
          <View key={index}>
            <SwipeCell right-width="65">
              <View className="item" data-index={index}>
                <Image
                  className="photo"
                  lazyLoad
                  mode="aspectFit"
                  src={item.file_path}
                ></Image>
                <View className="right">
                  <View>
                    <View className="name">{item.name}</View>
                    <View className="detail">
                      <Text>
                        {item.width} * {item.height}
                      </Text>
                    </View>
                    <View className="type type0">电子版</View>
                  </View>
                  <View className="date">{item.created_at}</View>
                  <Button
                    className="view-btn"
                    onTap={gotoDetail}
                    data-item_id={item.id}
                  >
                    查看
                  </Button>
                  <Button
                    className="delete-btn"
                    onTap={remove}
                    data-item_id={item.id}
                  >
                    删除
                  </Button>
                </View>
              </View>
            </SwipeCell>
          </View>
        ))
      ) : (
        <View className="none">
          <Image src={none} style="width: 100%;height: 100%;" />
        </View>
      )}
    </View>
  );
}
