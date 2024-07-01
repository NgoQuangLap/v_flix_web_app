/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable */
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import './style.scss';
import { FaSearch } from 'react-icons/fa';
import { paymentList } from 'apis/paymentApi';
import RowTablePayments from './components/RowTablePayment';
import { Loading } from 'utils/Loadable';

const ListPayment = (props) => {
  const { pathname } = useLocation();

  const [state, setState] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async() => {
      try {
        setLoading(true)
        const response = await paymentList();

        setState(response.data);
        setData(response.data)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    })();
  }, [])

  const handleSearch = () => {
    if (search) {
      const result = data.filter(item => item && item.customerEmail && item.customerEmail.toLowerCase().includes(search.toLowerCase()))
      setState([...result])
    } else {
      setState(data)
    }
  };

  return (
    <div className='listFilms w-4/5 mx-auto relative opacity-80'>
      <Helmet>
        <title>Admin - Quản lý thanh toán</title>
      </Helmet>

      <div className='listFilms__searchFilter bg-black-body mb-6 rounded-xl'>
      <h3 className='text-24 text-white font-bold py-4 px-8 bg-black-navbar border-b border-gray-primary-d rounded-t-xl'>
        Bộ lọc người dùng
      </h3>
      <div className='px-8 py-6'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className='w-full flex items-stretch mb-4'
        >
          <input
            type='text'
            placeholder='Điền tên người dùng'
            className='px-6 py-4 shadow-inner-md text-20 flex-1 bg-gray-primary-d focus:outline-none text-white leading-20 rounded-md mr-8'
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type='submit'
            aria-label='Tìm kiếm'
            className='text-20 text-white bg-red-primary px-16 rounded-md hover:bg-red-primary-d'
          >
            <FaSearch />
          </button>
        </form>
      </div>
    </div>
      <div className='bg-black-body flex flex-col pb-6 rounded-xl overflow-hidden'>
        <div className='flex bg-black-navbar px-8 justify-between items-center border-b border-gray-primary-d'>
          <h1 className='listFilms__heading text-24 font-bold text-white py-4'>
            Danh sách hóa đơn
          </h1>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className='listFilms__wrapTable h-70rem'>
            <table>
              <thead>
                <tr>
                  <th className='pl-3rem' style={{ width: '2%' }}>
                    Stt
                  </th>
                  <th style={{ width: '20%' }}>Khách hàng</th>
                  <th style={{ width: '14%' }}>Hình thức thanh toán</th>
                  <th style={{ width: '20%' }}>Tên phim</th>
                  <th style={{ width: '10%' }}>Giá bộ phim</th>
                  <th style={{ width: '20%' }}>Trạng thái</th>
                  <th className='pr-1rem' style={{ width: '10%' }} colSpan='2'>
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.map((payment, index) => {
                  return (
                    <RowTablePayments key={payment._id} payment={payment} index={index} />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPayment;
