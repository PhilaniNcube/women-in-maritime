import mailchimp from '@mailchimp/mailchimp_marketing'
import { supabaseClient, supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from 'next'
import serviceRole from '../../utils/serviceRole';

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.SERVER_PREFIX,
})

// const listID = process.env.LIST_ID || ''


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log(req)

  res.send({message: 'hello'})

// const request = await fetch(`https://us15.api.mailchimp.com/3.0/lists`, {
//   method: 'POST',

// })


// const run = async () => {

// };

  // const response = await mailchimp.lists.createList({
  //   name: "Imbokodo Maritime",
  //   permission_reminder: "Conference Sign Up",
  //   email_type_option: true,
  //   contact: {
  //     company: "SAIMI",
  //     address1: "Ocean Sciences Campus, Gomery Avenue, Summerstrand",
  //     city: "Port Elizabeth",
  //     state: "Eastern Cape",
  //     zip: "6001",
  //     country: "South Africa",
  //   },
  //   campaign_defaults: {
  //     from_name: "SAIMI",
  //     from_email: "newsletter@saimi.co.za",
  //     subject: "subject",
  //     language: "language",
  //   },
  // });
  // console.log(response);



  // try {


  //   res.status(200).json({ response })
  // } catch (error) {
  //   console.log(error)
  //   res.status(400).json({ message: error })
  // }


}
