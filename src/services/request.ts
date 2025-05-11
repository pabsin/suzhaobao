import Taro from '@tarojs/taro';
import { useUserStore } from "@/stores";

const host = process.env.TARO_APP_API_HOST || 'http://127.0.0.1:8080';

export default async function fetch<T = any>(options): Promise<T> {
  const { url, method = 'GET', header = {} } = options;

  const token = useUserStore.getState().token;
  header['Accept'] = 'application/json';
  header['x-api-version'] = 'v1';

  if (token != '') {
    header['Authorization'] = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    Taro.request({
      url: host + url,
      method,
      data: options.data,
      header
    }).then(async (res) => {
      const { statusCode, data } = res;
      if (statusCode >= 200 && statusCode < 300) {
        return resolve(data as unknown as Promise<T>);
      }

      if (statusCode === 401) {
        return Taro.navigateTo({
          url: '/pages/login/index'
        });
      }

      if (data.error) {
        Taro.showToast({
          title: '请求异常',
          icon: 'none'
        })
      }

      return reject(data)
    }).catch((err) => {
      console.log(err)
      const defaultMsg = '请求异常'
      Taro.showToast({
        title: defaultMsg,
        icon: 'none'
      })

      return reject({ message: defaultMsg, ...err })
    })

  });
}

export async function upload<T = any>(options): Promise<T> {
  const { url, name, filePath, header = {} } = options;

  const token = useUserStore.getState().token;
  header['Accept'] = 'application/json';
  header['x-api-version'] = 'v1';

  if (token != '') {
    header['Authorization'] = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: host + url,
      name,
      filePath,
      header
    }).then(async (res) => {
      const { statusCode, data } = res;
      if (statusCode >= 200 && statusCode < 300) {
        return resolve(data as unknown as Promise<T>);
      }

      if (statusCode === 401 || statusCode === 403) {
        return Taro.navigateTo({
          url: '/pages/login/index'
        });
      }

      return reject(data)
    }).catch((err) => {
      console.log(err)
      const defaultMsg = '请求异常'
      Taro.showToast({
        title: defaultMsg,
        icon: 'none'
      })

      return reject({ message: defaultMsg, ...err })
    })

  });
}
