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