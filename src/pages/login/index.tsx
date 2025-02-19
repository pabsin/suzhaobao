import { View, Text } from "@tarojs/components";
import { Button } from "@taroify/core";
import Taro, { useLoad } from "@tarojs/taro";
import { useUserStore } from "@/stores";
import { getUserInfo, login } from "@/services";
import "./index.scss";

export default function Index() {
  const title = process.env.TARO_APP_NAME;
  const userStore = useUserStore();

  const authLogin = () => {
    Taro.login({
      success: async (res) => {
        const accountInfo = Taro.getAccountInfoSync();
        let token = await login(res.code, accountInfo.miniProgram.appId);
        userStore.setToken(token);
        let user = await getUserInfo();
        userStore.setUser(user);
        Taro.navigateBack({
          delta: 1,
        });
      },
    });
  };

  useLoad(() => {
    console.log("Page loaded..");
  });

  return (
    <View className='container'>
      <View className='login-content'>
        <View className='bg-circles'>
          <View className='circle circle-1'></View>
          <View className='circle circle-2'></View>
          <View className='circle circle-3'></View>
        </View>

        <View className='welcome-text'>
          <Text style='font-size: 40rpx; font-weight: bold; color: #333;'>
            {title}
          </Text>
          <Text style='font-size: 28rpx; color: #666; margin-top: 20rpx;'>
            让证件照制作更简单
          </Text>
        </View>

        <Button
          style='width: 600rpx; height: 88rpx; border-radius: 44rpx; margin-top: 80rpx; background-color:#8280FF; color:white'
          onTap={authLogin}
        >
          快捷登录
        </Button>
      </View>
    </View>
  );
}
