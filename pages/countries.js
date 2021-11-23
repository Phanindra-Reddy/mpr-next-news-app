import React,{useState, useEffect} from 'react'
import Head from 'next/head';
import { Select } from "@chakra-ui/react";
import styles from '../styles/News.module.css';
import axios from 'axios';
import Home from '../components/Home';
import { Heading,Text,Button,Box } from "@chakra-ui/react";
import Link from 'next/link'
import moment from "moment";
import {Stack, Skeleton} from "@chakra-ui/react";

const CountryNews = () => {

    const [country, setCountry] = useState([]);
    const [selectedCountryName, setSelectedCountryName] = useState("");
    const [selectedCountryCode, setSelectedCountryCode] = useState("IN");
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function countryApi(){
        const res = await axios.get(`https://restcountries.com/v3.1/all`);//https://restcountries.com/v3.1/all
        setCountry(res.data);
        // console.log(res.data);
    }

    async function CategoriesApi(){
        setIsLoading(true)
        const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=${selectedCountryCode}&apiKey=1883f715b9014d91b2928c38ceaef37b`);
        setArticles(res.data.articles)
        setIsLoading(false);

        // console.log(res.data.articles);
    }

    useEffect(()=>{
        countryApi();
    },[])

    useEffect(()=>{
        CategoriesApi();
    },[selectedCountryCode])

    

    return (
        <div>
            <Head>
                <title>Countries News</title>
                <meta name="description" content="Phanindra Reddy | MPR Nextjs News App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Home/>

            <Heading as="h3" size="lg" className={styles.heading}>Countries News</Heading>

            <Box width="50%" style={{margin:"auto"}}>
                <Select
                    bg="tomato"
                    borderColor="tomato"
                    color="black"
                    placeholder="Select Country"
                    onChange={(e)=>(setSelectedCountryCode(e.target.value),setSelectedCountryName(e.target.options[e.target.selectedIndex].text))}
                >
                    {
                        country.map((country,index) => (
                                <option key={index} value={country.cca2}>{country.name.common}</option>
                            )
                        )
                    }
                </Select>
            </Box>


            {
                isLoading ?
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <Box padding="6" boxShadow="lg" bg="white" style={{margin:"10px 20px",width: "70%"}}>
                        <Skeleton height="130px" />
                    </Box>

                    <Box padding="6" boxShadow="lg" bg="white" style={{margin:"10px 20px", width: "70%"}}>
                        <Skeleton height="130px" />
                    </Box>
                </div> :

                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    {
                        articles.length === 0 ? 
                        
                        <Text fontSize="md" className={styles.nodata}>Sorry, No News Found for <b>{selectedCountryName} :)</b></Text> :

                        <>  
                            {selectedCountryName && <Text fontSize="md" className={styles.nodata}>You Searched for <b>{selectedCountryName} 😊</b></Text>}
                            {articles && articles.map((article,index) => (
                                
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
            
                            )) }
    
                        </>
                    }
                </div>
            }
 

            
        </div>
    )
}

export default CountryNews;
