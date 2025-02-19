import Taro from "@tarojs/taro";

enum StorageSceneKey {
    USER = "storage-user",
    SPECS = "storage-specs",
    PHOTOS = "storage-photos",
    EDITOR = "storage-editor",
}

export { StorageSceneKey };

export const zustandStorage = () => ({
    getItem: (name: string) => Taro.getStorageSync(name),
    setItem: (name: string, value: any) => Taro.setStorageSync(name, value),
    removeItem: (name: string) => Taro.removeStorageSync(name)
});