import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { trpc } from '../utils/trpc'

export default function Home() {
  const {data} = trpc.hello.useQuery({ text: 'abcd' })
  console.log('data', data);
  return (
    <div>
      <h1>Notion Clone</h1>
    </div>
  )
}
