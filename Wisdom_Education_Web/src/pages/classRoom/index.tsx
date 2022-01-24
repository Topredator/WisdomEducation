/*
 * @Copyright (c) 2021 NetEase, Inc.  All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file
 */
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { Layout, Spin } from 'antd';
import { useRoomStore, useUIStore, useAppStore } from '@/hooks/store';
import { GlobalStorage } from '@/utils';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '@/component/header';
import Footer from '@/component/footer';
import { RoleTypes } from '@/config';
import logger from '@/lib/logger';
// const { Header, Footer } = Layout;


const RoomControl: React.FC = observer(({ children }) => {
  const appStore = useAppStore();
  const roomStore = useRoomStore();
  const history = useHistory();
  const location= useLocation();
  const uiStore = useUIStore();
  const { loading } = uiStore;

  const listenCloseTab = (e) => {
    (e || window.event).returnValue = "确定离开当前页面吗？";
  }

  useEffect(() => {
    const joinParams = GlobalStorage.read('user');
    if (!joinParams?.role) {
      history.push('/');
      return;
    }
    window.history.pushState(null, document.title, window.location.href);

    const handlePopState = (evt: any) => {
      window.history.pushState(null, document.title, null);
      window.addEventListener('popstate', handlePopState, false)
    }
    if (!roomStore.joined) {
      uiStore.setLoading(true);
      roomStore.join(joinParams).then(() => {
        uiStore.showToast('加入房间成功');
      }).catch((err) => {
        console.error('加入房间失败', err);
        const userInfo = GlobalStorage.read('user');
        switch (Number(err?.message)) {
          case 1002:
            if (userInfo && userInfo.role === RoleTypes.host) {
              uiStore.showToast('老师数量超过限制');
            } else {
              uiStore.showToast('学生数量超过限制');
            }
            break;
          case 400:
            uiStore.showToast('参数错误');
            break;
          case 401:
            break;
          case 1017:
            uiStore.showToast("创建房间时房间已经存在且房间类型冲突");
            break;
          case 1004:
            break;  
          default:
            uiStore.showToast(err?.message || '加入房间失败');
            break;
        }
        setTimeout(() => {
          roomStore.leave()
          history.push('/');
        }, 1500);
        // uiStore.showToast(`${err?.message || '加入房间失败'}`, 'error');
      }).finally(() => {
        uiStore.setLoading(false);
      });
    }
    window.addEventListener('beforeunload', listenCloseTab);
    return () => {
      window.removeEventListener('popstate', handlePopState, false)
      window.removeEventListener('beforeunload', listenCloseTab);
    }
  }, [history, location.pathname, roomStore, uiStore]);

  return (
    <div className="room-control">
      {uiStore.loading ? <div className="room-loading"><Spin className="room-loading-spin" /></div> : null}
      <Layout className="layout-outer">
        <Header />
        <Layout>
          {children}
        </Layout>
        <Footer />
      </Layout>
    </div>
  )
});
const RoomPage:React.FC = observer(({ children }) => {
  return (
    <RoomControl>
      {children}
    </RoomControl>
  )
})

export default RoomPage
