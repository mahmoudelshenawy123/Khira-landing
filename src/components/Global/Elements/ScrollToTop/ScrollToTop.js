import React, { useEffect, useRef } from 'react'
import styles from './ScrollToTop.module.css'
import {ReactComponent as TopArrow} from 'assets/icons/TopArrow.svg'
function ScrollToTop() {
    const navRef=useRef(null)
    function navToTop(){
        window.scrollTo(0,0)
    }
    useEffect(()=>{
        let scrollEvent = document.addEventListener('scroll',()=>{
            if(window.pageYOffset>300){
                navRef.current.classList.add(styles['nav-to-top--visible'])
            }else{
                navRef.current.classList.remove(styles['nav-to-top--visible'])
            }
        })
        return ()=>document.removeEventListener('scroll',scrollEvent)
    },[])
  return (
    <button className={`${styles['nav-to-top']} `} onClick={navToTop} ref={navRef}>
        <TopArrow className={styles['nav-to-top__icon']}/>
        {/* <svg className={styles['nav-to-top__border']}>
            <circle cx="100" cy="100" r="75" />
        </svg> */}
        {/* <img src={ScrollToTopImage} className={styles['nav-to-top__icon']}/> */}
    </button>
  )
}

export default ScrollToTop