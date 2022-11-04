# 2.2.3
1. `createLocalScreen` : **[refactor]** 화면 공유용 스트림은 기본으로 HD 모드가 적용되었습니다. 이는 더 높은 비트레이트를 사용합니다.
2. `수신비디오 품질 조정` :  **[change]** 비디오 수신시 기본 품질이 low에서 middle로 변경되었습니다.
3. `stat 이벤트`
 - createRoom에 stat 이벤트 호출 간격을 조정할 수 있는 statInterval 옵션이 추가되었습니다. 기본값 5000(5초)
 - 기존 PerSecond 항목이 PerInterval으로 변경되었습니다.
 - 기존 availableOutgoingBitrate, availableIncomingBitrate은 삭제되었습니다.
 - frameWidth, frameHeight, framesPerSecond, bytesSentPerInterval, packetsSentPerInterval, bytesReceivedPerInterval, currentRTT가 추가되었습니다.

# 2.2.2
1. **[fix]** 내부에서 사용되던 로그 레벨 초기화 버그가 수정되었습니다.
2. `getStats` : **[remove]** 기존 webrtc stats 정보를 제공하던 getStats()가 삭제되었습니다. 대신 getLocalStats, getRemoteStats이 추가 되었습니다.
3. `getLocalStats` : **[add]** 송신시의 미디어와 네트워크에 관한 정보를 담고있는 webrtc stats를 반환합니다. 이는 webrtc stats의 모든 정보를 담고 있습니다.
4. `getRemoteStats` : **[add]** 수신시의 미디어와 네트워크에 관한 정보를 담고있는 webrtc stats를 반환합니다. 이는 webrtc stats의 모든 정보를 담고 있습니다.
5. `stat 이벤트 추가` : **[add]** on('stat') 으로 정의 가능한 이벤트가 추가되었습니다. 해당 이벤트는 1초에 한번씩 현재 송수신 품질에 대한 정보를 반환받습니다. getLocalStats나 getRemoteStats와 달리 품질을 판단할 수 있는 몇가지의 대표 값들만을 반환합니다.

# 2.2.1
1. `sendUserMessage(targets, message, type)` : **[refactor]** 마지막 인자로 type이 추가되었습니다. type을 명시할 경우 메시지의 성격을 정의할 수 있습니다. 예를 들어, 공지사항의 경우 type을 notice와 같이 설정할 수 있습니다. 만약 type을 생략할 경우 기본 normal이 설정됩니다. 
2. `userMessage 이벤트` : **[refactor]** sendUserMessage가 변경됨에 따라 userMessage 이벤트에 전달되어지는 인자도 변경되었습니다. 기존 인자로 전달되는 객체에 type이 추가되었습니다.
3. **[fix]** 내부에서 사용되던 websocket의 재접속 버그가 픽스되었습니다.

# 2.2.0
1. `getRemoteAudioLevels()` : **[refactor]** 편안히 말하는 소리의 레벨값이 50 ~ 70, 큰소리는 70 이상 정도 되도록 변경되었습니다.
2. `serviceSecret` : **[refactor]** 서비스 인증시 입력하던 serviceKey와 secret이 하나로 합쳐졌습니다. 기존 serviceKey와 secret를 serviceSecret에 '서비스키:시크릿' 형태로 입력합니다. 기존 serviceKey와 secret는 삭제되었습니다.
3. `endpoint` : **[refactor]** 인증 서버를 변경할 수 있었던 endpoint가 기존 도메인만 받던 것에서 경로를 포함한 전체 URL을 받도록 변경되었습니다.
4. **[fix]** 재 connect시 내부에서 사용하던 이벤트가 중복 정의되는 버그가 픽스되었습니다. 해당 버그 픽스는 "이미 구독중인 스트림입니다" 에러를 방지할 수 있습니다.

# 2.1.1
1. `getRemoteAudioLevels()` : **[refactor]** 리모트 참여자의 오디오 레벨을 반환하는 getRemoteAudioLevels() 메서드가 변경되었습니다. 기존 0 ~ 1까지의 반환값이 0 ~ 100까지의 퍼센티지로 변경되었습니다.
2. `VanillaJS를 위한 빌드 옵션 변경` : **[refactor]** VanillaJS 사용시 ConnectLive.default.signIn와 같은 사용법이 ConnectLive.signIn으로 변경되었습니다.

# 2.1.0
ConnectLive 2.0의 WebSDK가 정식 오픈했습니다. 많은 관심 바랍니다.