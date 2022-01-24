//
//  NEEduEnterRoomRequest.h
//  EduLogic
//
//  Created by Groot on 2021/5/18.
//  Copyright © 2021 NetEase. All rights reserved.
//  Use of this source code is governed by a MIT license that can be found in the LICENSE file
//

#import <Foundation/Foundation.h>
#import "NEEduStreams.h"
#import "NEEduUserProperty.h"

NS_ASSUME_NONNULL_BEGIN
/// 进入房间 请求
@interface NEEduEnterRoomRequest : NSObject
@property (nonatomic , strong) NEEduStreams              * streams;
@property (nonatomic , strong) NEEduUserProperty              * properties;
@property (nonatomic , copy) NSString              * role;
@property (nonatomic , copy) NSString              * userName;

@end

NS_ASSUME_NONNULL_END
