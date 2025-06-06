import React, { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import { Image, Modal, Upload, message } from "antd";
import type { UploadRequestOption } from "rc-upload/lib/interface";
import { UploadFile } from "antd/lib";

interface MultiImageUploaderProps {
  aspect?: number;
  value?: string[];
  onChange?: (value: string[]) => void;
  maxCount?: number;
}

const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({ aspect, value = [], onChange, maxCount = 5 }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [prevValueStr, setPrevValueStr] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    const valStr = JSON.stringify(value);
    if (prevValueStr !== valStr) {
      if (Array.isArray(value)) {
        const files: UploadFile[] = value
          .filter((url): url is string => typeof url === "string" && url.trim() !== "")
          .map((url, index) => ({
            uid: `file-${index}`,
            name: `image-${index}.jpg`,
            status: "done",
            url,
          }));
        setFileList(files);
      } else {
        setFileList([]);
      }
      setPrevValueStr(valStr);
    }
  }, [value, prevValueStr]);

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

      const newFileList = [...fileList, newFile];
      setFileList(newFileList);
      onChange?.(newFileList.map((file) => file.url!));
      onSuccess?.(null, file as File);
    } catch (error) {
      message.error("Upload thất bại!");
      onError?.(error as Error);
    }
  };

  const handleRemove = (file: UploadFile) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
    onChange?.(newFileList.map((file) => file.url!));
  };

  // Mở modal preview ảnh
  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || "");
    setPreviewVisible(true);
    setPreviewTitle(file.name || "");
  };

  const uploader = (
    <Upload
      listType="picture-card"
      fileList={fileList}
      onRemove={handleRemove}
      beforeUpload={beforeUpload}
      customRequest={handleCustomRequest}
      onPreview={handlePreview}
    >
      {fileList.length >= maxCount ? null : (
        <div>
          <div style={{ fontSize: 24, lineHeight: 1 }}>+</div>
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      )}
    </Upload>
  );

  return (
    <>
      {aspect ? (
        <ImgCrop aspect={aspect} rotationSlider>
          {uploader}
        </ImgCrop>
      ) : (
        uploader
      )}
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={() => setPreviewVisible(false)}>
        <Image alt={previewTitle} src={previewImage} style={{ width: "100%" }} />
      </Modal>
    </>
  );
};

export default MultiImageUploader;
