import mailchimp from '@mailchimp/mailchimp_marketing'
import { supabaseClient, supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from 'next'
import serviceRole from '../../utils/serviceRole';

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.SERVER_PREFIX,
})

const listID = process.env.IMBOKODO_ID || ''


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

 const {
   title,
      first_name,
      last_name,
      email,
      tel,
      organisation,
      attending} = req.body

    const { data, error } = await serviceRole.from('imbokodo').insert([{
        title: title,
        first_name: first_name,
        last_name: last_name,
        email: email,
        tel: tel,
        organisation:organisation,
        attending: attending
      }])

    console.log({data, error})


           const subscribingUser = {
        title: title,
        first_name: first_name,
        last_name: last_name,
        email: email,
        tel: tel,
        organisation: organisation,
        attending:attending,
  }



  try {
    const response = await mailchimp.lists.addListMember(listID, {
      email_address: subscribingUser.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: subscribingUser.first_name,
        LNAME: subscribingUser.last_name,
        PHONE: subscribingUser.tel
      },
      tags: [subscribingUser.title, subscribingUser.organisation, subscribingUser.attending || 'Seminar Only' ]
    })

    res.status(200).json({ response, data })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error })
  }


}
