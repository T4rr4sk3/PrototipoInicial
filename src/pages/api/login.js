// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {  
  if(req.method !== 'POST'){
    res.status(400).send({ message: 'Invalid Request Method.' })
    return
  }

  const body = JSON.parse(req.body)
  
  const data = await fetch('http://localhost:3030/users?name=' + body.username + '&password=' + body.password)
  
  const obj = await data.json()
  
  if(obj[0] != null){
    res.status(200).json(obj)
  }else{
    res.status(404).json( { message: "Wrong Username/Password."} )
  }
  
}
