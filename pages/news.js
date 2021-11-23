import React from 'react';
import Head from 'next/head';
// import Image from 'next/image';
import Link from 'next/link'
import moment from "moment";
import styles from '../styles/News.module.css';
import { Heading,Text,Button,Box } from "@chakra-ui/react";
import {Stack, Skeleton } from "@chakra-ui/react"
import Home from '../components/Home';

const news = ({articles}) => {
    // console.log(articles);
    return (
        <div>
            <Head>
                <title>News</title>
                <meta name="description" content="Phanindra Reddy | MPR Nextjs News App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Home/>
            <Heading as="h3" size="lg" className={styles.heading}>Top headlines in the India</Heading>

            {
                !articles &&
                <>
                    <Box padding="6" boxShadow="lg" bg="white" style={{margin:"10px 20px"}}>
                        <Skeleton height="130px" />
                    </Box>

                    <Box padding="6" boxShadow="lg" bg="white" style={{margin:"10px 20px"}}>
                        <Skeleton height="130px" />
                    </Box>
                </>
            }
            
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            {   
                articles.map((article,index) => (
                    <Box key={index} padding="6" boxShadow="lg" bg="white"  className={styles.newscard}>
                        <div className={styles.carddetails}>
                            {article.urlToImage ? <img src={article.urlToImage} alt={article.title} width="300" height="150"  /> : <img src="no-image.jpg" alt={article.title} width="300" height="150"  /> }
                            <div className={styles.details}>
                                <div className={styles.title}>
                                    <Text fontSize="lg" color="black" fontWeight="600">{article.title}</Text>
                                    <Text fontSize="sm" color="gray.600">{article.description}</Text>
                                </div>

                                <div className={styles.readmore}>
                                    <Text color="black">{moment(article.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                                    <Link href={article.url} className={styles.btn} passHref>
                                    <Button colorScheme="teal" variant="outline" style={{right:"0"}} formTarget>

                                            Read More

                                    </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Box>
                ))
            }
            </div>
            
        </div>
    )
}

export async function getServerSideProps(context) {

    let apiResponse  = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=1883f715b9014d91b2928c38ceaef37b");
    let apiJson = await apiResponse.json();
    
    return {
      props: {
        articles:apiJson.articles
      }
    }
  }

export default news;

