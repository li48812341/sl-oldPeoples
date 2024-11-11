'use client'
import { Table, Button, Space, Tag, type TableProps, Row, Col, Form,Input, DatePicker } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

import { getPersonEntryList, getCurrentVideoUrl } from '@/lib/service/common'
import { useEffect } from 'react';
import  useStore  from '@/components/store/store';
interface DataType {
  key: string;
  name: string;
  role: number;
  desc: string;
  tags: string[];
}
const { RangePicker } = DatePicker;
const User = () => {

  const router = useRouter();
  const [data, setData] = useState<any[]>([]);

  const { isRefreshList, setIsRefreshList } = useStore(); // 刷新列表

  const [pagination, setPagination] = useState({
    current: 1, // 当前页
    pageSize: 10, // 每页数据量
    total: 0, // 总数据条数
  });

  // 查询列表请求函数
  const fetchData = async (params: any) => {
    try {
      const res:any = await getPersonEntryList(params);
      const { data, totalSize, page, size } = res;

      setData(data); // 设置返回的数据

      setPagination({
        ...pagination,
        current: page,
        pageSize: size,
        total: totalSize, // 设置总数据条数
      })
    } catch (error) {
      console.error("查询失败:", error);
    }
  };
  // 分页处理
  const handleTableChange = (pagination: { page?: number; pageSize: any; current?: any; }) => {
    const params = {
      pageNo: pagination.page,
      pageSize: pagination.pageSize,
    };
    fetchData(params);
  };

  // 获取表单内容并调用查询接口
  const handleSearch = () => {
    form.validateFields().then((values) => {
      const { personName, personAge } = values;
      const params = {
        pageNo: 1,
        pageSize: 10,
        personName,
        personAge,
      };
      fetchData(params); // 调用封装的查询请求
    });
  };

  // 表单重置
  const handleReset = () => {
    form.resetFields(); // 重置表单字段
    fetchData({ pageNo: 1, pageSize: 10 }); // 重置查询，回到初始状态
  };

  useEffect(() => {
    fetchData({ pageNo: 1, pageSize: 10 });
  }, [])


  useEffect(() => {
    console.log("刷新列表",isRefreshList)
    if (isRefreshList) {
      fetchData({ pageNo: 1, pageSize: 10 }); // 收到 WebSocket 消息后重新获取数据
      setIsRefreshList(false); // 重置刷新状态
    }
  }, [isRefreshList, setIsRefreshList]);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '用户id',
      dataIndex: 'personId',
      key: 'personId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '用户姓名',
      dataIndex: 'personName',
      key: 'personName',
    },
    {
      title: '年龄',
      dataIndex: 'personAge',
      key: 'personAge',
    },
    {
      title: '性别',
      dataIndex: 'personGender',
      key: 'personGender',
    },
    {
      title: '进入时间',
      dataIndex: 'enterTime',
      key: 'enterTime',
    },
    {
      title: '离开时间',
      dataIndex: 'exitTime',
      key: 'exitTime',
    },

    {
      title: '视频回放',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tag
            color="geekblue"
            onClick={() => handleEnterClick(record)} // 绑定进入事件
            style={{ cursor: 'pointer' }}
          >
            进入
          </Tag>
          <Tag
            color="geekblue"
            onClick={() => handleLeaveClick(record)} // 绑定离开事件
            style={{ cursor: 'pointer' }}
          >
            离开
          </Tag>
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => router.push(`/user/${record.key}`)}>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  const handleEnterClick = (enter: any) => {
    const params = {
      deviceId: enter.deviceIdIn,
      entryTime: enter.enterTime
    }
    getCurrentVideoUrl(params).then((res: any) => {
      console.log(res)
      if (res.code === 200) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        res.data.url && window.open(res.data.url, "_blank")
      }
    })

  };

  const handleLeaveClick = (exit: any) => {
    const params = {
      deviceId: exit.deviceIdOut,
      entryTime: exit.enterTime
    }
    getCurrentVideoUrl(params).then((res: any) => {
      console.log(res)
      if (res.code === 200) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        res.data.url && window.open(res.data.url, "_blank")
      }

    })
  };

  const [form] = Form.useForm();

  return (
    <div>
      {/*       
      <Form
        form={form}
      >
        <Row gutter={[16, 16]}>
        <Space direction="horizontal" size={24} style={{ display: 'flex', alignItems: 'flex-start' }}>
        <Form.Item name="personName" label="用户姓名"  style={{ flex: 1 }}>
          <Input placeholder="请输入用户姓名" />
        </Form.Item>
        <Form.Item name="personAge" label="年龄" style={{ flex: 1 }}>
          <Input placeholder="请输入用户年龄" />
        </Form.Item>
        <Form.Item style={{ flex: 1 }}>
        <Form.Item name="range-time-picker" label="时间范围" >
        <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>
        </Form.Item>
        <Form.Item style={{ flex: 1 }}>
          <Button type="primary" onClick={handleSearch}>搜索</Button>
        </Form.Item>
        <Form.Item style={{ flex: 1 }}>
        <Button
              onClick={handleReset}
            >
              清空
            </Button>
        </Form.Item>
      </Space>
        </Row>
       
      </Form> */}
      <Form form={form}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item name="personName" label="用户姓名">
              <Input placeholder="请输入用户姓名" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="personAge" label="年龄">
              <Input placeholder="请输入用户年龄" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="range-time-picker" label="时间范围">
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
          </Col>
        </Row>

        {/* 按钮部分 */}
        <Row justify="end" gutter={[16, 16]}>
          <Col>
            <Button type="primary" onClick={handleSearch}>
              搜索
            </Button>
          </Col>
          <Col>
            <Button onClick={handleReset}>清空</Button>
          </Col>
        </Row>
      </Form>
      {/* 列表部分 */}
      <Table columns={columns} dataSource={data}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) => {
            // 当页码或每页条数改变时，重新请求数据
            handleTableChange({ page, pageSize });
          },
        }} />
    </div>
  );
};

export default User;

