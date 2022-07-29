# Kakao i Connect Live 소개
- 카카오 i 커넥트 라이브(Kakao i Connect Live)는 개발자들이 라이브 스트리밍(Live Streaming) 서비스를 쉽게 개발하고 운영할 수 있는 환경을 제공하는 클라우드 기반 라이브 스트리밍 플랫폼(CPaaS: Communication Platform as a Service)입니다. 라이브 스트리밍 서비스 개발 시 필수 플랫폼인 CPaaS로서 통화, 방송, 회의, 하이브리드 서비스 개발을 지원합니다.

- 한국에서 가장 오랫동안 운영되고 있는 CPaaS로서 개발뿐만 아니라 운영에 필요한 경험과 안정성을 가지고 있으며, WebRTC 기술을 기반으로 어떠한 라이브 스트리밍 기술보다 빠른 레이턴시(Latency)와 우수한 호환성을 제공합니다. 또한, 기기의 성능이나 네트워크 상황에 따라 최적의 라이브 영상 서비스 구현을 위한 개발 도구인 카카오 i 커넥트 라이브 SDK와 클라우드 인프라를 제공합니다.

# Web SDK 소개
- 별다른 서버 개발없이 라이브스트리밍 웹 서비스를 개발할 수 있는 SDK 입니다.

# 지원 환경
- 지원 브라우저: Chrome, Firefox, Safari, Edge, Mobile Chrome(Android), Mobile WebView(Android, iOS), Mobile Safari 
- 지원 플랫폼: Windows, MacOS, Linux, Android, iOS

# 설치
- npm
```
npm install @connectlive/connectlive-web-sdk
```
- cdn
```
//최신버전
<script src="https://cdn.jsdelivr.net/npm/@connectlive/connectlive-web-sdk/dist/connectlive-web-sdk.min.js"></script>

//특정버전
<script src="https://cdn.jsdelivr.net/npm/@connectlive/connectlive-web-sdk@2.1.0/dist/connectlive-web-sdk.min.js"></script>
```

# 예제
### 온라인 예제
바로 실행해 볼 수 있는 예제를 제공하고 있습니다.
- 해당 예제는 추후 업데이트 될 예정입니다.

### 화상회의 예제
ConnectLive의 기능을 활용한 화상회의 예제입니다.
- https://github.com/kakaoi-clive/web-sample

# 문서 및 링크
- https://docs.kakaoi.ai/connect_live/
- https://connectlive.kakaoi.ai/


# 화상회의 예제
### 설치 및 실행
```
npm install && npm run dev
```

http://localhost:3000/web-sample 으로 실행 가능합니다.


# API
### 미디어 생성하기
사용자 컴퓨터의 오디오와 비디오 장치에 접근할 수 있는 방법을 제공합니다. 기본 사용법은 아래와 같습니다.
```
const localMedia = await ConnectLive.createLocalMedia(({
    audio: true,
    video: true
});
```

생성된 로컬 미디어video, audio 속성을 가지고 있습니다.
비디오의 경우는 다음 3가지 방법으로 비디오 태그와 연결할 수 있습니다.

```
// 방법 1. attach를 이용해 새로운 엘리먼트를 생성한다.
const video = localMedia.video.attach();
document.querySelector('.local').appendChild(video);

// 방법 2. attach에 비디오 엘리먼트를 전달한다.
document.querySelector('.local').appendChild(document.elementById('비디오태그아이디'));

// 방법 3. 기존 엘리먼트에 미디어스트림을 직접 연결한다.
document.getElementById('video-tag-id').srcObject = localMedia.video.getMediaStream();
```
위 방법 중 1, 2번은 detach()로 연결을 해제 및 엘리먼트를 삭제 할 수 있습니다.

```
localMedia.video.detach();
```

### **Local 장치 목록 가져오기**
```
//오디오 장치 가져오기
await localMedia.getMicDevices();

//비디오 장치 가져오기
await localMedia.getCameraDevices();

//스피커 장치 가져오기
await localMedia.getSpeakerDevices();
```

