// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function helloAPI(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
