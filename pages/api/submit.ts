import mailchimp from '@mailchimp/mailchimp_marketing'
import type { NextApiRequest, NextApiResponse } from 'next'

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.SERVER_PREFIX,
})

const listID = process.env.LIST_ID || ''


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

 const {designation, first_name, last_name, id_number, email, ms_excel, ms_projects, project_management} = req.body

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

  const tags = [JSON.stringify({'MS Excel':ms_excel, 'MS Projects':ms_projects, 'Project Management':project_management, 'Designation':designation, 'ID Number':id_number})]

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

    res.status(200).json({ response })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error })
  }

}
