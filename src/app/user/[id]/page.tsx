// app/users/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from 'antd';

const UserDetail = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const userDetails = {
    '1': { name: 'John Doe', age: 32, address: 'New York', description: '喜欢旅游' },
    '2': { name: 'Jane Smith', age: 28, address: 'London', description: '喜欢阅读' },
    '3': { name: 'Tom Brown', age: 45, address: 'San Francisco', description: '喜欢登山' },
  };

  const user = userDetails[id as keyof typeof userDetails];

  if (!user) return <div>用户不存在</div>;

  return (
    <div>
      <h2>用户详情</h2>
      <p>姓名: {user.name}</p>
      <p>年龄: {user.age}</p>
      <p>地址: {user.address}</p>
      <p>描述: {user.description}</p>
      <Button onClick={() => router.push('/users')}>返回用户列表</Button>
    </div>
  );
};

export default UserDetail;
