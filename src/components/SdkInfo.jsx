import ConnectLive from '@connectlive/connectlive-web-sdk';

const SdkInfo = ({  }) => {
  const onClick = () => {
    alert('개발자 도구를 열어 로그를 확인할 수 있습니다.');
  };
  return (
    <div className="absolute bottom-5 right-5 text-white ">
      <span>{ ConnectLive.version }</span>
      <button 
        className="ml-3 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-300 hover:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={onClick}>Show Log</button>
    </div>
  );
};

export default SdkInfo;