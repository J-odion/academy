import React, { useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardSidebar from '@/components/layout/admin_dashboard/DashboardSidebar';
import DashboardLayout from '@/components/layout/admin_dashboard/DashboardLayout';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendHorizonal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ChatForum: NextPageWithLayout = () => {

  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: {
        name: 'John Doe',
        image: 'https://example.com/user1.jpg',
      },
      content: 'Hey there!',
      timestamp: '2024-05-12T10:30:00',
    },
    {
      id: 2,
      user: {
        name: 'Jane Smith',
        image: 'https://example.com/user2.jpg',
      },
      content: 'Hi John!',
      timestamp: '2024-05-12T10:35:00',
    },

  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        user: {
          name: 'Me',
          image: 'https://github.com/shadcn.png',
        },
        content: inputValue.trim(),
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  return (
    <DashboardSidebar>
      <div className="w-full md:mt-20">
        <h1 className='font-medium text-2xl mb-8'>Chat Forum</h1>
        <div className='bg-[#F0EAE8] border-[#C4AAA1] border-[1px] rounded-[20px] p-4'>
          {messages.map(message => (
            <div key={message.id} className="flex items-center space-x-3 mb-4">
              <Avatar className='w-10 h-10 rounded-[37px] md:rounded-[56px]'>
                <AvatarImage src={message.user.image} alt={message.user.name} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-semibold">{message.user.name}</p>
                <p className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center mt-4 relative">
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Start a new chat here..."
              className="flex-grow px-4 py-2 rounded-l-md bg-[#1E1E1E0D] focus:outline-none focus:border-[#C4AAA1] placeholder:pl-8"
            />
            <Avatar className='w-8 h-8 rounded-[37px] md:rounded-[56px] absolute left-2'>
                <AvatarImage src='https://github.com/shadcn.png' alt='avatar' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            <Button
              onClick={handleSendMessage}
              className="icon px-4 py-2 bg-transparent text-white rounded-r-md hover:bg-[#C4AAA1] focus:outline-none"
            >
              <SendHorizonal size={24} className='text-[#999999]' />
            </Button>
          </div>
        </div>
      </div>
    </DashboardSidebar>
  );
};

export default ChatForum;

ChatForum.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"chat-forum"}>{page}</DashboardLayout>;
};
