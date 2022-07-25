import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/future/image'
import { FormEventHandler, useState } from 'react'

const Home: NextPage = () => {

  const [loading, setLoading] = useState(false)

  console.log({loading})

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  setLoading(true)
  e.preventDefault()
  const {designation, first_name, last_name, id_number, email, ms_excel, ms_projects, project_management} = Object.fromEntries(new FormData(e.currentTarget));

  console.log({
    designation,
    first_name,
    last_name,
    id_number,
    email,
    ms_excel,
    ms_projects,
    project_management,
  });

  const res = await fetch(`/api/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      designation,
      first_name,
      last_name,
      id_number,
      email,
      ms_excel,
      ms_projects,
      project_management,
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

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 ml-4 mt-4 w-full md:w-1/2 mx-auto rounded-lg hover:bg-blue-700 py-2 text-white font-bold text-md"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        <div className="px-6 mt-8">
          <h2 className="text-lg font-bold">Popia Compliant</h2>
          <p className="text-sm">
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
