import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/future/image';
import Link from 'next/link';
import React, { Fragment } from 'react'
import serviceRole from '../../utils/serviceRole'

interface Entry {
  id: string;
  created_at: string;
  designation: string;
  first_name: string;
  last_name: string;
  email: string;
  id_number: string;
  ms_excel: string;
  ms_projects: string;
  project_management: string;
  motivation_letter: string;
  supervisor_letter: string;
  company: string;
  age: number;
  employments: string;
  qualification: string;
}

const index = ({entries}: { entries: Entry[]}) => {



  return (
    <Fragment>
      <main>
        <div className="max-w-7xl px-4 mx-auto">
          <Image
            src="/images/banner.jpg"
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
                        <th className="font-normal text-left pl-4 max-w-[190px]">
                          Company
                        </th>
                        <th className="font-normal text-left pl-4">Name </th>
                        <th className="font-normal text-left pl-4">MS Excel</th>
                        <th className="font-normal text-left pl-4">
                          MS Projects
                        </th>
                        <th className="font-normal text-left pl-4">
                          Project Management
                        </th>

                        <th className="font-normal text-left pl-4">
                          Motivation Letter
                        </th>
                        <th className="font-normal text-left pl-4">
                          Supervisor Letter
                        </th>
                      </tr>
                    </thead>
                    <tbody className="w-full">
                      {entries.map((entry) => (
                        <tr
                          key={entry.id}
                          className="h-20 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover:bg-gray-50"
                        >
                          <td className="pl-2 w-fit">
                            <span className="text-xs max-w-[30ch]">
                              {entry.company}
                            </span>
                          </td>
                          <td className="pl-4 h-full space-y-2">
                            <span>
                              {`${entry.first_name} ${entry.last_name}`} <br />{" "}
                              <small className="text-xs">{entry.email}</small>
                              <br />
                              <small className="text-xs">
                                {entry.qualification}
                              </small>{" "}
                              <br />
                              <small className="text-xs">
                                {entry.id_number}
                              </small>
                            </span>
                          </td>
                          <td className="pl-4">{entry.ms_excel}</td>
                          <td className="pl-4">{entry.ms_projects}</td>
                          <td className="pl-4">{entry.project_management}</td>

                          <td className="pl-4 bg-red-200">
                            {entry.motivation_letter && (
                              <Link
                                href={`https://xkhoyeoanyvetcispiif.supabase.co/storage/v1/object/public/${entry.motivation_letter}`}
                              >
                                Download
                              </Link>
                            )}
                          </td>
                          <td className="pl-4 bg-blue-200">
                            {entry.supervisor_letter && (
                              <Link href={`${entry.supervisor_letter}`}>
                                Download
                              </Link>
                            )}
                          </td>
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
    </Fragment>
  );
}

export default index



export async function getServerSideProps() {
  let { data: entries, error } = await serviceRole
    .from("entries")
    .select("*");

  return {
    props: {
      entries: entries,
    },
  };
}
