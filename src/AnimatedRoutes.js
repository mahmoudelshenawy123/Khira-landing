import React,{ useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from "views/Home/Home";
import NavBar from 'components/Global/Layout/NavBar/NavBar';
import SideBar from 'components/Global/Layout/SideBar/SideBar';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import Footer from 'components/Global/Layout/Footer/Footer';
import ContactUs from 'views/ContactUs/ContactUs';
import About from 'views/About/About';
import Products from 'views/Products/Products';
import ProductDetails from 'views/ProductDetails/ProductDetails';
import ShoppingCart from 'views/ShoppingCart/ShoppingCart';
import CheckOut from 'views/CheckOut/CheckOut';
import ScrollToTop from 'components/Global/Elements/ScrollToTop/ScrollToTop';
import BottomNavBar from 'components/Global/Layout/BottomNavBar/BottomNavBar';
import BottomNavBarLinks from 'components/Global/Layout/BottomNavBarLinks/BottomNavBarLinks';
import Login from 'views/Login/Login';
import ForgetPassword from 'views/ForgetPassword/ForgetPassword';
import Account from 'views/Account/Account';
import DashboardWrapper from 'components/Account/DashboardWrapper/DashboardWrapper';
import OrdersWrapper from 'components/Account/OrdersWrapper/OrdersWrapper';
import OrdersDetailsWrapper from 'components/Account/OrdersDetailsWrapper/OrdersDetailsWrapper';
import AddressWrapper from 'components/Account/AddressWrapper/AddressWrapper';
import AddEditBillingAddressWrapper from 'components/Account/AddEditBillingAddressWrapper/AddEditBillingAddressWrapper';
import AddEditShippingAddressWrapper from 'components/Account/AddEditShippingAddressWrapper/AddEditShippingAddressWrapper';
import EditAccountWrapper from 'components/Account/EditAccountWrapper/EditAccountWrapper';
import { axiosConfig } from 'utils/axiosConfig';
import { changeCartItems, changeProductsAction, changeSettings, changeTokenAction, changeUserDetails } from 'reduxStore/Global/GlobalActions';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import ResetPassword from 'views/ResetPassword/ResetPassword';
import NotAuthed from 'utils/NotAuthed';
import Authed from 'utils/Authed';
import RecievedOrder from 'views/RecievedOrder/RecievedOrder';
import PaymentView from 'views/Payment/PaymentView';
import TermsAndConditions from 'views/TermsAndConditions/TermsAndConditions';
// import AddEditAddressWrapper from 'components/Account/AddEditBillingAddressWrapper/AddEditBillingAddressWrapper';
function AnimatedRoutes() {
    const location = useLocation()
    const dispatch = useDispatch()
    const selector = useSelector(state=>state?.GlobalReducer)
    const [isSideBarVisible , setIsSideBarVisible] =useState(false)
    const [isNavbarHide,setIsNavbarHide] =useState(false)
    const [isNavbarFixed,setIsNavbarFixed] =useState(false)
    const [products,setAllProducts] =useState(false)
    let toggleSideNavBar =(type)=>{
      setIsSideBarVisible(type==='open')
      if(type==='open'){
        document.querySelector('.js-bottom-navbar').classList.add('hidden-bottom-navbar')
      }else{
        document.querySelector('.js-bottom-navbar').classList.remove('hidden-bottom-navbar')
      }
    }
    
    function getAllProducts(){
      axiosConfig.get('/product/all-products').then(res=>{
        dispatch(changeProductsAction(res.data.data))
      }).catch(error=>{
        console.log(error.response)
      })
    }

    function generateUniqueIdentifer(){
      if(!localStorage.getItem('unique_identifier')){
        localStorage.setItem('unique_identifier',uuidv4());
      }
    }

    function getCartItems(){
      axiosConfig.get(`/cart/all-cart-items/${localStorage.getItem('unique_identifier')}`,{
        headers:{
          authorization: `Bearer ${selector?.token}`
        }
      }).then(res=>{
        dispatch(changeCartItems(res.data.data))
      }).catch(error=>{
        console.log(error.response)
      })
    }
    
    function getSettings(){
      axiosConfig.get(`/settings`,{
        headers:{
          authorization: `Bearer ${selector?.token}`
        }
      }).then(res=>{
        dispatch(changeSettings(res.data.data))
      }).catch(error=>{
        console.log(error.response)
      })
    }

    
  function getUserDetails(){
    axiosConfig.get('/user/single-user',{
      headers:{
        authorization:`Bearer ${selector?.token}`
      }
    }).then(res=>{
      dispatch(changeUserDetails(res?.data?.data))
    }).catch(err=>{
      console.log(err)
      // setErrorMessage(err?.response?.data?.message)
      // setIsError(true)
      // setIsSuccess(false)
    })
  }
  useEffect(()=>{
    function toggleNavbarWhileScroll(){
      if(window.scrollY >80 ){
        setIsNavbarFixed(true)
      }else{
        setIsNavbarFixed(false)
      }
    }
    let windowScroll =window.addEventListener('scroll',toggleNavbarWhileScroll)
    return ()=>window.removeEventListener('scroll',windowScroll)
  },[])
  useEffect(()=>{
    getAllProducts()
    getCartItems()
    getSettings()
    getUserDetails()
    generateUniqueIdentifer()
  },[]) 
  useEffect(()=>{
    window.scrollTo(0,0)
  },[location])
  return (
    <>
          {
            !location.pathname.includes('receive-order')&&
            <>
            <NavBar 
              toggleSideNavBar={()=>{toggleSideNavBar('open')}}
              isNavbarFixed={isNavbarFixed} 
              isNavbarHide={isNavbarHide}
            />
            <SideBar isSideBarVisible={isSideBarVisible}  toggleSideNavBar={()=>{toggleSideNavBar('close')}}/>
            </>
          }
            <BottomNavBar/>
            <ScrollToTop/>
            <BottomNavBarLinks/>
            <div className="App">
            <ToastContainer />
            <AnimatePresence>
              <Routes location={location} key={location.pathname}>
                  <Route path='/' exact element={<Home/>}></Route>
                  <Route path='/contact-us' element={<ContactUs/>}></Route>
                  <Route path='/about' element={<About/>}></Route>
                  <Route path='/products' element={<Products/>}></Route>
                  <Route path='/product-details/:slug' element={<ProductDetails/>}></Route>
                  <Route path='/cart' element={<ShoppingCart/>}></Route>
                  <Route path='/check-out' element={<CheckOut/>}></Route>
                  <Route path='/payment/:id' element={<PaymentView/>}></Route>
                  <Route path='/login' element={<NotAuthed><Login/></NotAuthed>}></Route>
                  <Route path='/forget-password' element={<NotAuthed><ForgetPassword/></NotAuthed>}></Route>
                  <Route path='/reset-password' element={<NotAuthed><ResetPassword/></NotAuthed>}></Route>
                  <Route path='/receive-order' element={<RecievedOrder/>}></Route>
                  <Route path='/terms' element={<TermsAndConditions/>}></Route>
                  
                  
                  <Route path="my-account" element={<Authed><Account/></Authed>}>
                    <Route index element={<DashboardWrapper />} />
                    <Route path="orders" element={<OrdersWrapper />} />
                    <Route path="orders/:id" element={<OrdersDetailsWrapper />} />
                    <Route path="addresses" element={<AddressWrapper />} />
                    <Route path="addresses/add-billing-address" element={<AddEditBillingAddressWrapper />} />
                    <Route path="addresses/edit-billing-address/:id" element={<AddEditBillingAddressWrapper />} />
                    <Route path="addresses/add-shipping-address" element={<AddEditShippingAddressWrapper />} />
                    <Route path="addresses/edit-shipping-address/:id" element={<AddEditShippingAddressWrapper />} />
                    <Route path="edit-account" element={<EditAccountWrapper />} />
                  </Route>
              </Routes>
            </AnimatePresence>
            {
              !location.pathname.includes('receive-order')&&
              <Footer/>
          }
            </div>
    </>
  )
}

export default AnimatedRoutes