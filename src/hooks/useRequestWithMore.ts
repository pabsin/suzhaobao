import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { useEffect, useRef, useState } from 'react';
import {
  defaultParams,
  PULL_DOWN_REFRESH_EVENT,
  REACH_BOTTOM_EVENT,
} from '../constants';
import events from '@/utils';

export default function useRequestWithMore<T, S = {}>(
  request: (data: any) => Promise<T[] | null>,
  data: S | Object = {},
): [T[] | null, boolean, () => void, () => void] | [] {
  const [currData, setData] = useState<T[] | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [params, setParams] = useState(defaultParams);
  const pageReachBottomRef = useRef('');
  const pagePullDownRef = useRef('');
  const loadingRef = useRef(false);

  useEffect(() => {
    if (hasMore) {
      loadingRef.current = true;
      request({ ...params, ...data })
        .then((data) => {
          if (data) {
            if (currData) {
              setData([...currData, ...data]);
            } else {
              setData(data);
            }
            if (data.length < params.page_size!) {
              setHasMore(false);
            }
          }
        })
        .finally(() => {
          loadingRef.current = false;
          Taro.stopPullDownRefresh();
          Taro.hideLoading();
        });
    }
  }, [params]);

  usePullDownRefresh(() => {
    refresh();
  });

  useEffect(() => {
    events.on(REACH_BOTTOM_EVENT, (page: string) => {
      if (loadingRef.current) {
        return;
      }
      if (!pageReachBottomRef.current) {
        pageReachBottomRef.current = page;
      } else if (pageReachBottomRef.current !== page) {
        return;
      }
      getMoreData();
    });
    return () => {
      events.off(REACH_BOTTOM_EVENT);
    };
  }, []);

  useEffect(() => {
    events.on(PULL_DOWN_REFRESH_EVENT, (page: string) => {
      if (!pagePullDownRef.current) {
        pagePullDownRef.current = page;
      } else if (pagePullDownRef.current !== page) {
        return;
      }
      refresh();
    });
    return () => {
      events.off(PULL_DOWN_REFRESH_EVENT);
    };
  }, []);

  useReachBottom(() => {
    if (loadingRef.current) {
      return;
    }
    getMoreData();
  });

  const getMoreData = () => {
    setParams((params) => ({ ...params, page: params.page! + 1 }));
  };

  const refresh = () => {
    setData(null);
    setHasMore(true);
    setParams({ ...params, page: 1 });
  };

  return [currData, hasMore, refresh, getMoreData];
}