import type { NextPage } from "next";
import Image from "next/future/image";
import { useState } from "react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { RadioGroup } from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/outline"
import serviceRole from "../utils/serviceRole";


const plans = [
  {
    name: "Seminar & Awards Evening",

  },
  {
    name: "Seminar Only",

  },
  {
    name: "Awards Evening Only",

  },
];

interface Man {
  id: number;
  created_at: string;
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  tle: string;
  organisation: string;
  attending: string;
  gender: 'male'

}

interface Woman {
  id: number;
  created_at: string;
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  tle: string;
  organisation: string;
  attending: string;
  gender: 'female'

}



const Imbokodo = ({men, women}:{men: Man[], women:Woman[]}) => {

  console.log({men, women});

  const [loading, setLoading] = useState<boolean>(false);

   const [selected, setSelected] = useState(plans[0]);





  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const {
      title,
      first_name,
      last_name,
      email,
      tel,
      organisation,
      gender,
      diet

    } = Object.fromEntries(new FormData(e.currentTarget));


     if (gender === 'male' && men.length >= 30) {
       alert('Our apologies, we have reached the maximum number of of male attendes')
       return;
     } else if (gender === 'female' && women.length >= 70) {
       alert(
         "Our apologies, we have reached the maximum number of of female attendes"
       );
       return;
     }

    console.log({
      title,
      first_name,
      last_name,
      email,
      tel,
      organisation,
      selected,
      gender,
      diet
    });

    const res = await fetch(`/api/imbokodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        first_name: first_name,
        last_name: last_name,
        email: email,
        tel: tel,
        organisation: organisation,
        attending:selected,
        gender: gender,
        diet:diet
      }),
    });

    const result = await res.json();
    if (res.ok) {

      setLoading(false);
      console.log(result);

      alert(result.message);
      setLoading(false)
    } else {
      alert(result.message);
      console.log(result);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col max-w-4xl px-4 mx-auto items-center justify-center py-2">
      <Image
        src="/images/imbokodo.jpg"
        alt="imbokodo"
        width={2433}
        height={806}
        priority={true}
        className="w-full object-cover rounded-t-lg"
      />

      {men.length >= 30 && (
        <h2 className="px-4 text-lg font-bold my-4 text-red">
          We have reached the maximum aloted spaces for male attendees
        </h2>
      )}
      {women.length >= 70 && (
        <h2 className="px-4 text-lg font-bold my-4 text-red-600">
          We have reached the maximum aloted spaces for male attendees
        </h2>
      )}

      <form
        className="w-full bg-gray-100 p-6 shadow-xl rounded-b-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-2">
          <div className="w-2/3 md:w-1/3 flex flex-col px-4">
            <label
              className="text-gray-600 font-medium text-sm"
              htmlFor="title"
            >
              Title
            </label>
            <select
              id="title"
              placeholder="title"
              name="title"
              className="px-2 py-1 border border-gray-400 rounded-lg mt-1"
            >
              <option value="Miss">Miss</option>
              <option value="Mrs">Mrs</option>
              <option value="Mr">Mr</option>
              <option value="Dr">Dr</option>
              <option value="Prof">Prof</option>
            </select>
          </div>
          <div className="w-1/3 flex flex-col px-4">
            <label
              className="text-gray-600 font-medium text-sm"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              id="gender"
              required
              placeholder="gender"
              name="gender"
              className="px-2 py-1 border border-gray-400 rounded-lg mt-1"
            >
              <option disabled={men.length === 30} value="male">
                Male
              </option>
              <option disabled={women.length === 70} value="female">
                Female
              </option>
            </select>
          </div>
        </div>

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
            <label className="text-gray-600 font-medium text-sm" htmlFor="tel">
              Mobile Number
            </label>
            <input
              type="tel"
              id="tel"
              required
              placeholder="Mobile Number"
              name="tel"
              className="px-2 py-1 border border-gray-400 rounded-lg mt-1"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              className="text-gray-600 font-medium text-sm"
              htmlFor="organisation"
            >
              Organisation
            </label>
            <input
              type="text"
              id="organisation"
              required
              placeholder="Organisation"
              name="organisation"
              className="px-2 py-1 border border-gray-400 rounded-lg mt-1"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              className="text-gray-600 font-medium text-sm"
              htmlFor="diet"
            >
              Dietary Requirements
            </label>
            <input
              type="text"
              id="diet"
              required
              placeholder="halaal, vegetarian, vegan"
              name="diet"
              className="px-2 py-1 border border-gray-400 rounded-lg mt-1"
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="w-full px-4 py-4">
            <div className="mx-auto w-full">
              <RadioGroup value={selected} onChange={setSelected}>
                <RadioGroup.Label className="text-lg text-gray-600 font-medium">
                  Which ceremony will you attend?
                </RadioGroup.Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  {plans.map((plan) => (
                    <RadioGroup.Option
                      key={plan.name}
                      value={plan.name}
                      className={({ active, checked }) =>
                        `${
                          active
                            ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                            : ""
                        }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                              <div className="text-sm">
                                <RadioGroup.Label
                                  as="p"
                                  className={`font-medium  ${
                                    checked ? "text-white" : "text-gray-900"
                                  }`}
                                >
                                  {plan.name}
                                </RadioGroup.Label>
                              </div>
                            </div>
                            {checked && (
                              <div className="shrink-0 text-white">
                                <CheckIcon className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
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

export default Imbokodo;


export async function getServerSideProps() {

const men = await serviceRole.from("imbokodo").select("*").eq("gender", "male");
const women = await serviceRole.from("imbokodo").select("*").eq("gender", "female");


   return {
    props: {
      men: men.data, women:women.data
    }
   }

}
