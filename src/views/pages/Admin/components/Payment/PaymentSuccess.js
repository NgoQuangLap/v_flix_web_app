/* eslint-disable */
import React from 'react';

const PaymentSuccess = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4M21 12a9 9 0 11-18 0a9 9 0 0118 0z"/>
                </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Thanh toán thành công!</h1>
            <p className="mb-4">Cảm ơn bạn đã thanh toán. Đơn hàng của bạn sẽ được xử lý sớm.</p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition" href="/">Về trang chủ</button>
        </div>
    </div>
    );
};

export default PaymentSuccess;