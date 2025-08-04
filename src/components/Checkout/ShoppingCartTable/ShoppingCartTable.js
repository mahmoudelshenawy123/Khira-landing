import React from 'react'
import styles from './ShoppingCartTable.module.css'
import { useTranslation } from 'react-i18next'
import {ReactComponent as DeleteIcon} from 'assets/icons/deleteIcon.svg'
import { Table } from 'react-bootstrap'
import productImage2 from 'assets/imgs/productImage2.jpg'
import {ReactComponent as PlusIcon} from 'assets/icons/plusIcon.svg'
import {ReactComponent as MinusIcon} from 'assets/icons/minusIcon.svg'
import { Link } from 'react-router-dom'
function ShoppingCartTable() {
    const {t} =useTranslation()
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='align-middle'>
              <div className={styles['cart__product-img-wrapper']}>
                <Link to='/'>
                  <img src={productImage2} alt='product image' className={styles['cart__product-img']}/>
                </Link>
                <div className={styles['cart__product-content-wrapper']}>
                  <Link to='/' className={styles['cart__product-title']}>Gift BOX</Link>
                  <Link to='/' className={styles['cart__product-edit']}>Edit Options</Link>
                  <button className={styles['cart__product-remove']}>Remove</button>
                </div>
              </div>
            </td>
            <td className={`${styles['cart__product-text']} align-middle`}>630,00 EGP</td>
            <td className='align-middle'>
              <div className={styles['cart__product-quantity']}>
                <button className={styles['cart__product-quantity-button']}>
                  <MinusIcon className={styles['cart__product-quantity-icon']}/>
                </button>
                <input type='text' className={styles['cart__product-quantity-input']}/>
                <button className={styles['cart__product-quantity-button']}>
                  <PlusIcon className={styles['cart__product-quantity-icon']}/>
                </button>
              </div>
            </td>
            <td className={`${styles['cart__product-text']} align-middle`}>630,00 EGP</td>
          </tr>
          <tr>
            <td className='align-middle'>
              <div className={styles['cart__product-img-wrapper']}>
                <Link to='/'>
                  <img src={productImage2} alt='product image' className={styles['cart__product-img']}/>
                </Link>
                <div className={styles['cart__product-content-wrapper']}>
                  <Link to='/' className={styles['cart__product-title']}>Gift BOX</Link>
                  <Link to='/' className={styles['cart__product-edit']}>Edit Options</Link>
                  <button className={styles['cart__product-remove']}>Remove</button>
                </div>
              </div>
            </td>
            <td className={`${styles['cart__product-text']} align-middle`}>630,00 EGP</td>
            <td className='align-middle'>
              <div className={styles['cart__product-quantity']}>
                <button className={styles['cart__product-quantity-button']}>
                  <MinusIcon className={styles['cart__product-quantity-icon']}/>
                </button>
                <input type='text' className={styles['cart__product-quantity-input']}/>
                <button className={styles['cart__product-quantity-button']}>
                  <PlusIcon className={styles['cart__product-quantity-icon']}/>
                </button>
              </div>
            </td>
            <td className={`${styles['cart__product-text']} align-middle`}>630,00 EGP</td>
          </tr>
          <tr>
            <td className='align-middle'>
              <div className={styles['cart__product-img-wrapper']}>
                <Link to='/'>
                  <img src={productImage2} alt='product image' className={styles['cart__product-img']}/>
                </Link>
                <div className={styles['cart__product-content-wrapper']}>
                  <Link to='/' className={styles['cart__product-title']}>Gift BOX</Link>
                  <Link to='/' className={styles['cart__product-edit']}>Edit Options</Link>
                  <button className={styles['cart__product-remove']}>Remove</button>
                </div>
              </div>
            </td>
            <td className={`${styles['cart__product-text']} align-middle`}>630,00 EGP</td>
            <td className='align-middle'>
              <div className={styles['cart__product-quantity']}>
                <button className={styles['cart__product-quantity-button']}>
                  <MinusIcon className={styles['cart__product-quantity-icon']}/>
                </button>
                <input type='text' className={styles['cart__product-quantity-input']}/>
                <button className={styles['cart__product-quantity-button']}>
                  <PlusIcon className={styles['cart__product-quantity-icon']}/>
                </button>
              </div>
            </td>
            <td className={`${styles['cart__product-text']} align-middle`}>630,00 EGP</td>
          </tr>
        </tbody>
      </Table>
      {/* <div className={styles['cart__options-wrapper']}>
        <div className={styles['cart__copoun-wrapper']}>
          <input type='text' className={styles['cart__copoun-input']} placeholder='Coupon Code'/>
          <button className={styles['cart__copoun-submit']}>OK</button>
        </div>
        <button className={styles['cart__delete-all-button']}>
          <DeleteIcon className={styles['cart__delete-all-icon']}/>
          CLEAR SHOPPING CART
        </button>
      </div> */}
    </div>
  )
}

export default ShoppingCartTable