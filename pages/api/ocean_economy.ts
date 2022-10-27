import mailchimp from '@mailchimp/mailchimp_marketing'
import { supabaseClient, supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from 'next'
import serviceRole from '../../utils/serviceRole';

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.SERVER_PREFIX,
})


const listID = process.env.OCEAN_ECONOMY_ID

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


const {
      designation,
      first_name,
      last_name,
      email_address,
      contact_number,
      organisation,
       diet} = req.body

    const { data, error } = await serviceRole.from('ocean_economy').insert([{
        designation: designation,
        first_name: first_name,
        last_name: last_name,
        email: email_address,
        contact_number: contact_number,
        organisation:organisation,
        diet:diet,
      }])



        if(error !== null ) {

          res.send({message: `Error: ${error.details}`})
        }  else {


          try {

                 const subscribingUser = {
       designation: designation,
        first_name: first_name,
        last_name: last_name,
        email_address: email_address,
        contact_number: contact_number,
        organisation:organisation,
        diet:diet,
  }

  if(!listID) {
    throw new Error("No list ID provided")
  }

 const response = await mailchimp.lists.addListMember(listID, {
      email_address: email_address,
      status: 'subscribed',
      merge_fields: {
        FNAME: subscribingUser.first_name,
        LNAME: subscribingUser.last_name,
        PHONE: subscribingUser.contact_number
      },
      tags: [subscribingUser.designation, subscribingUser.organisation, subscribingUser.diet ]
    })




    res.status(200).json({ message: 'Thank you for your submission',response, data })

          } catch (error) {

            res.status(400).json({ message:'There was an error processing your submission'})
          }



        }





}
