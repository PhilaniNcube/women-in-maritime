import type { NextPage } from "next";
import Image from "next/future/image";
import React, { useState } from "react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link"

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  "https://xkhoyeoanyvetcispiif.supabase.co/storage/v1/object/public/documents/0.9711519443407244.jpg";

  const [profile, setProfile] = useState<string | undefined>("");
  const [photo, setPhoto] = useState<string | undefined>("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    try {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("There was an error uploading the file");
      }

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let upload = await supabaseClient.storage
        .from("documents")
        .upload(filePath, file);

         console.log({ upload });

      const fileUrl: string | undefined = upload?.data?.Key;

      console.log(fileUrl);

      setProfile(
        `https://xkhoyeoanyvetcispiif.supabase.co/storage/v1/object/public/${fileUrl}`
      );
        alert("Profile Upload completed");
      setLoading(false);
      return fileUrl;
    } catch (error) {
      return null;
    }
  };

  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("There was an error uploading the file");
      }

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let upload = await supabaseClient.storage
        .from("documents")
        .upload(filePath, file);

        console.log({ upload });

      const fileUrl: string | undefined = upload?.data?.Key;

      console.log(fileUrl);

      setPhoto(
        `https://xkhoyeoanyvetcispiif.supabase.co/storage/v1/object/public/${fileUrl}`
      );
      alert('Photo Upload completed')
      setLoading(false);
      return fileUrl;
    } catch (error) {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const {
      category,
      first_name,
      last_name,
    } = Object.fromEntries(new FormData(e.currentTarget));

    console.log({
      category,
      first_name,
      last_name,
      profile,
      photo,
    });

    const res = await fetch(`/api/awards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        profile: profile,
        photo: photo,
        category: category,
      }),
    });

    if (res.ok) {
      const result = await res.json();
      setLoading(false);

      console.log(result);

      alert("Thank You for your submission");
    } else {
      alert("There was an error. Please try again later");
    }
  };

  return (
    <div className="flex min-h-screen flex-col max-w-4xl px-4 mx-auto items-center justify-center relative py-2">
     
      <Image
        src="/images/registration.jpg"
        alt="banner"
        width={2433}
        height={806}
        priority={true}
        className="w-full object-cover rounded-t-lg"
      />

      <form
        className="w-full bg-gray-100 p-6 shadow-xl rounded-b-lg"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex justify-between items-center">
          {" "}
          <h1 className="text-2xl font-bold text-gray-800">
            Enter the name of your nominee
          </h1>
          <Link href="./Awards Categories.docx" className="bg-green-500 text-white rounded px-4 py-2 text-sm">Download Awards Document</Link>
        </div>

        <div className="w-full mt-4 px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col w-full">
            <label
              className="text-gray-600 font-medium text-sm"
              htmlFor="first_name"
            >
              First Name
            </label>
            <input
              type="text"
              required
              id="first_name"
              placeholder="First Name"
              name="first_name"
              className="px-2 py-1 border border-gray-400 rounded-lg mt-1"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              className="text-gray-600 font-medium text-sm"
              htmlFor="last_name"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              required
              placeholder="Last Name"
              name="last_name"
              className="px-2 py-1 border border-gray-400 rounded-lg mt-1"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              className="text-gray-600 font-medium text-sm"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              placeholder="category"
              name="category"
              className="px-2 py-1 border text-sm border-gray-400 rounded-lg mt-1"
            >
              <option
                className="text-xs bg-slate-800 text-white"
                value="Best Women in Maritime Business"
              >
                Best Women in Maritime Business
              </option>
              <option
                className="text-xs bg-slate-800 text-white"
                value="Making Waves as a Newcomer"
              >
                Making Waves as a Newcomer
              </option>
              <option
                className="text-xs bg-slate-800 text-white"
                value="Leading Entity in Women Empowerment"
              >
                Leading Entity in Women Empowerment
              </option>
              <option
                className="text-xs bg-slate-800 text-white"
                value="Sheroes in the Sector"
              >
                Sheroes in the Sector
              </option>
              <option
                className="text-xs bg-slate-800 text-white"
                value="Most Influential"
              >
                Most Influential
              </option>
              <option
                className="text-xs bg-slate-800 text-white"
                value="Best Mentor"
              >
                Best Mentor
              </option>
              <option
                className="text-xs bg-slate-800 text-white"
                value="Star Performer"
              >
                Star Performer
              </option>
              <option
                className="text-xs bg-slate-800 text-white"
                value="Woman in Maritime Research"
              >
                Woman in Maritime Research
              </option>
                <option
                className="text-xs bg-slate-800 text-white"
                value="Maritime Tech Innovator of the Year"
              >
                Maritime Tech Innovator of the Year
              </option>
            </select>
          </div>
        </div>

        <div className="px-5 mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Nominee Profile
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="profile"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload profile</span>
                  <input
                    id="profile"
                    name="profile"
                    onChange={handleFileUpload}
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="px-5 mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Upload nominee photo
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="photo"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload nominee photo</span>
                  <input
                    id="photo"
                    name="photo"
                    onChange={handleDocUpload}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">up to 10MB</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 ml-4 mt-4 w-full md:w-1/2 mx-auto rounded-lg hover:bg-blue-700 py-2 text-white font-bold text-md"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        <div className="px-6 mt-8">
          <h2 className="text-lg font-bold">Popia Compliant</h2>
          <p className="text-xs">
            The Protection of Personal Information Act (POPI Act) comes into
            effect on 1 July 2021 and to remain compliant with its provisions
            SAIMI would like to give you, as its stakeholder, the opportunity to
            unsubscribe should you wish to not receive any further communication
            from SAIMI. SAIMI regularly sends communication to its stakeholders
            to inform them of any upcoming events and other industry related
            news. Your email address forms part of the SAIMI stakeholders’
            database and is used for the purpose of communicating the
            abovementioned information.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Home;
