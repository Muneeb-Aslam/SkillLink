"use client";
import { API_FREELANCER_PROFILE_PATH } from "@/app/api/api_constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadSingleFile } from "@/lib/fileupload";
import { getFile } from "@/lib/getfile";
import editicon from "@/public/Edit.png";
import coverimage from "@/public/cover-image.png";
import locationicon from "@/public/location.png";
import AWS from "aws-sdk";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdditionalProfile from "./additionalprofile";

AWS.config.update({
  accessKeyId: "AKIAVWHPZZQMEUAJ27F7",
  secretAccessKey: "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",
  region: "eu-north-1",
});

export default function Header(data: any) {
  const clientData = data.data;
  const [edit, setEdit] = useState<boolean>(false);
  const [imgSrc, SetImgSrc] = useState<File | null>(null);
  const [profileImg, setProfileImg] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: clientData?.name,
    position: clientData?.position,
    city: clientData?.city,
    country: clientData?.country,
  });

  const handleEdit = () => {
    setEdit((pre) => !pre);
    setFormData({
      name: clientData?.name,
      position: clientData?.position,
      city: clientData?.city,
      country: clientData?.country,
    });
  };

  useEffect(() => {
    const profile = getFile(clientData?.profileImage ?? "");
    setProfileImg(profile);
  }, [clientData]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateSection = async () => {
    var result;
    if (imgSrc) {
      try {
        result = await uploadSingleFile(imgSrc, 0);
        console.log(`File uploaded successfully:`, result);
      } catch (error) {
        console.error(`Error uploading file :`, error);
      }
    }
    const response = await fetch(`${API_FREELANCER_PROFILE_PATH}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: clientData?.userId,
        name: formData.name,
        position: formData.position,
        city: formData.city,
        country: formData.country,
        profileImage: result?.Location,
      }),
    });

    if (response.ok) {
      toast.success("Updated Social Media Link successfully.");
      setEdit(false);
      // window.location.reload();
    } else {
      toast.error("Could not update this section.");
    }
  };
  return (
    <header className="w-full flex justify-center items-center">
      <div className="py-8 px-16 w-full flex justify-between items-start gap-4">
        <div className="h-max relative w-full border-[1.5px] border-primary">
          <div>
            <Image
              src={coverimage}
              alt=""
              className="w-full h-48 bg-no-repeat bg-cover"
            ></Image>
            <div
              className="border-[1.5px] border-primary w-8 h-8 bg-white absolute top-4 right-4 cursor-pointer"
              onClick={handleEdit}
            >
              <Image
                src={editicon}
                alt="edit"
                className="fill-blue flex justify-center items-center h-full w-full"
              ></Image>
            </div>
          </div>
          <div className="flex ml-4 justify-start items-start py-4 relative gap-4 h-48">
            {edit || !profileImg ? (
              <>
                <label
                  htmlFor="profile"
                  className="w-40 h-40 absolute cursor-pointer -top-20 left-4 border-8 border-white rounded-[50%] bg-blue flex justify-center items-center text-blackish font-bold"
                >
                  Choose Image
                </label>
                <input
                  type="file"
                  // accept=".png .jpg .jpeg"
                  id="profile"
                  className="sr-only"
                  onChange={(e) => SetImgSrc(e.target.files[0])}
                />
              </>
            ) : (
              <Image
                src={profileImg}
                alt=""
                className="w-40 h-40 absolute -top-20 left-4 border-8 border-white rounded-[50%] bg-blue"
                width={100}
                height={100}
              ></Image>
            )}
            <div className="ml-48 flex flex-col justify-start items-start gap-4 w-3/5">
              <Input
                type="text"
                onChange={handleChange}
                name="name"
                className="w-full"
                value={formData.name}
                placeholder="Name"
                readOnly={!edit}
                disabled={!edit}
              />
              <Input
                type="text"
                onChange={handleChange}
                name="position"
                value={formData.position}
                readOnly={!edit}
                disabled={!edit}
                placeholder="Position"
                className="w-full"
              />
              <div className="flex justify-start items-center gap-2 w-full">
                <Image
                  src={locationicon}
                  alt=""
                  className="w-[25px] h-[25px]"
                ></Image>
                <Input
                  type="text"
                  onChange={handleChange}
                  name="city"
                  value={formData.city}
                  className="w-full"
                  readOnly={!edit}
                  disabled={!edit}
                  placeholder="City"
                />
                <Input
                  type="text"
                  onChange={handleChange}
                  name="country"
                  value={formData.country}
                  className="w-full"
                  readOnly={!edit}
                  disabled={!edit}
                  placeholder="Country"
                />
              </div>
            </div>
          </div>
          {!!edit && (
            <div className="ml-48 w-full flex justify-start items-center gap-2 py-4">
              <Button
                type="button"
                className="w-max cursor-pointer"
                onClick={updateSection}
              >
                Update
              </Button>
              <Button
                type="button"
                onClick={handleEdit}
                className="bg-white text-blue font-bold w-max cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
        <AdditionalProfile data={data} />
      </div>
    </header>
  );
}
