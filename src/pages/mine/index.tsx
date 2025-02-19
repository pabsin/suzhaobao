import { View, Text, Button, Image, Input, Camera } from "@tarojs/components";
import Taro, { useDidShow, useLoad, useShareAppMessage, useShareTimeline } from "@tarojs/taro";
import { API_ME } from "@/constants";
import request, { upload } from "@/services/request";
import { UserDto } from "@/dtos";
import { useUserStore } from "@/stores";
import {
  Edit,
  FlowerOutlined,
  Gift,
  GiftOutlined,
  PhotoOutlined,
  Question,
  QuestionOutlined,
  ServiceOutlined,
  ShareOutlined,
  StarOutlined,
} from "@taroify/icons";
import "./index.scss";
import defaultAvatar from "../../images/tx.jpg";
import { updateAvatar, updateNickname } from "@/services";
import { useState } from "react";

export default function Index() {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [nickname, setNickname] = useState('陌生人');
  const [modalType, setModalType] = useState('');
  const [days, setDays] = useState(0);

  const userStore = useUserStore((state) => state);

  const openEditProfileModal = () => {
    setModalType('editProfile');
  };

  const onChooseAvatar = (e) => {
    const { avatarUrl } = e.detail;
    setAvatar(avatarUrl);
  };

  const onNicknameInput = (e) => {
    setNickname(e.detail.value);
  };

  const closeModal = () => {
    setModalType('');
  };

  const mywork = () => {
    Taro.navigateTo({
      url: "/pages/album/index",
    });
  };

  const evaluate = () => {
    Taro.openBusinessView({
      businessType: "servicecommentpage",
      extraData: {
        mch_id: "1230000109",
        service_id: "88888888000011",
        out_order_no: "1234323JKHDFE1243252",
        timestamp: "1530097563",
        nonce_str: "zyx53Nkey8o4bHpxTQvd8m7e92nG5mG2",
        sign_type: "HMAC-SHA256",
        sign: "029B52F67573D7E3BE74904BF9AEA",
      },
      success: (res) => {
        console.log(res);
      },
      fail: (res) => {
        console.log(res);
      },
    });
  };

  const navigateToEdit = () => {
    setModalType('rights');
  };

  const navigateToFree = () => {
    setModalType('questions');
  };

  useShareAppMessage(() => {
    return {
      title: "哇塞，这个证件照小程序也太好用了吧！好清晰，还免费",
      path: "pages/home/index",
      imageUrl: "../../images/share.jpg",
    };
  });

  useShareTimeline(() => {
    return {
      title: "哇塞，这个证件照小程序也太好用了吧！好清晰，还免费",
      path: "pages/home/index",
      imageUrl: "../../images/share.jpg",
    };
  });

  const goLogin = () => {
    Taro.navigateTo({
      url: "/pages/login/index",
    });
  };

  const updateUserInfo = async () => {
    const avatarChanged = avatar != defaultAvatar;
    const nicknameChanged = nickname != '陌生人';

    if (avatarChanged) {
      let result = await updateAvatar(avatar);
    }

    if (nicknameChanged) {
      let result = await updateNickname({
        name: nickname,
      });
    }

    setModalType('');
  };

  return (
    <View className="my-page">
      <View className="top">
        {userStore.token == "" ? (
          <View className="user-image" onTap={goLogin}>
            <Image
              style="width: 100%; height: 100%;"
              mode="aspectFill"
              src={avatar}
            ></Image>
          </View>
        ) : (
          <View className="user-image" onTap={openEditProfileModal}>
            <Image
              style="width: 100%; height: 100%;"
              mode="aspectFill"
              src={userStore.user.avatar}
            ></Image>
          </View>
        )}

        {userStore.token == "" ? (
          <View className="user-name" style="width:6em;" onTap={goLogin}>
            <View>登录/注册</View>
          </View>
        ) : (
          <View
            className="user-name"
            style="width:6em;"
            onTap={openEditProfileModal}
          >
            <View className="nickname">
              Hi，{userStore.user.name}
              <Edit
                size="16px"
                onTap={openEditProfileModal}
                className="edit-icon"
              />
            </View>
            <View className="user-days" onTap={openEditProfileModal}>
              证件照伴侣已经陪伴你走过 {days} 天
            </View>
          </View>
        )}
      </View>

      <View className="container">
        <View className="button-container">
          <Button className="button-item" onTap={mywork}>
            <View className="icon-text">
              <PhotoOutlined size="30px" />
              <Text>我的作品</Text>
            </View>
          </Button>
          <Button className="button-item" onTap={navigateToEdit}>
            <View className="icon-text">
              <GiftOutlined size="30px" />
              <Text>我的权益</Text>
            </View>
          </Button>
          <Button className="button-item" onTap={navigateToFree}>
            <View className="icon-text">
              <QuestionOutlined size="30px" />
              <Text>常见问题</Text>
            </View>
          </Button>
          <Button className="button-item" open-type="contact">
            <View className="icon-text">
              <ServiceOutlined size="30px" />
              <Text>客服中心</Text>
            </View>
          </Button>
          <Button className="button-item" onTap={evaluate}>
            <View className="icon-text">
              <StarOutlined size="30px" />
              <Text>赏好评</Text>
            </View>
          </Button>
          <Button className="button-item" open-type="share">
            <View className="icon-text">
              <ShareOutlined size="30px" />
              <Text>分享</Text>
            </View>
          </Button>
        </View>
      </View>

      {modalType === "rights" && (
        <View className="modal">
          <View className="modal-content">
            <View className="modal-body">
              <View className="modal-title">我的权益</View>
              <View className="modal-list">
                <Text>● 你目前已经解锁基础功能，并无限制使用;</Text>
                <Text>● 你目前享受一对一专属客服，7x24全年极速响应;</Text>
                <Text>● 待解锁：美颜，照片转卡通形象;</Text>
                <Text>● 请多多分享小程序，系统将自动为您解锁。</Text>
              </View>
              <Button onTap={closeModal}>我明白了</Button>
            </View>
          </View>
        </View>
      )}

      {modalType === "questions" && (
        <View className="modal">
          <View className="modal-content">
            <View className="modal-body">
              <View className="modal-title">常见问题</View>
              <View className="modal-list">
                <Text>● 制作证件照收费吗？ 答：完全免费;</Text>
                <Text>
                  ● 我的隐私是否安全？
                  答：我们不保存您上传的照片，只记录您主动触发下载时的生成图;
                </Text>
                <Text>● 在哪里查看下载记录？ 答：我的作品;</Text>
              </View>
              <Button onTap={closeModal}>我明白了</Button>
            </View>
          </View>
        </View>
      )}

      {modalType === "editProfile" && (
        <View className="modal">
          <View className="modal-content">
            <View className="modal-body">
              <View className="modal-title">编辑个人资料</View>
              <View className="edit-profile-form">
                <Button
                  className="avatar-wrapper"
                  open-type="chooseAvatar"
                  onChooseAvatar={onChooseAvatar}
                >
                  <Image
                    className="avatar"
                    src="{{avatarFile}}"
                    mode="aspectFill"
                  ></Image>
                  <View className="overlay">
                    <PhotoOutlined size="24px" color="#fff" />
                    <Text className="overlay-text">更换头像</Text>
                  </View>
                </Button>
                <Input
                  type="nickname"
                  className="nickname-input"
                  placeholder="请输入昵称(非必填)"
                  value={nickname}
                  onInput={onNicknameInput}
                />
              </View>
              <Button className="save-button" onTap={updateUserInfo}>
                保存
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