장치 목록을 가져오는 API는 Promise객체를 반환하며 다음과 같이 사용할 수 있습니다.
```
const cameraDevices = await localMedia.getCameraDevices();

console.log(cameraDevices);
\*
    [{
        deviceId: "8d1f5a537f0f2ae93e610734b053f10385df93d3ffddf33e47faa758109aa531"
        groupId: "fbb0bd92666880c78bec7ff6dd683d56af51e14ac34322b883c65882789c005b"
        kind: "videoinput"
        label: "Snap Camera"
    }, {
        deviceId: "5b99e9442edc7ea16d6209e1e3164ee458eb7771e62b396156d972ff3314d4c3"
        groupId: "5efce94d3f5483f5e5dee3efb637f3ba3916e7b9bdfcf59052eaa763ebc871d9"
        kind: "videoinput"
        label: "FaceTime HD 카메라(내장형) (05ac:8514)"
    }]
*/
});
```

### **비디오 장치 변경하기**
switchCamera로 접근 중인 비디오 장치를 변경할 수 있습니다. 예를 들어 전면 카메라를 사용하다 후면 카메라로 변경할 수 있습니다. 만약 switchCamera시 이미 화상회의를 진행중이라면, 기존 비디오 영상을 제거하고 새로운 카메라로 연결을 바로 이어 갑니다.

```
await localMedia.switchCamera('디바이스아이디');
//localMedia.video.attach()등을 통해 새로 비디오 엘리먼트를 연결해 비디오를 재생할 수 있습니다.
```

### **마이크 장치 변경하기**
switchMic로 접근 중인 마이크 장치를 변경할 수 있습니다. 예를 들어 전면 노트북 마이크를 사용하다 이어폰 마이크를 변경할 수 있습니다. 만약 switchMic시 이미 화상회의를 진행중이라면, 기존 오디오를 제거하고 새로운 마이크의 오디오로 연결을 이어갑니다.

```
await localMedia.switchMic('디바이스아이디');
```

### **스피커 장치 변경하기**
switchSpeaker 상대방의 오디오를 재생 중인 스피커를 변경할 수 있습니다. 예를 들어 전면 노트북 스피커에서 이어폰으로 변경할 수 있습니다. switchSpeaker 메서드는 localMedia가 아닌 room 객체에서 제공함을 유의해주세요.

```
await room.switchSpeaker('디바이스아이디');
```


### ** HD 모드 적용하기
publish 전에 video의 품질을 좋게 하기 위해 HD 모드를 적용할 수 있습니다.
```
localMedia.video.setHd(true);
```


### **화상회의**
화상회의 서비스를 위해서는 ConnectLive.createRoom()를 통해 화상회의 객체를 선언합니다.

```
const room = ConnectLive.createRoom({
    //options
});
```

이 때 옵션을 넘길 수 있습니다. createRoom가 취하는 옵션은 다음과 같습니다.

|**이름**|**기본값**|**설명**|
| :-: | :-: | :-: |
|videoReceiverInitialCount|10|초기 영상 리시버 개수|
|videoReceiverGrowthRate|10|영상 리시버가 부족한 경우 증가 단위|
|videoReceiverMaximumCount|50|최대 영상 리시버 개수|


### **미디어 공유하기**
자신의 미디어를 공유하려면 publish API를 사용합니다. 다음과 같이 로컬 미디어 객체를 publish API의 인자로 전달하기만 하면 됩니다.

```
await room.publish([ localMedia ]);
```

### **미디어 구독하기**
상대방의 비디오를 구독하려면 subscribe API를 사용합니다. 

```
const remoteVideos = await room.subscribe([videoId]);

const video = remoteVideos[0].attach();
document.querySelector('.remote-container').appendChild(video);
```

비디오 아이디를 배열로 subscribe에 전달하면 구독이 완료된 리모트 비디오 배열을 반환합니다. 반환되는 리모트 비디오 객체 attach 메소드를 제공하며 이를 통해 video 태그에 바인딩하면 상대방 비디오에 대한 구독이 완료됩니다.

비디오 아이디는 참여자 객체의 getUnsubscribedVideos()를 통해 알 수 있습니다. 이는 참여자의 현재 구독중이지 않은 리모트 비디오 배열을 반환합니다. 

