/*
 * Copyright (c) 2021 NetEase, Inc.  All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 */

package com.netease.yunxin.app.wisdom.edu.logic.net.service.request

/**
 * Send peer-to-peer messages
 *
 * @property type The message type
 * @property body
 */
data class UserMsgReq(var type: Int, val body: MutableMap<String, Any>?)

