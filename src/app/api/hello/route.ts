// import { NextApiRequest, NextApiResponse } from 'next';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     res.status(200).json({ message: 'GET request handled' });
//   } else if (req.method === 'POST') {
//     res.status(200).json({ message: 'POST request handled' });
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }



// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     // Process a POST request
//   } else {
//     // Handle any other HTTP method
//   }
// }

import type { NextApiRequest, NextApiResponse } from 'next';
import { type NextRequest } from 'next/server'

// 获取用户列表
export  async function GET(request: NextRequest) {
  const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
  ];

  return Response.json(users);
}
