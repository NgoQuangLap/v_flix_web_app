/* eslint-disable */

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaTrashRestore } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoriesSelectors } from 'state/modules/categories';

const RowTablePayments = (props) => {
  const { payment, index } = props;

  return (
    <tr key={payment._id}>
      <td className='text-center pl-3rem pt-4'>{index + 1}</td>
      <td className='h-6rem overflow-y-auto text-center'>
        {payment.customerEmail}
      </td>
      <td
        className='h-6rem overflow-y-auto text-center'
        style={{ color: 'yellow', fontWeight: 600 }}
      >
        {payment.paymentMethod === 'stripe' ? "Thanh toán online" : "Chuyển khoản"}
      </td>
      <td className='h-6rem overflow-y-auto text-center'>
        {payment.nameFilm}
      </td>
      <td className='h-6rem overflow-y-auto text-center'>
        {payment.price}
      </td>
      <td
        className='h-6rem overflow-y-auto text-center'
        style={{ color: payment.paymentStatus === 'pending' ? 'red' : 'green', fontWeight: 600 }}
      >
        {payment.paymentStatus === 'pending' ? "Chờ xử lý" : "Hoàn thành"}
      </td>
      <td>
        <Link
          to={`/admin/payment/${payment.paymentId}`}
          className='flex justify-center cursor-pointer'
          aria-label='Chỉnh sửa'
        >
          <FaEdit className='text-blue-facebook hover:text-blue-facebook-d text-26 transition-all duration-200' />
        </Link>
      </td>
    </tr>
  );
};

RowTablePayments.propTypes = {
  payment: PropTypes.object.isRequired,
  isBin: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  handleFlag: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired
}

export default RowTablePayments;
