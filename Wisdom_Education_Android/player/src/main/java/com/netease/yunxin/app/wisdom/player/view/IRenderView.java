/*
 *  Copyright (c) 2021 NetEase, Inc.  All rights reserved.
 *  Use of this source code is governed by a MIT license that can be found in the LICENSE file
 */

package com.netease.yunxin.app.wisdom.player.view;

import android.view.Surface;

import com.netease.yunxin.app.wisdom.player.sdk.model.VideoScaleMode;


/**
 * Render View public interface
 * <p>
 *
 * @author netease
 */

public interface IRenderView {

    interface SurfaceCallback {
        void onSurfaceCreated(Surface surface);

        void onSurfaceDestroyed(Surface surface);

        void onSurfaceSizeChanged(Surface surface, int format, int width, int height);
    }

    void onSetupRenderView();

    void setVideoSize(int videoWidth, int videoHeight, int videoSarNum, int videoSarDen, VideoScaleMode scaleMode);

    Surface getSurface();

    void setCallback(SurfaceCallback callback);

    void removeCallback();

    void showView(boolean show);
}
