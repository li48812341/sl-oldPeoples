import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
const FileUpload: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([]);

  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('file', file); // 这里使用 files 字段，可以修改为你需要的字段名
      // formData.append('file_name', file.name); // 添加 file_name 参数
      // formData.append('path', file.name); // 添加 file_name 参数
    });

    // 这里可以调用上传接口
    fetch(`${process.env.NEXT_PUBLIC_UPLOAD_API}/http/v1/file/upload`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(() => message.success('文件上传成功'))
      .catch(() => message.error('文件上传失败'));
  };
  // const handleUpload = () => {
  //   const formData = new FormData();
  //   fileList.forEach(file => {
  //     formData.append('upload', file); // 这里使用 files 字段，可以修改为你需要的字段名
  //     // formData.append('file_name', file.name); // 添加 file_name 参数
  //     // formData.append('path', file.name); // 添加 file_name 参数
  //   });

  //   // 这里可以调用上传接口
  //   fetch(`${process.env.NEXT_PUBLIC_UPLOAD_API}/capability/files/upload?fileType=imgs`, {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then(response => response.json())
  //     .then(() => message.success('文件上传成功'))
  //     .catch(() => message.error('文件上传失败'));
  // };
  const uploadProps = {
    beforeUpload: (file: File) => {
      setFileList([...fileList, file]);
      return false; // 阻止自动上传
    },
    fileList,
    onChange: handleChange,
  };

  return (
    <div>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        style={{ marginTop: 16 }}
      >
        手动上传
      </Button>
    </div>
  );
};

export default FileUpload;
