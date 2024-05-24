/* eslint-disable */
import { paymentFilm } from 'apis/paymentApi';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentMethod = () => {
  const loacation = useLocation();
  console.log(loacation, 'loca')
  const [selectedMethod, setSelectedMethod] = React.useState('stripe');

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
  };

  const handleSubmit = async () => {
    console.log(`Phương thức thanh toán đã chọn: ${selectedMethod}`);
    const { amount, customerId, filmId, nameFilm } = loacation.state;
    try {
      const response = await paymentFilm({amount, customerId, filmId, nameFilm})

      window.location.href = response.data.data
    } catch (error) {
      console.log(error)
    }
  };


  // const renderBreadcrumbs = (data = []) => {
  //   return (
  //     <div className='flex items-center h-full gap-5'>
  //       {
  //         data.map((item, index) => (
  //           <div key={`${index + 1}`} className='flex items-start'>
  //             {
  //               item.url ? (
  //                 <Link
  //                   to={item.url}
  //                   type='button'
  //                   className='text-red-600 cursor-pointer font-medium text-20 capitalize max-w-xs truncate'
  //                 >
  //                   {`${item.label}`}
  //                 </Link>
  //               ) : (
  //                 <div className='text-white font-medium text-20 capitalize max-w-xs truncate'>{`${item.label}`}</div>
  //               )
  //             }
  //             {
  //               index + 1 < data?.length && (
  //                 <div className='font-medium text-20 text-white ml-5'>/</div>
  //               )
  //             }
  //           </div>
  //         ))
  //       }
  //     </div>
  //   );
  // }

  return (
    <>
      {/* <div className='flex justify-center py-12'>
        <div className='container'>
          {renderBreadcrumbs(dataBCR)}
        </div>
      </div> */}
      <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">Chọn Phương Thức Thanh Toán</h1>
                
                <div className="space-y-4">
                    <div 
                        className={`border p-4 rounded-lg cursor-pointer transition ${selectedMethod === 'transfer' ? 'bg-gray-100' : ''}`}
                        onClick={() => handleMethodChange('transfer')}
                    >
                        <label className="flex items-center space-x-4">
                            <input 
                                type="radio" 
                                name="paymentMethod" 
                                className="form-radio h-5 w-5 text-blue-600" 
                                checked={selectedMethod === 'transfer'}
                                onChange={() => handleMethodChange('transfer')}
                            />
                            {/* <img src={bankImg} alt="Chuyển khoản ngân hàng" className="h-10 w-10"/> */}
                            <span className="text-lg font-medium">Chuyển khoản ngân hàng</span>
                        </label>
                    </div>

                    <div 
                        className={`border p-4 rounded-lg cursor-pointer transition ${selectedMethod === 'stripe' ? 'bg-gray-100' : ''}`}
                        onClick={() => handleMethodChange('stripe')}
                    >
                        <label className="flex items-center space-x-4">
                            <input 
                                type="radio" 
                                name="paymentMethod" 
                                className="form-radio h-5 w-5 text-blue-600" 
                                checked={selectedMethod === 'stripe'}
                                onChange={() => handleMethodChange('stripe')}
                            />
                            {/* <img src={visaImg} alt="Visa" className="h-10 w-10"/> */}
                            <span className="text-lg font-medium">Thanh toán bằng tài khoản Visa</span>
                        </label>
                    </div>
                </div>

                <button 
                    className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    onClick={() => handleSubmit()}
                >
                    Xác nhận
                </button>
            </div>
        </div>
    </>
  );
};

export default PaymentMethod;