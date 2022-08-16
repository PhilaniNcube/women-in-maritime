import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/future/image";

interface Entry {
  id: number;
  created_at: string;
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  tel: string;
  organisation: string;
  attending: string;
  gender: string;
  diet: string;
}

const Submissions = ({ entries }: {entries: Entry[]}) => {


  console.log({entries})

  return (
    <main>
      <div className="max-w-7xl px-4 mx-auto">
        <Image
          src="/images/imbokodo.jpg"
          alt="imbokodo"
          width={2433}
          height={806}
          priority={true}
          className="w-full object-cover rounded-t-lg"
        />
        <>
          <div className="bg-white shadow  w-full px-6 sm:px-12 py-5 sm:py-10">
            <div className="mb-5 sm:mb-10 rounded-tl-lg rounded-tr-lg">
              <div className="sm:flex items-center justify-between">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                  Imbokodo in Maritime
                </p>
              </div>
            </div>
            <div className="">
              <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                  <thead>
                    <tr className="h-20 w-full text-sm leading-none text-gray-600">
                      <th className="font-normal text-left pl-4">Title</th>
                      <th className="font-normal text-left pl-10">Name </th>
                      <th className="font-normal text-left pl-10">
                        Organisation
                      </th>
                      <th className="font-normal text-left pl-10">Attending</th>
                      <th className="font-normal text-left pl-10">Gender</th>
                      <th className="font-normal text-left pl-10">Diet</th>
                      <th className="font-normal text-left pl-10 w-32">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {entries.map((entry) => (
                      <tr
                        key={entry.id}
                        className="h-20 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover:bg-gray-50"
                      >
                        <td className="pl-4">{entry.title}</td>
                        <td className="pl-10 h-full space-y-2">
                          <span>
                            {`${entry.first_name} ${entry.last_name}`} <br />{" "}
                            <small className="text-xs">{entry.email}</small>{" "}
                            <br />
                            <small className="text-xs">{entry.tel}</small>
                          </span>
                        </td>
                        <td className="pl-10">
                          <div className="flex text-xs font-bold items-center">
                            {entry.organisation}
                          </div>
                        </td>
                        <td className="pl-10">{entry.attending}</td>
                        <td className="pl-10">
                          <div className="w-20 h-6 flex items-center justify-center rounded-full">
                            <p
                              className={`text-xs uppercase font-bold leading-3 ${
                                entry.gender === "female"
                                  ? "text-pink-500"
                                  : "text-blue-500"
                              }`}
                            >
                              {entry.gender}
                            </p>
                          </div>
                        </td>
                        <td className="pl-10">{entry.diet}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      </div>
    </main>
  );
};
export default Submissions;


export async function getServerSideProps() {

  let { data: imbokodo, error } = await supabaseClient.from("imbokodo").select("*");

  return {
    props: {
      entries: imbokodo
    }
  }
}
