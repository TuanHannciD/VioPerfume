import React from 'react';
import { Button, Table } from 'reactstrap';

const ProductTable = ({ products, addToOrder }) => {
    // Kiểm tra nếu không có sản phẩm nào
    if (!products || products.length === 0) {
        console.log("Không có sản phẩm nào để hiển thị."); // In ra console nếu không có sản phẩm
        return <div>Không có sản phẩm nào để hiển thị.</div>;
    } else {
        console.log("Dữ liệu sản phẩm:", products); // In ra console nếu có sản phẩm
    }

    return (
        <div>
            <h1>Danh sách sản phẩm hiện có</h1>
            <Table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr key={product.productsId}>
                        <td><img src={product.imagePD} alt={product.nameProducts} width="50" /></td>
                        <td>{product.nameProducts}</td>
                        <td>{product.codeProductsPD}</td>
                        <td>
                            {product.priceSalePD ? (
                                <>
                                    <span style={{ textDecoration: 'line-through', marginRight: 5 }}>{product.pricePD.toLocaleString()}VNĐ</span>
                                    <span>${product.priceSalePD}</span>
                                </>
                            ) : `${product.pricePD.toLocaleString()} VNĐ`}
                        </td>
                        <td>
                            <Button color="primary" onClick={() => addToOrder(product.productsId)}>Add</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
    );
};

export default ProductTable;
