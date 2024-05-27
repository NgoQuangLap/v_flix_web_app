/* eslint-disable */
import { Card, Col, Divider, Row } from 'antd';
import Link from 'antd/es/typography/Link';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from 'views/components/Navbar';
import { useSelector } from 'react-redux';
import { userSelectors } from 'state/modules/user';
import { paymentBank } from 'apis/paymentApi';

const PaymentBank = () => {
  const loacation = useLocation();
  const history = useHistory();
  const { amount, customerId, filmId, nameFilm } = loacation.state;
  const user = useSelector((state) => userSelectors.user(state));
  const userEmail = user && user.get('userEmail');

  const handleSubmit = async () => {
    try {
       const res = await paymentBank({ amount, customerId, filmId })
       console.log(res, 'res')
    } catch (error) {
        console.log(error)
    } finally {
        history.push({ pathname: '/' })
    }    
  };

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100dvh'
      }}>
        <Navbar
          style={{ color: '#fff', width: '100%', height: 64 }}
          onBack={() => router.back()}
        />
        <div style={{ width: '100%', maxWidth: 720, marginTop: '60px' }}>
          <Card style={{ borderRadius: 0, background: 'transparent', border: 0 }} bodyStyle={{ paddingTop: 0 }}>
            <Row style={{ marginTop: 24 }}>
              <h1 style={{ margin: 0, color: 'white', fontWeight: 600, fontSize: 20 }} level={5}>
                Thanh toán bằng hình thức chuyển khoản
              </h1>
            </Row>

            <ul>
              <Row style={{ marginTop: 16 }}>
                <h5 style={{ color: '#fff' }}>

                <strong style={{ color: 'yellow' }}>Bước 1:</strong> Nhập thông tin và nội dung chuyển khoản như hình dưới (Hoặc quét mã QR)
                </h5>
              </Row>
              <Row
                style={{ marginTop: 16, padding: '16px 11px', background: '#11365C', borderRadius: 8 }}
                gutter={[12, 12]}
              >
                <div style={{ display: 'flex'}}>
                <Col style={{ width: '45%' }}>
                  <Row>
                    <h5 style={{ fontWeight: 700, color: 'yellow', marginBottom: 16 }}>
                      Quét mã QR để thanh toán
                    </h5>
                  </Row>
                  <Row style={{ marginTop: 8 }}>
                    <img
                      style={{borderRadius: 10 }}
                      src="/imgs/qr_code.jpg"
                    />
                  </Row>
                </Col>
                <Col>
                  <div
                    className='transfer-info-ctn'
                    style={{
                      background: 'transparent',
                      borderRadius: 4,
                      height: '100%',
                      width: '100%',
                      padding: 12,
                      color: 'red',
                      marginTop: '50px'
                    }}
                  >
                    <Row>
                      <Col span={9}>
                        <h4 strong>Ngân hàng :</h4>
                      </Col>
                      <Col span={15}>
                        <h4>Techcombank - Chi nhánh Cầu Giấy</h4>
                      </Col>
                    </Row>
                    <Divider style={{ margin: 11 }} />
                    <Row>
                      <Col span={9}>
                        <h4 strong>Tên tài khoản :</h4>
                      </Col>
                      <Col span={15}>
                        <h4>Ngô Quang Lập</h4>
                      </Col>
                    </Row>
                    <Divider style={{ margin: 11 }} />
                    <Row>
                      <Col span={9}>
                        <h4 strong>Số tài khoản :</h4>
                      </Col>
                      <Col span={15}>
                        <h4 copyable>lapnq20</h4>
                      </Col>
                    </Row>
                    <Divider style={{ margin: 11 }} />
                    <Row>
                      <Col span={9}>
                        <h4 strong>Số tiền :</h4>
                      </Col>
                      <Col span={15}>
                        <h4 copyable>{amount}</h4>
                      </Col>
                    </Row>
                    <Divider style={{ margin: 11 }} />
                    <Row>
                      <Col span={9}>
                        <h4 strong>Nội dung :</h4>
                      </Col>
                      <Col span={15}>{`${userEmail}`}</Col>
                    </Row>
                  </div>
                </Col>
                </div>
              </Row>

              <Row style={{ marginTop: 16, padding: 12, background: '#11365C', borderRadius: 8 }} gutter={8}>
                <h5 style={{ color: 'red' }} strong>Lưu ý</h5>
                <ul style={{ marginLeft: 18, listStyleType: 'disc' }}>
                  <li style={{ color: '#fff' }}>
                    Kiểm tra chính xác nội dung chuyển khoản trước khi thực hiện, các trường hợp chuyển khoản sai cú
                    pháp có thể liên hệ <span>
                      <Link style={{ color: 'yellow' }} href={`mailto:vflix@gmail.com`}>
                        vflix@gmail.com 
                      </Link>
                    </span>
                    hỗ trợ để được giúp đỡ.
                  </li>
                  <li style={{ color: '#fff' }}>Bạn có thể quét mã QR bên trên nếu sử dụng app ngân hàng của bạn (Android và iOS).</li>
                </ul>
              </Row>
              <Row style={{ marginTop: 16 }}>
                <h4 style={{ color: '#fff' }}>
                  <strong style={{ color: 'yellow' }}>Bước 2:</strong> Cosun sẽ tiến hành kiểm tra & thông báo đến bạn sau khi quá trình thanh toán hoàn tất.
                </h4>
              </Row>
              <Row style={{ marginTop: 16 }}>
                <h4 style={{ color: '#fff' }}>
                  <strong style={{ color: 'yellow' }}>Bước 3:</strong> Nhấn Hoàn thành để nhận thông báo.
                </h4>
              </Row>
              <Row style={{ marginTop: 24 }}>
              <button
                    className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    onClick={() => handleSubmit()}
                >
                    Xác nhận
                </button>
              </Row>
            </ul>
          </Card>
        </div>
      </div>
  );
};

export default PaymentBank;