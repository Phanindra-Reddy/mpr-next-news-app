import React,{useState,useEffect} from 'react';
import Head from 'next/head';
import { Input,FormControl, FormLabel} from "@chakra-ui/react";
import axios from "axios";
import Link from 'next/link'
import moment from "moment";
import styles from '../styles/News.module.css';
import { Heading,Text,Button,Box } from "@chakra-ui/react";
import {Stack, Skeleton} from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import Home from '../components/Home';

const Searchnews = () => {


    const [isLoading, setIsLoading] = useState(false);
    const [searchText,setSearchText] = useState("")
    const [articles, setArticles] = useState([])
    const [categoryNews, setCategoryNews] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("general");
    

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)
        const res = await axios.get(`https://newsapi.org/v2/everything?q=${searchText}&apiKey=1883f715b9014d91b2928c38ceaef37b`);
        setArticles(res.data.articles);

        setIsLoading(false);
        // console.log(res.data.articles);

    }

    async function CategoriesApi(){
        setIsLoading(true)
        const res = await axios.get(`https://newsapi.org/v2/top-headlines/sources?category=${selectedCategory}&apiKey=1883f715b9014d91b2928c38ceaef37b`);
        setCategoryNews(res.data.sources);
        setSelectedCategory(selectedCategory)
        setIsLoading(false);
        // console.log(res.data.sources, selectedCategory);
    }

    useEffect(() => {
        CategoriesApi();
    }, [selectedCategory])

    return (
        <div>
            <Head>
                <title>Search News</title>
                <meta name="description" content="Phanindra Reddy | MPR Nextjs News App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Home/>

            <Heading as="h3" size="lg" className={styles.heading}>Search News</Heading>

            <Box width="50%" style={{margin:"auto"}}>
                <form onSubmit={handleSubmit}>
                <FormControl id="search-news" isRequired >
                    <FormLabel>Search news</FormLabel>
                    <Input placeholder="search news..." value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
                </FormControl>
                </form>
            </Box>

            <Box width="50%" style={{margin:"20px auto", display:"flex", alignItems:"center"}}>
                <Text fontSize="md">Categories: </Text>
                <Stack direction="row" style={{cursor:"pointer"}}>
                    <Badge colorScheme="gray" onClick={()=>(setSelectedCategory("general"),setSearchText(""))}>General</Badge>
                    <Badge colorScheme="green" onClick={()=>(setSelectedCategory("business"),setSearchText(""))}>Business</Badge>
                    <Badge colorScheme="red" onClick={()=>(setSelectedCategory("entertainment"),setSearchText(""))}>Entertainment</Badge>
                    <Badge colorScheme="yellow" onClick={()=>(setSelectedCategory("health"),setSearchText(""))}>Health</Badge>
                    <Badge colorScheme="blue" onClick={()=>(setSelectedCategory("science"),setSearchText(""))}>Science</Badge>
                    <Badge colorScheme="pink" onClick={()=>(setSelectedCategory("sports"),setSearchText(""))}>Sports</Badge>
                    <Badge colorScheme="purple" onClick={()=>(setSelectedCategory("technology"),setSearchText(""))}>Technology</Badge>
                </Stack>
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

                (
                    searchText === "" ?

                    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                        {selectedCategory && <Text fontSize="md">Selected Category: <b>{selectedCategory}</b></Text>}
                        {   
                            categoryNews && categoryNews.map((article,index) => (
                                <Box key={index} padding="6" boxShadow="lg" bg="white"  className={styles.newscard}>
                                    <div className={styles.carddetails}>
                                        <div className={styles.details}>
                                            <div className={styles.title}>
                                                <Text fontSize="lg" color="black" fontWeight="500">{article.name}</Text>
                                                <Text fontSize="lg" color="black" fontWeight="300">{article.description}</Text>
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
                    </div> :

                    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    {searchText && <Text fontSize="md">You Searched for <b>{searchText}</b></Text> }
                    {   
                        articles && articles.map((article,index) => (
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
                )   
            }
        </div>
    )
}


export default Searchnews;
