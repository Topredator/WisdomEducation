//
//  NEEduChatRoom.h
//  EduLogic
//
//  Created by Groot on 2021/5/18.
//  Copyright © 2021 NetEase. All rights reserved.
//  Use of this source code is governed by a MIT license that can be found in the LICENSE file
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NEEduChatRoom : NSObject
@property (nonatomic, strong) NSString *roomCreatorId;
@property (nonatomic, strong) NSString *chatRoomId;

@end

NS_ASSUME_NONNULL_END
