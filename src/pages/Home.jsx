// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Carousel, Typography, Row, Col, Card, Spin } from 'antd';
import { getAllProducts } from '../api/productApi';
import ProductCard from '../components/product/ProductCard';

const { Title, Paragraph } = Typography;

const Home = () => {
    // Sửa lỗi 2: Khởi tạo products là mảng rỗng để tránh lỗi khi truy cập .slice(0, 8)
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                if (response.success) {
                    setProducts(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    // Sửa lỗi 1: Thêm dependency array rỗng [] để chỉ chạy một lần khi component mount
    }, []);

    // newArrivals bây giờ là một mảng rỗng khi component mới load, không gây lỗi
    const newArrivals = products.slice(0, 8); // Lấy 8 sản phẩm mới nhất

    return (
        <div className="home-page">
            <Carousel autoplay>
                <div>
                    {/* SỬ DỤNG MỘT DỊCH VỤ HOLDER KHÁC HOẶC TẢI ẢNH THỰC */}
                    <img src="https://locphuc.com.vn/Content/Images/Event/SlideBanner2_PC.jpg" alt="Banner 1" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                </div>
                <div>
                    <img src="https://ngocthanhjewelry.com.vn/wp-content/uploads/2021/11/17-scaled.jpg" alt="Banner 2" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                </div>
                   <div>
                    <img src="https://www.trangsucbangvang.com/wp-content/uploads/2019/10/banner-tn.jpg" alt="Banner 3" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                </div>
            </Carousel>

            <div style={{ padding: '48px 24px' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>Sản Phẩm Mới Nhất</Title>
                {loading ? (
                    <div style={{ textAlign: 'center' }}><Spin size="large" /></div>
                ) : (
                    // Sửa lỗi 3: Thêm giá trị cho gutter (ví dụ: 16 cho khoảng cách)
                    <Row gutter={[16, 16]}>
                        {newArrivals.map(product => (
                            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                )}
            </div>

            <div style={{ background: '#f0f2f5', padding: '48px 24px' }}>
                <Row justify="center">
                    <Col xs={22} md={16} lg={12} style={{ textAlign: 'center' }}>
                        <Title level={2}>Về Chúng Tôi</Title>
                        <Paragraph>
                            Chào mừng bạn đến với Cửa hàng Trang sức, nơi vẻ đẹp và sự tinh tế hội tụ. Chúng tôi tự hào mang đến những bộ sưu tập trang sức được chế tác tinh xảo, từ những thiết kế cổ điển đến những xu hướng hiện đại, đáp ứng mọi phong cách và dịp đặc biệt.
                        </Paragraph>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Home;
