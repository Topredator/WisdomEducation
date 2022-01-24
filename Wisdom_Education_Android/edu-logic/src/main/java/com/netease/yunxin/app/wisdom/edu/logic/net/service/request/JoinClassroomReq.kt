/*
 * Copyright (c) 2021 NetEase, Inc.  All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 */

package com.netease.yunxin.app.wisdom.edu.logic.net.service.request

import com.netease.yunxin.app.wisdom.edu.logic.model.NEEduStreams

/** The request parameters for joining a room
 * @param userName
 * @param role
 * @param streams
 * */
data class JoinClassroomReq(
    val userName: String,
    val role: String,
    val streams: NEEduStreams?,
)