import Image from "next/future/image";
import { useRouter } from "next/router";
import { useState } from "react";

const registration = () => {

  const [loading, setLoading] = useState(false)

  const router = useRouter()

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault()
setLoading(true)

  const {
    first_name,
    last_name,
    email_address,
    contact_number,
    organisation,
    designation,
    diet,
  } = Object.fromEntries(new FormData(e.currentTarget));

 const res = await fetch(`/api/ocean_economy`, {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify({
     first_name,
     last_name,
     email_address,
     contact_number,
     organisation,
     designation,
     diet,
   }),
 });


     if (res.ok) {
       const result = await res.json();
       setLoading(false);

       console.log(result);

       alert(result.message);
       router.push('/ocean_economy/registration')
     } else {
       alert("There was an error. Please try again later");
       setLoading(false)
     }

}


  return (
    <main className="max-w-7xl mx-auto px-4 my-8">
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <Image
                src="/images/ocean_economy.jpg"
                width={839}
                height={650}
                alt="Ocean Economy"
                className="w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email_address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email_address"
                        id="email_address"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="organisation"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Organisation
                      </label>
                      <input
                        type="text"
                        name="organisation"
                        id="organisation"
                        autoComplete="organisation"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="contact_number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        name="contact_number"
                        id="contact_number"
                        autoComplete="tel"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="designation"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Designation
                      </label>
                      <select
                        id="designation"
                        name="designation"
                        autoComplete="designation"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>Mr</option>
                        <option>Mrs</option>
                        <option>Doctor</option>
                        <option>Professor</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="diet"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Dietary requirements
                      </label>
                      <select
                        id="diet"
                        name="diet"
                        autoComplete="diet"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>None</option>
                        <option>Halaal</option>
                        <option>Vegetarian</option>
                        <option>Vegan</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-5 w-full px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white w-full max-w-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {loading ? "Loading..." : "Save"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
export default registration;