```
room.on('connected', (e)=>{
    //기존 참여자 배열을 순회하며 비디오 구독 및 엘리먼트 생성
    e.participants.forEach(async (participant) => {
        const unsubscribedVideos = participant.getUnsubscribedVideos();
        const remoteVideos = await room.subscribe([unsubscribedVideos[0].videoId]);
        const video = remoteVideos[0].attach();
        document.querySelector('.remote-container').appendChild(video);
    });
});
```

```
room.on('remoteVideoPublished', (e)=>{
    const remoteVideos = await room.subscribe([e.remoteVideo.videoId]);
    const remoteVideo = remoteVideos[0].attach();
    document.querySelector('.remote-container').appendChild(remoteVideo);
});
```

### **미디어 공유 해제하기**
자신의 비디오 공유를 해제하려면 unpublish API를 사용합니다. 공유과 마찬가지로 로컬 비디오 배열 객체를 받습니다.

```
await room.unpublish([ localMedia ]);
```

상대방이 자신의 비디오를 공유해제했다면 이는 remoteVideoUnpublished이벤트로 연결됩니다. 해당 이벤트 내에서 상대방의 비디오를 제거합니다.

```
room.on('remoteVideoUnpublished', (evt)=>{
    evt.remoteVideo.detach();
});
```

### **미디어 구독 해제하기**
상대방의 비디오 구독을 해제하려면 unsubscribe API를 사용합니다. 구독과 마찬가지로 비디오 아이디를 받습니다.

```
await room.unsubscribe([videoId]);
```

### **오디오를 점유하고 있는 참여자 알아내기**
ConnectLive 화상회의는 오디오를 최대 4개까지만 제공하고 있습니다. 이는 곧 오디오를 점유하고 있는 참여자의 오디오를 4개까지만 재생한다는 것입니다. 그 이상의 오디오 재생은 혼란을 증가 시켜 실제 알아들을 수 없는 대화가 됩니다. 오디오를 점유하고 있다고 해서 실제로 말을 하고 있다는 뜻은 아닙니다. 오디오를 점유하지만 해당 참여자도, 다른 참여자도 모두 말을 하고 있지 않다면. 오디오 점유는 그대로 유지됩니다.


오디오 점유자는 room.audioOccupants를 통해 알 수 있으며, 점유자가 변경되었다는 것은 remoteAudioSubscribe와 remoteAudioUnsubscribe이벤트로 알 수 있습니다.
```
// 현재 오디오 점유자 배열 반환
room.audioOccupants
```

```
//참여자가 오디오를 점유했을때
room.on(‘remoteAudioSubscribed’, evt => {
    evt.participant
});
```

```
//참여자가 오디오 점유를 잃었을때
room.on(‘remoteAudioUnsubscribed’, evt => {
    evt.participant
});
```

### **각 참여자의 오디오 레벨 가져오기**
오디오를 점유하고 있는 참여자와는 별도로 각 참여자의 오디오 레벨을 가져올 수 있습니다. 오디오 레벨을 통해 실제 말하고 있는 참여자에 대한 표시를 할 수 있습니다. 아래 메서드를 주기적으로 호출해 오디오 레벨을 가져옵니다.

```
room.getRemoteAudioLevels();
\*
{
    remoteParticipants: [{
        remoteParticipant: RemoteParticipant,
        level: 0.00630957344480193
    }]
}
*/
```

### **수신 중인 비디오의 품질 변경하기**
리모트 비디오 객체에는 setQuality라는 메소드를 제공하고 있습니다. 해당 메소드는 인자로 “l”, “m”, “h”라는 인자 중 하나를 받습니다. 각각 low, middle, high를 뜻합니다. 
high는 하나만 유지됩니다. 만약 A, B 비디오를 순서대로 high 지정했다면 마지막으로 지정한 B만 high로 설정됩니다.

```
const remoteVideo = remoteParticipant.getVideo(‘비디오 아이디’)

remoteVideo.setQuality(‘h’);
```


