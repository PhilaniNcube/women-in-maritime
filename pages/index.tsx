import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/future/image'
import { FormEventHandler, useState } from 'react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { error } from 'console'

const Home: NextPage = () => {

  const [loading, setLoading] = useState<boolean>(false)

  const [motivation, setMotivation] = useState<string>('')
  const [supervisor, setSupervisor] = useState<string>('')


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {

    setLoading(true)

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

      const fileUrl = upload?.data?.Key;

      console.log(fileUrl);

      setMotivation(fileUrl);
      setLoading(false);
      return fileUrl;

    } catch (error) {
      return null;
    }
  };

  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
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

      const fileUrl = upload?.data?.Key;

      console.log(fileUrl)

      setSupervisor(fileUrl)
       setLoading(false);
      return fileUrl;
    } catch (error) {
      return null;
    }
  };



const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  setLoading(true)
  e.preventDefault()
  const {designation,
        first_name,
        last_name,
        id_number,
        email,
        ms_excel,
        ms_projects,
        project_management,
        motivation_letter,
        supervisor_letter,
        company,
        age,
        employment,
        qualification} = Object.fromEntries(new FormData(e.currentTarget));

  console.log({
    designation,
    first_name,
    last_name,
    id_number,
    email,
    ms_excel,
    ms_projects,
    project_management,
    motivation_letter,
    supervisor_letter,
    company,
    age,
    employment,
    qualification,
  });






  const res = await fetch(`/api/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      designation: designation,
      first_name: first_name,
      last_name: last_name,
      id_number: id_number,
      email: email,
      ms_excel:ms_excel,
      ms_projects: ms_projects,
      project_management: project_management,
      motivation_letter: motivation,
      supervisor_letter: supervisor,
      company: company,
      age: age,
      employment: employment,
      qualification: qualification
    }),
  });

if (res.ok) {
  const result = await res.json()
  setLoading(false)

  console.log(result)

  alert('Thank You for your submission')

} else {
  alert('There was an error. Please try again later')
}



};


  return (
    <div className="flex min-h-screen flex-col max-w-4xl px-4 mx-auto items-center justify-center py-2">
      <Image
        src="/images/banner.jpg"
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
        <div className="w-full"></div>

        <div className="w-full mt-4 px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
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
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="Email"
              name="email"
              className="px-2 py-1 border border-gray-400 rounded-lg mt-1"
            />
          </div>
        </div>

        <div className="w-full mt-6 px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col w-full">
            <label className="text-gray-600 font-medium text-sm" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              required
              id="age"
              placeholder="Age"
              name="age"
              className="px-2 py-1 border border-gray-400 rounded-lg mt-1"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              className="text-gray-600 font-medium text-sm"
              htmlFor="company"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              required
              placeholder="Company"
              name="company"
              className="px-2 py-1 border border-gray-400 rounded-lg mt-1"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              className="text-gray-600 font-medium text-sm"
              htmlFor="employment"
            >
              Employment
            </label>
            <select
              id="employment"
              placeholder="employment"
              name="employment"
              className="px-2 py-1 border border-gray-400 rounded-lg mt-1"
            >
              <option value="junior management">Junior Management</option>
              <option value="middle management">Middle Management</option>
              <option value="senior management">Senior Management</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label
              className="text-gray-600 font-medium text-sm"
              htmlFor="qualification"
            >
              Qualification
            </label>
            <select
              id="qualification"
              placeholder="qualification"
              name="qualification"
              className="px-2 py-1 border border-gray-400 rounded-lg mt-1"
            >
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>
        </div>

        <div className="w-full mt-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col w-full">
            <label
              className="text-gray-600 font-medium text-sm"
              htmlFor="designation"
            >
              Designation
            </label>
            <input
              type="text"
              id="designation"
              required
              placeholder="Designation"
              name="designation"
              className="px-2 py-1 border border-gray-400 rounded-lg mt-1"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              className="text-gray-600 font-medium text-sm"
              htmlFor="id_number"
            >
              ID Number
            </label>
            <input
              type="text"
              id="id_number"
              required
              placeholder="ID Number"
              name="id_number"
              className="px-2 py-1 border border-gray-400 rounded-lg mt-1"
            />
          </div>
        </div>
        <div className="w-full mt-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col w-full">
            <label
              className="text-gray-600 font-medium text-sm"
              htmlFor="ms_excel"
            >
              MS Excel
            </label>
            <select
              id="ms_excel"
              placeholder="MS Excel"
              name="ms_excel"
              className="px-2 py-1 border border-gray-400 rounded-lg mt-1"
            >
              <option value="basic">Basic</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label
              className="text-gray-600 font-medium text-sm"
              htmlFor="project_management"
            >
              Project Management
            </label>
            <select
              id="project_management"
              placeholder="Project Management"
              name="project_management"
              className="px-2 py-1 border border-gray-400 rounded-lg mt-1"
            >
              <option value="yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label
              className="text-gray-600 font-medium text-sm"
              htmlFor="ms_projects"
            >
              MS Projects
            </label>
            <select
              id="ms_projects"
              placeholder="MS Projects"
              name="ms_projects"
              className="px-2 py-1 border border-gray-400 rounded-lg mt-1"
            >
              <option value="basic">Basic</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="px-5 mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Motivation Letter
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
                  htmlFor="motivation_letter"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload motivation letter</span>
                  <input
                    id="motivation_letter"
                    name="motivation_letter"
                    onChange={handleFileUpload}
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="px-5 mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Upload supervisor letter
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
                  htmlFor="supervisor_letter"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload supervisor letter</span>
                  <input
                    id="supervisor_letter"
                    name="supervisor_letter"
                    onChange={handleDocUpload}
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
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
}

export default Home
