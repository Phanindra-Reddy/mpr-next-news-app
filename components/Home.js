import Link from 'next/link';
import styles from "../styles/Home.module.css";
import {useRouter} from "next/router";

function Home() {
    const router = useRouter()
    
  return (
    <div className={styles.navbar}>

        <Link href="/news" className={styles.active}>
          <a className={router.pathname == "/news" ? styles.active : ""}>News</a>
        </Link>
      
        <Link href="/searchnews">
          <a className={router.pathname == "/searchnews" ? styles.active : ""}>Search News</a>
        </Link>

        <Link href="/countries">
          <a className={router.pathname == "/countries" ? styles.active : ""}>Countries</a>
        </Link>
      
    </div>
  )
}

export default Home