### **화면용 미디어 생성하기**
ConnectLive는 프리젠테이션을 위한 화면 공유를 지원합니다. 화면 공유용 미디어 객체를 얻기 위해서는 createLocalScreen API를 이용 합니다.

```
const localScreen = await ConnectLive.createLocalScreen({
    audio: true,
    video: true
});

// 생성한 미디어는 localMedia와 동일하게 publish로 공유할 수 있습니다.
await room.publish( [ localScreen ] );
```
화면 공유용 객체 선언시 audio옵션을 줄 수 있습니다. 이 경우, 공유한 크롭 탭에서 현재 오디오가 재생되고 있다면 해당 오디오까지 공유되어집니다.

### **화면용 미디어임을 표시하기**
화면 공유용 비디오 객체를 생성했다면, 해당 객체가 화면 공유를 위한 비디오임을 표시할 수 있습니다. ConnectLive 트랙 객체는 setExtraValue라는 API를 제공합니다. 이는 해당 트랙에 원하는 형태의 문자열 값을 추가할 수 있고 이 값을 참여자들과 공유할 수 있습니다. 여기에 화면 공유용 트랙임을 명시합니다. 여기서는 screen이라는 문자열 값을 명시했지만 원하는 어떠한 값이든 상관없습니다.

```
localScreen.video.setExtraValue('screen');
```

화면 공유 비디오는 서비스마다 다르게 보일 수 있습니다. 예를 들어, 화면 공유 비디오를 가운데 크게 보이길 원한다거나 혹은 모든 참여자가 공유한 화면 공유 비디오를 바둑판식으로 배열할 수도 있습니다. 그러려면 다른 일반 비디오와 구분해야할 필요가 있습니다. 위 코드에서 participant.getUnsubscribeVideos()와 e.remoteVideo 에 주목해 보면 이들이 리모트 비디오 객체를 반환한다는 것을 알 수 있습니다. 리모트 비디오 객체는 videoId 외에 extraValue라는 값을 전달합니다. 이 값을 이용해 상대방이 공유한 화면 공유 비디오를 구분 할 수 있습니다.

이제 상대방이 공유한 화면 공유 비디오를 구독해야 합니다. 구독은 역시 connected이벤트와 remoteVideoPublished이벤트와 subscribe API를 그대로 이용합니다.

```
room.on('connected', (evt)=>{
    //기존 참여자 배열을 순회하며 비디오 구독 및 엘리먼트 생성
    evt.participants.forEach(async (participant) => {
        const unsubscribeRemoteVideos= participant.getUnsubscribeVideos();
        if(unsubscribeRemoteVideos[0].extraValue === 'screen') {
            //화면 공유
            const remoteVideos = await room.subscribe([unsubscribeRemoteVideos[0].videoId]);
        } else {
            //일반 비디오
        }
    });
});
```

```
room.on('remoteVideoPublished', (evt)=>{
    if(evt.remoteVideo.extraValue === 'screen') {
        //화면 공유
        const remoteVideos = await room.subscribe([evt.remoteVideo.videoId]);
    } else {
        //일반 비디오
    }
});
```

### **녹화하기**
ConnectLive는 본인의 화면을 녹화할 수 있습니다. 기본 사용 방법은 아래와 같습니다.
```
await room.publish(([localMedia], true);
```
위와 같이 publish 메서드의 두번째 인자를 true로 지정합니다. 만약 이미 local media를 publish하고 있다면 unpublish후 publish를 다시 진행합니다.
```
await room.unpublish([localMedia]);

await room.publish([localMedia], true);
```
녹화 결과는 웹훅으로 전달됩니다.


### **로그출력하기**
개발 기간 중에는 SDK의 로그 레벨을 조절하여 개발자 도구 콘솔에 상세한 로그를 기록하거나 제거 할 수 있습니다.
trace > debug > info > error > off 순으로 에러를 출력합니다. 기본값은 TRACE로 모든 로그를 출력합니다. 개발시에 Connectlive SDK의 로그가 필요 없다고 한다면 로그 출력을 끌수 있습니다.
```
ConnectLive.logger.setLevel('off');
```


