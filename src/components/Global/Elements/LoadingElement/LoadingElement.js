import React from 'react'
import styles from './LoadingElement.module.css'
import loadingElementSrc from 'assets/imgs/loadingElement.gif'
function LoadingElement() {
  return (
    <div className={styles['loading__wrapper']} >
      <img src={loadingElementSrc} className={styles['loading__img']} alt='loading gif'/>
    </div>
  )
}

export default LoadingElement