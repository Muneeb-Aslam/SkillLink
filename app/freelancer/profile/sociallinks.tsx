"use client";
import React, { useState } from "react";
import Image from "next/image";
import editicon from "@/public/Edit.png";
import instaicon from "@/public/Instagram.png";
import twittericon from "@/public/Twitter.png";
import webicon from "@/public/website.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { API_FREELANCER_PROFILE_PATH } from "@/app/api/api_constants";

const SocialLinks: React.FC<{ data: any }> = (data) => {
  const clientData = data.data;
  const [formData, setFormData] = useState({
    website: clientData?.socialMedia?.website,
    twitter: clientData?.socialMedia?.twitter,
    github: clientData?.socialMedia?.github,
  });

  const [edit, setEdit] = useState<boolean>(false);
  
  const handleEdit = () => {
    setEdit((pre) => !pre);
    setFormData({
      website: clientData?.socialMedia?.website,
      twitter: clientData?.socialMedia?.twitter,
      github: clientData?.socialMedia?.github,
    });
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateSection = async () => {
    console.log(formData);
    
    const response = await fetch(`${API_FREELANCER_PROFILE_PATH}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: clientData?.userId,
        socialMedia:formData,
      }),
    });

    if (response.ok) {
      toast.success("Updated Social Media Link successfully.");
      setEdit(false);
      window.location.reload();
    } else {
      toast.error("Could not update this section.");
    }
  };

  return (
    <section className="p-6 w-2/5 border-[1.5px] border-primary flex flex-col justify-between gap-4">
      <div className="w-full flex justify-between items-center">
        <h3 className="text-blackish font-bold text-xl">Social Links</h3>
        <div
          className="border-[1.5px] border-primary w-8 h-8 bg-white cursor-pointer"
          onClick={handleEdit}
        >
          <Image
            src={editicon}
            alt="add"
            className="fill-blue flex justify-center items-center h-full w-full"
          ></Image>
        </div>
      </div>
      <div className="w-full flex justify-start items-start gap-4">
        <Image src={instaicon} alt="email" className=""></Image>
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <span className="text-grayish text-sm">Github</span>
          {edit ? (
            <Input
              type="text"
              onChange={handleChange}
              name="github"
              value={formData.github}
              className="w-full"
            />
          ) : (
            <span className="text-blue font-bold text-md">
              {formData.github}
            </span>
          )}
        </div>
      </div>
      <div className="w-full flex justify-start items-start gap-4">
        <Image src={twittericon} alt="email" className=""></Image>
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <span className="text-grayish text-sm">Twitter</span>
          {edit ? (
            <Input
              type="text"
              onChange={handleChange}
              name="twitter"
              value={formData.twitter}
              className="w-full"
            />
          ) : (
            <span className="text-blue font-bold text-md">
              {formData.twitter}
            </span>
          )}
        </div>
      </div>
      <div className="w-full flex justify-start items-start gap-4">
        <Image src={webicon} alt="email" className=""></Image>
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <span className="text-grayish text-sm">Website</span>
          {edit ? (
            <Input
              type="text"
              onChange={handleChange}
              name="website"
              value={formData.website}
              className="w-full"
            />
          ) : (
            <span className="text-blue font-bold text-md">
              {formData.website}
            </span>
          )}
        </div>
      </div>
      {!!edit && (
        <div className="w-full flex justify-start items-center gap-2 pt-4">
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
    </section>
  );
};

export default SocialLinks;