## **에러 처리**
Connectlive 에러 객체는 두가지 타입으로 나눠집니다. ServerError, ClientError 타입입니다. 이름에서도 알 수 있듯이, 각각 서버 에러와 클라이언트 에러에 대한 정보를 담고 있습니다.
에러 객체는 code와 메시지 속성을 지니고 있으며 해당 에러를 통해 어떤 에러인지 구분할 수 있습니다.

** 서버 에러
서버 에러 / 메시지가 전달됩니다.


** 클라이언트 에러
|**code**|**message**|**설명**|
| :- | :- | :- |
| 1103 | 인증을 위한 서비스 정보가 입력되지 않았습니다. |  |
| 1106 | 룸 생성 전 인증이 필요합니다. |  |
| 1203 | getUserMedia 실패(native 원본 메시지) |  |
| 1204 | getDisplayMedia 실패(native 원본 메시지) |  |
| 1205 | 오디오 트랙을 획득했지만 종료 상태입니다. |  |
| 1206 | 비디오 트랙을 획득했지만 종료 상태입니다. |  |
| 1207 | 비디오 품질 변경 인자는 'l', 'm', ''h 중 하나여야 합니다. |  |
| 1301 | 입력한 룸 id가 지원하지 않는 길이, 문자를 포함합니다.(32자 이하, 영문자/숫자/- 만 가능) |  |
| 1321 | 이미 구독 중인 스트림입니다. xxx, xxx |  |
| 1322 | 리시버 갯수는 maxReceiverCount를 초과할 수 없습니다. |  |
| 1323 | 빈 streamIds이 전달되었습니다. |  |
| 1324 | 빈 배열이 전달되었습니다. |  |
| 1401 | PeerConnection 생성이 실패했습니다. |  |
| 1402 | 데이터 채널 생성이 실패했습니다. |  |
| 1411 | PeerConnection 연결 상태가 failed 입니다. |  |
| 1442 | 스트림 추가 에러(native 원본 메시지) |  |
| 1446 | 스트림 제거 에러(native 원본 메시지) |  |
| 1448 | 리시버 추가 에러(native 원본 메시지) |  |
| 1901 | ConnectLive로 부턱 직접 객체를 선언할 수 없습니다. |  |
| 1904 | HTTP 세션에 오류가 발생했습니다. |  |


### **서비스 인증 에러처리**
```
//await
try{
    await ConnectLive.signIn({
        serviceId: '서비스아이디',
        serviceKey: '서비스키',
        secret: '시크릿키',
    });
} catch (err) {
    //에러 처리
}
```

### **connect시 에러 처리**
```
//await 사용시
try{
    await room.connect('룸 아이디');
} catch () {
    //에러 처리
}
```

### **미디어 공유 에러 처리**
```
//await 사용시
try{
    await room.publish( [localMedia] );
} catch (err) {
    //에러 처리
}
```

### **미디어 구독 에러 처리**
```
//await 사용시
try{
    await room.subscribe(비디오아이디배열);
} catch (err) {
    //에러 처리
}
```

### **P2P 연결 실패 에러**
ConnectLive는 미디어 서버와 클라이언트가 p2p로 연결되어 오디오와 비디오를 송수신 합니다. 이때 p2p로 연결된 미디어 서버와의 네트워크 상황 등에 의해 연결을 실패할 수 있습니다. 이러한 상황에 대응할 수 있도록 화상 회의 객체에 error 콜백을 등록할 수 있습니다. 해당 이벤트 안에서 disconnect를 호출하고 초기 화면으로 이동한다 등의 에러 처리가 필요합니다.

```
room.on('error', ()=>{
    //에러 처리
    room.disconnect();
});
```


### **이벤트**
위에서 소개한 API외에 화상 회의 객체는 다음과 같은 이벤트를 더 제공하고 있습니다.

