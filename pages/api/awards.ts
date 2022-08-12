
import { supabaseClient, supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from 'next'
import serviceRole from '../../utils/serviceRole';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

 const {
    category,
    first_name,
    last_name,
    profile,
    photo,
  } = req.body

    const { data, error } = await serviceRole.from('nominations').insert([{ category: category, first_name: first_name, last_name: last_name, profile:profile, photo: photo},])

    console.log({data, error})

    if(data) {
      res.status(200).send({message: 'Success'})
    } else {
      res.status(402).send({message: 'Error'})
    }
}
