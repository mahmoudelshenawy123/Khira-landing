import React from 'react'
import styles from './InfoAlert.module.css'
import {ReactComponent as SuccessIcon} from 'assets/icons/successIcon.svg'
function InfoAlert({message}) {
  return (
    <div className={styles['success__header']}>
        <h2 className={styles['success__header-title']}>
        <SuccessIcon className={styles['success__header-icon']}/> {message}
        </h2>
    </div>
  )
}

export default InfoAlert