import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { ServiceInfo } from '../../store/serviceInfo';
import { CogIcon } from '@heroicons/react/solid';

const Settings = ({  }) => {
  const [serviceInfo, setServiceInfo] = useRecoilState(ServiceInfo);

  const [showModal, setShowModal] = useState(false);

  const [type, setType] = useState(serviceInfo.type);
  const [internalServiceId, setInternalServiceId] = useState(serviceInfo.internal.serviceId);
  const [internalServiceKey, setInternalServiceKey] = useState(serviceInfo.internal.serviceKey);
  const [internalSecret, setInternalSecret] = useState(serviceInfo.internal.secret);
  const [internalEndpoint, setInternalEndpoint] = useState(serviceInfo.internal.endpoint);


  const [externalServiceId, setExternalServiceId] = useState(serviceInfo.external.serviceId);
  const [externalToken, setExternalToken] = useState(serviceInfo.external.token);
  const [externalEndpoint, setExternalEndpoint] = useState(serviceInfo.external.endpoint);

  const onClick = () => {
    setServiceInfo({
      type: type,
      internal: {
        serviceId: internalServiceId,
        serviceKey: internalServiceKey,
        secret: internalSecret,
        endpoint: internalEndpoint
      },
      external: {
        serviceId: externalServiceId,
        token: externalToken,
        endpoint: externalEndpoint
      }
    });

    setShowModal(false);
  };

  return (
    <div>
      <button
        className="absolute bottom-5 left-5 text-white hover:text-slate-600"
        onClick={()=>{ setShowModal(true); }}
      >
        <CogIcon className="h-7 w-7"/>
      </button>
      {showModal ? (
        <>
          <div className="fixed z-10 inset-0">
            <div className="text-center">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)}></div>

              <div className="relative inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full text-gray-700">
                <form className="bg-white px-4 pt-5 pb-4">
                  <h3 className="text-black mb-5 font-bold">설정</h3>

                  <div className="col-span-6 sm:col-span-3 mb-6">
                    <label className="block text-sm font-medium">Type</label>
                    <div className="form-check">
                      <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 mr-2 cursor-pointer" type="radio" name="radioType" id="radioType1" checked={type === 'internal'} onChange={()=>{ setType('internal') }} />
                      <label className="form-check-label inline-block text-gray-800" htmlFor="radioType1">
                        Internal
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 mr-2 cursor-pointer" type="radio" name="radioType" id="radioType2" checked={type === 'external'} onChange={()=>{ setType('external') }} />
                      <label className="form-check-label inline-block text-gray-800" htmlFor="radioType2">
                        External
                      </label>
                    </div>
                  </div>

                  {
                    type === 'internal' ? (
                    <>
                      <div className="col-span-6 sm:col-span-3 mb-6">
                        <label className="block text-sm font-medium">Service Id</label>
                        <input 
                          type="text" 
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm sm:text-sm" 
                          required 
                          value={internalServiceId}
                          onChange={({ target: { value } })=>{ setInternalServiceId(value); }}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 mb-6">
                        <label className="block text-sm font-medium">Service Key</label>
                        <input 
                          type="text" 
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm sm:text-sm" 
                          required 
                          value={internalServiceKey}
                          onChange={({ target: { value } })=>{ setInternalServiceKey(value); }}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 mb-6">
                        <label className="block text-sm font-medium">Secret</label>
                        <input 
                          type="text" 
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm sm:text-sm" 
                          required
                          value={internalSecret}
                          onChange={({ target: { value } })=>{ setInternalSecret(value); }}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 mb-6">
                        <label className="block text-sm font-medium">API Server</label>
                        <input 
                          type="text" 
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm sm:text-sm" 
                          required
                          value={internalEndpoint}
                          onChange={({ target: { value } })=>{ setInternalEndpoint(value); }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-span-6 sm:col-span-3 mb-6">
                        <label className="block text-sm font-medium">Service Id</label>
                        <input 
                          type="text" 
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm sm:text-sm" 
                          required 
                          value={externalServiceId}
                          onChange={({ target: { value } })=>{ setExternalServiceId(value); }}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 mb-6">
                        <label className="block text-sm font-medium">Token</label>
                        <input 
                          type="text" 
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm sm:text-sm" 
                          required 
                          value={externalToken}
                          onChange={({ target: { value } })=>{ setExternalToken(value); }}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 mb-6">
                        <label className="block text-sm font-medium">API Server</label>
                        <input 
                          type="text" 
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm sm:text-sm" 
                          required
                          value={externalEndpoint}
                          onChange={({ target: { value } })=>{ setExternalEndpoint(value); }}
                        />
                      </div>
                    </>
                  )}
                </form>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button 
                    onClick={onClick}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>);
};

export default Settings;