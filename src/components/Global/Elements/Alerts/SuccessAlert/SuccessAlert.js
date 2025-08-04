import React from 'react'
import styles from './SuccessAlert.module.css'
import {ReactComponent as SuccessIcon} from 'assets/icons/successIcon.svg'
function SuccessAlert({message}) {
  return (
    <div className={styles['success__header']}>
        <h2 className={styles['success__header-title']}>
        <SuccessIcon className={styles['success__header-icon']}/> {message}
        </h2>
    </div>
  )
}

export default SuccessAlert