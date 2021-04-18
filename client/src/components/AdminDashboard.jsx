import React, { Fragment, useState } from 'react';
import { createCategory } from '../api/category';
import isEmpty from 'validator/lib/isEmpty';
import {showErrorMsg, showSuccessMsg } from '../helper/message';
import { showLoading } from '../helper/loading';
// import { response } from 'express';

const AdminDashboard = () => {

    const [category, setCategory] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    //****event handler */

    const handleMessages = evt => {
        setErrorMsg('');
        setSuccessMsg('');
    }

    const handleCategoryChange = evt => {
        setErrorMsg('');
        setSuccessMsg('');
        setCategory(evt.target.value);
        // console.log(category);
    }

    const handleCategorySubmit = evt => {
        evt.preventDefault();
        // console.log(category);
        // setLoading(true);
        if (isEmpty(category)) {
            setErrorMsg('Please enter a category')
        } else {
            const data ={ category }
            setLoading(true);
            createCategory(data)
                .then(response => {
                    setLoading(false);
                    setSuccessMsg(response.data.successMessage)
                })
                .catch(err => {
                    setLoading(false);
                    setErrorMsg(err.response.data.errorMessage);
                })
        }

    };


    // ###### view #####
    const showHeader = () => (
        
        <div className='bg-dark text-white py-4'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <h1>
                            <i className='fas fa-home'> Dashboard</i>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );

    const  showActionBtns = () => (
        <div className='bg-light my-2'>
            <div className='container'>
                <div className='row pb-3'>
                    <div className='d-grid gap-2 col-md-4 my-1'>
                        <button type="button" className='btn btn-outline-info' data-bs-toggle='modal' data-bs-target='#addCategoryModal'>
                            <i className='fas fa-plus'> Add Category</i>
                        </button>
                    </div>

                    <div className='d-grid gap-2 col-md-4 my-1'>
                        <button type="button" className='btn btn-outline-warning'>
                            <i className='fas fa-plus'> Add second cat</i>
                        </button>
                    </div>

                    <div className='d-grid gap-2 col-md-4 my-1'>
                        <button type="button" className='btn btn-outline-success'>
                            <i className='fas fa-money-check-alt'>  View Order</i>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );


    const showCategoryModal = () => (
        <div id='addCategoryModal' className='modal' onClick={handleMessages}>
            <div className='modal-dialog modal-dialog-centered modal-lg'>
                <div className='modal-content'>
                    <form onSubmit={handleCategorySubmit}>
                        <div className='modal-header bg-info text-white'>
                            <h5 className='modal-title'>Add Category</h5>
                            <button className='close' data-bs-dismiss='modal'>
                                <span><i className='fas fa-times'></i></span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            {errorMsg && showErrorMsg(errorMsg)}
                            {successMsg && showSuccessMsg(successMsg)}
                            {
                                loading ?  (
                                    <div className='text-center'>{showLoading()}</div>
                                ) : (
                                    <Fragment>
                                        <label className='text-secondary'>Category</label>
                                        <input type='text' className='form-control' name='category' value={category} onChange={handleCategoryChange} />
                                    </Fragment>
                                )
                            }
                            
                            
                        </div>
                        <div className='modal-footer'>
                            <button className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                            <button type='submit' className='btn btn-info'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

//// ##### RENDER ######
    return (
        <section>
            { showHeader() }
            { showActionBtns() }
            { showCategoryModal() }
        </section>
    )
};

export default AdminDashboard;