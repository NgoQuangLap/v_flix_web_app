/* eslint-disable */
import { getPaymentById, updateStatusPayment } from 'apis/paymentApi';
import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams,useHistory } from 'react-router-dom';
import { adminSelectors } from 'state/modules/admin';
import { Loading } from 'utils/Loadable';
import { FaAngleLeft } from 'react-icons/fa';
import { Modal } from '@material-ui/core';
import { VscClose } from 'react-icons/vsc';
import { MdRemoveCircle } from 'react-icons/md';

const FormUpdatePayment = () => {
    const { id } = useParams();
    const isAuthenticated = useSelector((state) =>
        adminSelectors.isAuthenticated(state),
    );
    const history = useHistory();

    const [detailFilm, setDetailFilm] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [modalWarning, setModalWarning] = useState(false)


    const handleGetDetailFilm = async () => {
        try {
            setIsLoading(true)
            const filmDetail = await getPaymentById({id});

            setDetailFilm(filmDetail.data)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            handleGetDetailFilm()
        }
    }, [id]);

    const handleSubmit = async () => {
        try {
            await updateStatusPayment(id)
        } catch (error) {
            console.log(error)
        } finally {
            history.push({ pathname: '/admin/manage/payment'})
        }
    }

    return (
        <>
            <Helmet>
                <title>Admin - Xác nhận thanh toán</title>
            </Helmet>
            <Modal
                open={modalWarning}
                onClose={() => setModalWarning(false)}
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                className='flex items-center justify-center'
            >
                <div className='bg-black-body flex items-center flex-col overflow-hidden rounded-2xl outline-none relative px-8 py-14 sm:px-24 sm:py-24'>
                <div
                    className='absolute top-1rem sm:top-3rem right-1rem sm:right-3rem bg-black-body hover:bg-gray-primary-d transition-all duration-200 p-2 rounded-full cursor-pointer'
                    onClick={() => setModalWarning(false)}
                >
                    <VscClose className='text-30 text-white' />
                </div>
                <MdRemoveCircle className='text-80 text-red-primary' />
                <h3 className='text-30 text-red-primary mt-6 pb-4 font-bold'>
                    CẢNH BÁO
                </h3>
                <span className='text-20 mb-16 block w-85% text-center text-red-primary'>
                    Hành động xác nhận này không thể khôi phục cân nhắc trước khi xóa
                </span>
                <span className='text-20 text-white mb-10 text-center'>
                    Bạn có chắc muốn xác nhận ?
                </span>
                <button
                    type='button'
                    className='py-4 px-10 bg-red-primary hover:bg-red-primary-d text-20 rounded-md text-white'
                    onClick={() => handleSubmit()}
                >
                    Đồng ý
                </button>
                </div>
            </Modal>
            {!isAuthenticated ? (
                <Redirect to='/admin' />
            ) : isLoading ? (
                <Loading />
            ) : (
                <div className='createReview flex items-center justify-center'>
                    <div className='createReview__background h-screen fixed top-0 w-full bg-black'>
                        <img
                        className='w-full h-full object-cover filter blur'
                        src='https://res.cloudinary.com/dcrfjkvlm/image/upload/v1693886610/vmoflix-tv-logo_gd1rmx.png'
                        alt=''
                        />
                    </div>
                    <form
                        // onSubmit={handleSubmit}
                        className='createReview__form z-1 bg-black-body bg-opacity-80 py-6 px-4 sm:py-24 sm:px-24 flex flex-col mt-10rem mb-10rem w-11/12 lg:w-90rem'
                    >

                        <div className='flex justify-start items-center gap-5'>
                        <div
                            className='cursor-pointer'
                            onClick={() => {
                            history.push('/admin/manage/payment');
                            }}
                        >
                            <FaAngleLeft className='text-24 sm:text-30 text-white font-bold mb-4 sm:mb-10' />
                        </div>
                        <h3 className='text-24 sm:text-30 text-white font-bold mb-4 sm:mb-10'>
                            Xác nhận thanh toán
                        </h3>
                        </div>
                        <label htmlFor='title' className='mb-6'>
                            <span className='text-20 text-white mb-2 block'>Khách hàng</span>
                            <input
                                id='title'
                                type='text'
                                className='createReview__form-input w-full'
                                placeholder='Tiêu đề bài viết'
                                disabled
                                value={detailFilm.customerEmail}
                            />
                        </label>
                        <label htmlFor='title' className='mb-6'>
                            <span className='text-20 text-white mb-2 block'>Tên phim</span>
                            <input
                                id='title'
                                type='text'
                                className='createReview__form-input w-full'
                                placeholder='Tiêu đề bài viết'
                                disabled
                                value={detailFilm.nameFilm}
                            />
                        </label>
                        <label htmlFor='title' className='mb-6'>
                            <span className='text-20 text-white mb-2 block'>Giá phim</span>
                            <input
                                id='title'
                                type='text'
                                className='createReview__form-input w-full'
                                placeholder='Tiêu đề bài viết'
                                disabled
                                value={detailFilm.price}
                            />
                        </label>
                        <label htmlFor='title' className='mb-6'>
                            <span className='text-20 text-white mb-2 block'>Hình thức thanh toán</span>
                            <input
                                id='title'
                                type='text'
                                className='createReview__form-input w-full'
                                placeholder='Tiêu đề bài viết'
                                disabled
                                value={detailFilm.paymentMethod === 'stripe' ? "Thanh toán online" : "Chuyển khoản"}
                            />
                        </label>
                        <button
                            type='button'
                            onClick={() => setModalWarning(true)}
                            className='text-white bg-red-primary text-16 font-bold py-6 rounded-md mt-8 text-center hover:bg-red-primary-d transition duration-200'
                        >
                            Xác nhận hóa đơn này
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}

export default FormUpdatePayment;