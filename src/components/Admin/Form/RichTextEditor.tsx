import React, { useRef, useState } from "react";
import { Spin } from "antd";
import { Editor } from "@tinymce/tinymce-react";

interface RichTextEditorProps {
  height?: number;
  value?: string;
  onChange?: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ height = 400, value, onChange }) => {
  const editorRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ position: "relative" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: height,
            backgroundColor: "#fff",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin tip="Đang tải trình soạn thảo..." />
        </div>
      )}
      <Editor
        tinymceScriptSrc="https://cdn.tiny.cloud/1/uugqic22oau89v7tv4dnj3avzebaaozn347buqb9dwv7a9rb/tinymce/6/tinymce.min.js"
        value={value}
        onEditorChange={(content) => {
          onChange?.(content);
        }}
        onInit={() => setLoading(false)}
        init={{
          height: height,
          menubar: true,
          toolbar:
            "undo redo | formatselect | bold italic backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | removeformat | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
};

export default RichTextEditor;
