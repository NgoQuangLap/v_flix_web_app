/* eslint-disable */
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const PaymentSuccess = () => {
    const history = useHistory();

    return (
        <div
            className="flex items-center justify-center bg-gray-100"
            style={{
                height: '400px'
            }}
        >
            <div className="p-8 rounded-lg text-center">
                <div className="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="none" viewBox="0 0 24 24" stroke="green" strokeWidth="2" className="mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4M21 12a9 9 0 11-18 0a9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 className="text-4xl font-bold mb-4 mt-6">Thanh toán thành công!</h1>
                <p className="mb-10 text-2xl">Cảm ơn bạn đã thanh toán. Đơn hàng của bạn sẽ được xử lý sớm. Chúc quý khách xem phim vui vẻ.</p>
                <button
                    className="bg-red-primary py-3 px-5 rounded-lg text-center text-16 text-white font-bold cursor-pointer"
                    onClick={() => history.push({ pathname: '/' })}
                >
                    Về trang chủ
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;