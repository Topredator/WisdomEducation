/*
 * @Copyright (c) 2021 NetEase, Inc.  All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file
 */


import { observable, autorun, action, toJS, computed, makeObservable } from 'mobx';
import { GlobalStorage } from '@/utils';
import { RoomStore } from './room';
import { WhiteBoardStore } from './whiteboard';
import { UIStore } from '@/store/ui';
import { RecordStore } from './record';



export class AppStore {
  @observable
  private _roomInfo: Record<string, string> = {}


  roomStore: RoomStore;
  whiteBoardStore: WhiteBoardStore;
  uiStore:UIStore;
  recordStore: RecordStore;

  constructor() {
    makeObservable(this);
    this.load();
    // if roomInfo changes, update storage
    autorun(() => {
      const data = toJS(this)
      GlobalStorage.save("room", {
        roomInfo: data._roomInfo,
      })
    });

    (window as any).allStore = this

    this.roomStore = new RoomStore(this);
    this.whiteBoardStore = new WhiteBoardStore(this);
    this.uiStore = new UIStore(this);
    this.recordStore = new RecordStore(this);
  }

  @computed
  get roomInfo(): Record<string, string> {
    return this._roomInfo;
  }

  /**
   * @description: Get the roomInfo after each loading
   * @param {*}
   * @return {*}
   */
  private load(): void {
    const storage = GlobalStorage.read("room")
    if (storage) {
      this._roomInfo = storage.roomInfo
    }
  }

  /**
   * @description: reset roomInfo
   * @param {*}
   * @return {*}
   */
  @action
  resetRoomInfo(): void {
    this._roomInfo = {}
  }
  /**
   * @description: Set roomInfo
   * @param {*}
   * @return {*}
   */
  @action
  setRoomInfo(payload: any): void {
    this._roomInfo = {
      roomName: payload.roomName,
      roomUuid: payload.roomUuid,
      sceneType: payload.sceneType,
      role: payload.role,
      userName: payload.userName,
      userUuid: payload.userUuid,
    }
  }
}