|**이름**|**인자**|**설명**|
| :-: | :-: | :-: |
| connecting | progress: number | 연결과정에서 각 과정이 지날때마다 호출됩니다. 연결 과정은 0 ~ 100%까지로 표현됩니다. |
| connected |{ participants: [] } | 룸에 성공적으로 접속하면 호출 되는 이벤트 입니다. 인자로 기존 접속하고 있는 participants 목록이 인자로 전달됩니다. |
| participantEntered |{ participant: {} } | 새로운 참여자가 들어오면 호출 되는 이벤트 입니다. 참여자 객체를 인자로 전달됩니다. |
| participantLeft |{ participantId: '' } | 참여자가 룸에서 떠나면 호출되는 이벤트입니다. 나간 참여자 아이디가 인자로 전달됩니다. |
| localMediaPublished | localMedia: LocalMedia | 자신의 로컬 미디어를 공유하면 호출되는 이벤트입니다. |
| localMediaUnpublished | localMedia: LocalMedia | 자신의 로컬 미디어를 공유 해제하면 호출되는 이벤트입니다. |
| remoteVideoPublished | remoteParticipant: RemoteParticipant, remoteVideo: RemoteVideo | 상대 참여자가 비디오를 공유하면 호출됩니다. 인자로 참여자 객체와 비디오 객체가 전달됩니다. 비디오객체 안의 비디오 아이디를 이용해 해당 비디오를 구독하고 비디오 태그에 비디오를 바인딩 할 수 있습니다.|
| remoteVideoUnpublished | remoteParticipant: RemoteParticipant, remoteVideo: RemoteVideo | 상대 참여자가 비디오 공유를 해제하면 호출됩니다. 인자로 참여자 객체와 비디오 객체가 전달됩니다. 비디오 객체를 이용해 비디오 태그에 비디오를 해제할 수 있습니다. |
| remoteAudioPublished | remoteParticipant: RemoteParticipant, remoteAudio: RemoteAudio | 상대 참여자가 오디오를 공유하면 호출됩니다. 인자로 참여자 객체와 오디오 객체가 전달됩니다. |
| remoteAudioUnpublished | remoteParticipant: RemoteParticipant, remoteAudio: RemoteAudio | 상대 참여자가 오디오 공유를 해제하면 호출됩니다. 인자로 참여자 객체와 오디오 객체가 전달됩니다. |
| remoteAudioSubscribe | remoteParticipant: RemoteParticipant, remoteAudio: RemoteAudio | 4개의 오디오 중 하나를 참여자가 점유하면 호출 되는 이벤트입니다. |
| remoteAudioUnsubscribe | remoteParticipant: RemoteParticipant, remoteAudio: RemoteAudio | 점유하고 있던 오디오가 해제되면 호출되는 이벤트 이다. 해당 사용자가 말을 하지 않고 있다는 것을 의미한다. |
| remoteAudioStateChanged | remoteParticipant: RemoteParticipant, remoteAudio: RemoteAudio | 다른 참여자의 오디오의 상태 alwaysOn 또는 enabled가 변경되면 호출됩니다. alwaysOn이란, 오디오를 계속적으로 점유해서 나의 오디오가 항시 전달되도록 하는 기능입니다. LocalAudiod의 setAlwaysOn 메소드로 이를 설정할 수 있습니다. enabled을 false로 설정할 경우, 오디오를 잠시 mute 결과를 얻을 수 있습니다. LocalAudio의 setEnabled 메소드로 이를 설정할 수 있습니다. |
| remoteVideoStateChanged | remoteParticipant: RemoteParticipant, remoteVideo: RemoteVideo | 다른 참여자의 비디오 상태 곧 enabled 상태가 변경되면 호출됩니다. enabled을 false로 설정할 경우, 비디오를 잠시 mute 결과를 얻을 수 있습니다. LocalVideo의 setEnabled 메소드로 이를 설정할 수 있습니다. |
| disconnected | reason | 컨퍼런스 룸에서 정상적으로 나오면 호출되는 이벤트. reason이 'disconnected'인 경우 정상 종료. 'destroyed'인 경우 강제 종료. 'kicked'인 경우 강제 퇴장입니다. |
| error | 에러(ServerError, ClientError) | 최종 연결이 실패했을 경우, 호출됩니다. 해당 에러 이벤트에서 초기화면으로 이동한다든가 하는 행위가 필요합니다. |
| userMessage | sender: RemoteParticipantId, message: string |  |