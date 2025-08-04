import React from 'react'
import styles from './Loading.module.css'
import src from 'assets/imgs/pageLoading.gif'
function Loading() {
  return (
    <div id={styles['loading']}>
        <div className={styles["loading__cont"]}>
            <img src={src} alt="loading" className={styles['loading__icon']}/>
        </div>
    </div>
  )
}

export default Loading