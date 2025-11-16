"use client";
import React, { useState } from "react";
import Image from "next/image";
import editicon from "@/public/Edit.png";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/textarea";
import { API_CLIENT_PROFILE_PATH } from "@/app/api/api_constants";
import toast from "react-hot-toast";

const About: React.FC<any> = (data: { data: any }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const clientData = data.data;

  const [formData, setFormData] = useState({
    about: clientData?.about ? clientData?.about : "",
  });

  const handleEdit = () => {
    setEdit((pre) => !pre);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateAbout = async () => {
    if (formData.about.length > 1) {
      const response = await fetch(`${API_CLIENT_PROFILE_PATH}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: clientData?.userId,
          about: formData.about,
        }),
      });

      if (response.ok) {
        toast.success("Updated About successfully.");
        setEdit(false);
        window.location.reload();
      } else {
        toast.error("Could not update about section.");
      }
    } else {
      toast.error("About section is empty");
    }
  };
  return (
    <section className="py-8 px-16 bg-white shadow-lg rounded-lg border-[1.5px] border-[#f8f4f4f1] w-full flex justify-between items-start gap-4 ">
      <div className="p-8 h-max relative w-3/5 bg-white shadow-lg rounded-lg border-[1.5px] border-[#f8f4f4f1] flex flex-col justify-between items-start gap-4">
        <div className="w-full flex justify-between items-center">
          <h3 className="text-blackish font-bold text-xl">About Me</h3>
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
        {edit ? (
          <TextArea
            className="bg-white text-blue font-bold w-full h-full"
            onChange={handleChange}
            value={formData.about}
            name="about"
          />
        ) : (
          <p className="text-normal font-bold text-lg break-words">
            {formData.about}
          </p>
        )}
        {!!edit && (
          <div className="w-full flex justify-start items-center gap-2 pt-4">
            <Button
              type="button"
              className="w-max cursor-pointer"
              onClick={updateAbout}
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
    </section>
  );
};

export default About;
