import mailchimp from '@mailchimp/mailchimp_marketing'
import { supabaseClient, supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from 'next'
import serviceRole from '../../utils/serviceRole';

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.SERVER_PREFIX,
})

const listID = process.env.LIST_ID || ''


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

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
    qualification} = req.body

    const { data, error } = await serviceRole.from('entries').insert([{ designation: designation, first_name: first_name, last_name: last_name, email: email, id_number: id_number, ms_excel: ms_excel, ms_projects: ms_projects, project_management: project_management, motivation_letter: motivation_letter, supervisor_letter: supervisor_letter, company:company, age: age,employment:employment, qualification: qualification},])

    console.log({data, error})


           const subscribingUser = {
    firstName: first_name,
    lastName: last_name,
    email: email,
    idNumber: id_number,
    msExcel: ms_excel,
    msProjects: ms_projects,
    projectManagement: project_management,
    designation: designation,
  }



  try {
    const response = await mailchimp.lists.addListMember(listID, {
      email_address: subscribingUser.email,



      status: 'subscribed',
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
      tags: [subscribingUser.idNumber, `MS Excel - ${subscribingUser.msExcel}`, `MS Projects - ${subscribingUser.msProjects}`, `Project Management - ${subscribingUser.projectManagement}`, `Designation - ${subscribingUser.designation}`]


    })

    res.status(200).json({ response, data })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error })
  }


}
