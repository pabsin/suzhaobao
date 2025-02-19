import { View, Image } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
// import home3 from "../../images/3.png";
// import home4 from "../../images/4.png";
// import home5 from "../../images/5.png";
// import home6 from "../../images/6.png";
// import home7 from "../../images/7.png";
// import home8 from "../../images/8.png";

export default function Index() {
  let colourizeCount = 0;
  let mattingCount = 0;
  let generateLayoutCount = 0;
  let cartoonCount = 0;
  let imageDefinitionEnhanceCount = 0;

  const sizeListTo = () => {
    Taro.navigateTo({
      url: "/pages/sizeList/index",
    });
  };

  const stop = () => {
    Taro.showToast({
      title: "该功能维护中，暂停使用",
      icon: "none",
      duration: 3000,
    });
  };

  const navigateTo = (e) => {
    const type = e.currentTarget.dataset.type;
    let title;
    let title2;
    let description;
    if (type == 4) {
      title = "六寸排版照";
      title2 = "一键生成精美排版照";
      description =
        "适用于生成证件照后进行六寸排版，支持自定义宽/高/KB/DPI，让您的照片更加精美大方";
    } else if (type == 5) {
      title = "老照片上色";
      title2 = "一键让图片充满色彩";
      description = "适用于老照片，旧照片，黑白照片等，进行AI上色";
    } else if (type == 6) {
      title = "智能抠图";
      title2 = "一键轻松抠出图像";
      description = "适用于人像，宠物，物品，植物等照片进行抠图";
    } else if (type == 7) {
      title = "照片清晰度增强";
      title2 = "一键让模糊图片变清晰";
      description = "适用于模糊图变清晰，老照片清晰化，质量低照片，无损放大";
    } else if (type == 8) {
      title = "新海诚动漫风";
      title2 = "一键转换动漫风格";
      description = "适用于照片转新海诚动漫风格，让照片充满艺术感";
    }
    Taro.navigateTo({
      url:
        "/pages/exploreHandle/index?type=" +
        type +
        "&title=" +
        title +
        "&title2=" +
        title2 +
        "&description=" +
        description,
    });
  };

  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className='explore-container'>
      {/* <View className='explore-header'>
        <View className='explore-header-left'>
          <text className='explore-header-title'>探索神奇的魔力🪄 </text>
          <text className='explore-header-subtitle'>
            让照片处理变得简单有趣✨{" "}
          </text>
        </View>
      </View>

      <View className='explore-grid'>
        <View className='explore-row'>
          <View className='explore-card' onTap={sizeListTo} data-type='3'>
            <Image className='card-image' mode='aspectFill' src={home3}></Image>
            <View className='card-content'>
              <View className='card-title'>智能证件照🎭</View>
              <View className='card-desc'>支持多种尺寸+自定义背景</View>
            </View>
          </View>

          {generateLayoutCount != -1 && (
            <View className='explore-card' onTap={navigateTo} data-type='4'>
              <Image
                className='card-image'
                mode='aspectFill'
                src={home4}
              ></Image>
              <View className='card-content'>
                <View className='card-title'>六寸排版照✨</View>
                <View className='card-desc'>一键生成精美照片排版</View>
              </View>
            </View>
          )}
        </View>

        <View className='explore-row'>
          {colourizeCount != -1 && (
            <View className='explore-card' onTap={navigateTo} data-type='5'>
              <Image
                className='card-image'
                mode='aspectFill'
                src={home5}
              ></Image>
              <View className='card-content'>
                <View className='card-title'>老照片上色🎨</View>
                <View className='card-desc'>一键让黑白照片充满色彩</View>
              </View>
            </View>
          )}

          {mattingCount != -1 && (
            <View className='explore-card' onTap={navigateTo} data-type='6'>
              <Image
                className='card-image'
                mode='aspectFill'
                src={home6}
              ></Image>
              <View className='card-content'>
                <View className='card-title'>智能抠图✂️</View>
                <View className='card-desc'>一键迅捷抠图，智能抠图</View>
              </View>
            </View>
          )}
        </View>

        <View className='explore-row'>
          {imageDefinitionEnhanceCount != -1 && (
            <View className='explore-card' onTap={stop} data-type='7'>
              <Image className='card-image' mode='aspectFill' src={home7}>
                <View className='other-msg'>
                  <View className='card-stats'>⛔ 维护中 | 暂停使用</View>
                </View>
              </Image>
              <View className='card-content'>
                <View className='card-title'>照片清晰增强✨</View>
                <View className='card-desc'>一键让模糊图片变清晰</View>
              </View>
            </View>
          )}

          {cartoonCount != -1 && (
            <View className='explore-card' onTap={navigateTo} data-type='8'>
              <Image
                className='card-image'
                mode='aspectFill'
                src={home8}
              ></Image>
              <View className='card-content'>
                <View className='card-title'>新海诚动漫风🎨</View>
                <View className='card-desc'>一键转换动漫风格照片</View>
              </View>
            </View>
          )}
        </View>
      </View> */}
    </View>
  );
}
