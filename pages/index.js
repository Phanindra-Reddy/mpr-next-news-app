import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Heading,Text,Button,Box } from "@chakra-ui/react";
import Link from "next/link"
import news from "../public/news.jpg"

export default function Home() {
  return (
    <div className={styles.container} >
      <Head>
        <title>MPR Nextjs News App</title>
        <meta name="description" content="Phanindra Reddy | MPR Nextjs News App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box padding="6" boxShadow="xl" bg="white"  className={styles.newscard}>
        <Heading as="h3" size="lg">Welcome to MPR News App</Heading>
        <Text>One stop destination for all latest news🙂</Text>
        <div className={styles.btns}>
          <Link href="/news" passHref>
            <Button colorScheme="teal" variant="outline" style={{marginRight:"10px"}} formTarget>
              Latest News
            </Button>
          </Link>
          <Link href="/searchnews" passHref>
            <Button colorScheme="teal" variant="outline" formTarget>
              Search News
            </Button>
          </Link>
        </div>
      </Box>
      
      
    </div>
  )
}

{/* <Box padding="6" boxShadow="xl" bg="white"  className={styles.newscard}>
          <Heading as="h3" size="lg">Welcome to MPR News App</Heading>
          <Text>One stop destination for all latest news🙂</Text>

          <div className={styles.btns}>
            <Link href="/news" passHref>
              <Button colorScheme="teal" variant="outline" style={{marginRight:"10px"}} formTarget>
                Latest News
              </Button>
            </Link>

            <Link href="/searchnews" passHref>
              <Button colorScheme="teal" variant="outline" formTarget>
                Search News
              </Button>
            </Link>
          </div>
        </Box> */}
