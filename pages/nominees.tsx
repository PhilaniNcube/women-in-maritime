import { AcademicCapIcon, CalendarIcon, DocumentDownloadIcon } from "@heroicons/react/outline";
import Link from "next/link";
import serviceRole from "../utils/serviceRole";

interface Nomination {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  profile: string;
  photo: string;
  category: string;
}

const nominees = ({nominations}: {nominations: Nomination[]}) => {
  return (
    <main className="max-w-7xl mx-auto py-16">
      <h1 className="text-3xl text-gray-700 font-bold">Nominations</h1>
      <div>
        <div className="container mx-auto px-6 py-10">
          <div className="sm:shadow rounded bg-white dark:bg-gray-800">
            {nominations.map((nomination) => (
              <div
                key={nomination.id}
                className="xl:w-full w-11/12 mx-auto flex flex-wrap items-center justify-between px-8 mb-2 xl:mb-0 lg:mb-0 border-b border-gray-300 dark:border-gray-700"
              >
                <div className="xl:w-1/5 py-5">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded">
                      <Link href={nomination.photo} passHref>
                        <img
                          src={nomination.photo}
                          alt="profile"
                          className="h-full w-full object-cover rounded overflow-hidden shadow"
                        />
                      </Link>
                    </div>
                    <p className="text-lg text-gray-800 dark:text-gray-100 pl-2 font-normal">
                      {`${nomination.first_name} ${nomination.last_name}`}
                    </p>
                  </div>
                </div>
                <div className="xl:w-1/5 py-5">
                  <div className="flex items-center">
                    <AcademicCapIcon className="h-8 w-8 text-green-600" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 pl-2 font-normal">
                      {nomination.category}
                    </p>
                  </div>
                </div>
                <div className="xl:w-1/5 py-5">
                  <div className="flex items-center">
                    <CalendarIcon className="h-8 w-8 text-blue-600" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 pl-2 font-normal">
                      {nomination.created_at.split("T")[0]}
                    </p>
                  </div>
                </div>
                <div className="xl:w-1/5 py-5">
                  <Link href={nomination.profile} passHref>
                  <div className="flex items-center cursor-pointer hover:bg-gray-200 px-3 py-1">
                    <DocumentDownloadIcon className="h-8 w-8 text-red-600" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 pl-2 font-normal">
                     Download Profile
                    </p>
                  </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
export default nominees;


export async function getServerSideProps(){

  let { data: nominations, error } = await serviceRole
  .from('nominations')
  .select('*')

  return {
    props: {
      nominations
    }
  }

}
