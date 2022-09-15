import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Conf } from '@/store/conf';
import { useEffect } from 'react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [conf] = useRecoilState(Conf);

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(message) {
      conf.sendUserMessage([], message);
      setMessages((oldMessages)=>{
        return [...oldMessages, {
          senderId: '나',
          message: message
        }]
      });

      setMessage('');
    }
  };
  
  useEffect(()=>{
    if(conf) {
      conf.on('userMessage', (e)=>{
        setMessages((oldMessages)=>{
          return [...oldMessages, {
            senderId: e.sender,
            message: e.message
          }]
        });
      });
    }
  }, [conf]);

  return (
    <aside className='w-64 h-full flex flex-col py-4 px-3 bg-gray-50 dark:bg-gray-800'>
      <ul className='space-y-2 break-all h-full overflow-y-auto'>
        {
          messages.map((item, i)=>{
            return (
              <li key={i}>
                <span className='decoration-sky-500/30 mr-1.5'>[{item.senderId}]</span>
                <span>{item.message}</span>
              </li>
            );
          })
        }
      </ul>
      <form className='h-12' onSubmit={handleSubmit}>
        <div className='col-span-6 sm:col-span-3'>
          <input
            type='text'
            placeholder='메시지를 입력하세요'
            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            value={message}
            onChange={(e)=>{ setMessage(e.target.value); }}
            required
          />
        </div>
      </form>
    </aside>
  );
};

export default Chat;
