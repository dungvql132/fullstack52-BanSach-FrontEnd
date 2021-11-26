import { Upload, message, Image } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";

function getBase64(img, callback) {
  console.log("img trong getbase64: ", img);
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export default function UploadImg({ handleAvatar }) {
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleImage = async (img) => {
    console.log("vao in ra anh");
    try {
      let form = new FormData();
      form.append("image", img);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=b7a65d2b7df3783936e9c546ba63bae8`,
        {
          method: "POST",
          body: form,
          headers: {
            Accept: "application/json",
          },
        }
      );
      const myJson = await response.json();
      console.log(myJson);
      handleAvatar(myJson.data.display_url);
      console.log("link: ", myJson.data.display_url);
    } catch (error) {
      console.log("err: ", error);
    }
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImgUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imgUrl ? (
          <img src={imgUrl} alt="avatar" style={{ width: "100%", height: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <button
        onClick={async () => {
          let img = imgUrl.split(";base64,");
          console.log(img);
          await handleImage(img[1]);
        }}
      >
        Create Image
      </button>
    </div>
  );
}
