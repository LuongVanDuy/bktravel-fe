import React, { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import { Modal, Upload, message } from "antd";
import type { UploadRequestOption } from "rc-upload/lib/interface";
import { UploadFile } from "antd/lib";

interface OneImageUploaderProps {
  aspect?: number;
  value?: string;
  onChange?: (value: string) => void;
}

const OneImageUploader: React.FC<OneImageUploaderProps> = ({ aspect, value, onChange }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // Đồng bộ từ value (url string) sang fileList
  useEffect(() => {
    if (value) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: value,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [value]);

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Chỉ hỗ trợ file JPG/PNG!");
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Ảnh phải nhỏ hơn 2MB!");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleCustomRequest = async (options: UploadRequestOption<any>) => {
    const { file, onSuccess, onError } = options;
    const formData = new FormData();
    formData.append("file", file as File);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      const newFile: UploadFile = {
        uid: (Math.random() * 100000).toFixed(0),
        name: (file as File).name,
        status: "done",
        url: data.url,
      };

      setFileList([newFile]);
      onChange?.(data.url);
      onSuccess?.(null, file as File);
    } catch (error) {
      message.error("Upload thất bại!");
      onError?.(error as Error);
    }
  };

  const handleRemove = (file: UploadFile) => {
    setFileList([]);
    onChange?.("");
  };

  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || "");
    setPreviewVisible(true);
  };

  return (
    <>
      {aspect ? (
        <ImgCrop aspect={aspect} rotationSlider>
          <Upload
            name="file"
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            customRequest={handleCustomRequest}
            onRemove={handleRemove}
            onPreview={handlePreview}
          >
            {fileList.length >= 1 ? null : "+ Upload"}
          </Upload>
        </ImgCrop>
      ) : (
        <Upload
          name="file"
          listType="picture-card"
          fileList={fileList}
          beforeUpload={beforeUpload}
          customRequest={handleCustomRequest}
          onRemove={handleRemove}
          onPreview={handlePreview}
        >
          {fileList.length >= 1 ? null : "+ Upload"}
        </Upload>
      )}

      <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default OneImageUploader;
