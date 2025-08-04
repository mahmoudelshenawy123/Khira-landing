import React from 'react'
import styles from './ButtonsLoading.module.css'
import loadingSrc from 'assets/imgs/walkingLoaderWhite.gif'
function ButtonsLoading() {
  return (
    <>
        <img src={loadingSrc} alt="element loading" className={styles['element-loading']}/>
    </>
  )
}

export default ButtonsLoading