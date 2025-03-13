import React, { useEffect, useState } from "react";
// reactstrap components
import {
    Card, Table, CardHeader, CardBody, CardTitle, Row, Col,
    Button,
} from "reactstrap";
import CustomScrollbar from "utils/CustomScrollbar";
import { AddProduct, ProductsDeleteModal, ProductsDetailModal, } from "./Modals/ProductsModal";
import { AddBrand, BrandsDetailModal, BrandDeleteModal } from "./Modals/BrandModal";
import { getAllBrands } from "api/apiBrands";
import { ProductCategoryModal } from "./Modals/ProductCategoryModal";
import { getAllProducts } from "api/apiProducts";
import { useCartActions } from "services/cartService";
import { useCart } from "contexts/CartContext";

const Brands = () => {
    const [modelProduct, setModalProduct] = useState(false);
    const [modelBrand, setModalBrand] = useState(false);
    const [detailBrandsModal, setDetailBranchs] = useState(null);
    const [updateBrandsModal, setUpdateBranchs] = useState(null);
    const [deleteBrandModal, setDeleteBrandModal] = useState(null);
    const [detailProductsModal, setDetailProducts] = useState(null);
    const [updateProductsModal, setUpdateProducts] = useState(null);
    const [deleteProductsModal, setDeleteProducts] = useState(null)
    const [categoryModal, setCategoryModal] = useState(false);

    const {handleAddToCart} = useCartActions();
    const {refreshCart} = useCart();

    const addToCart = async (product) => {
        try {
            await handleAddToCart(product);
            await refreshCart();
        } catch (error) {
            console.error("Lối khi thêm sảm phẩm: ",error);
        }
    };
    // const increaseQuantity = (product) => {
    //     cartQuantity.current += 1

    //     if (timer) clearTimeout(timer);

    //     const newTimer = setTimeout(() => {
    //         handleAddToCart(product);
    //     }, 1000);
    //     setTimer(newTimer);
    // };

    // const handleAddToCart = (product) => {
    //     if (!product || !product.productsId) {
    //         console.log("Không có ID sản phẩm hoặc thông tin sản phẩm");
    //         return;
    //     }
    
    //     const data = {
    //         productID: product.productsId,
    //         quantity: cartQuantity.current,
    //     };
    
    //     console.log("Sending data to API:", data);
    
    //     postAddCart(data)
    //         .then(() => {
    //             console.log("Sản phẩm đã được thêm vào giỏ hàng thành công");
    //             cartQuantity.current = 0;
    //             fetchCart(); // Gọi lại fetchCart sau khi thêm sản phẩm
    //         })
    //         .catch((error) => {
    //             console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    //         });
    // };
    


    const toggleModalProduct = () => {
        setModalProduct(!modelProduct);
    };
    const toggleModalBrand = () => {
        setModalBrand(!modelBrand);
    };

    const toggleCategoryModal = () => {
        setCategoryModal(!categoryModal);
    };

    const toggleDetailBranchs = () => {
        setDetailBranchs(null);
    };
    const toggleUpdateBrands = () => {
        setUpdateBranchs(null);
    }
    const toggleDeleteBrand = () => {
        setDeleteBrandModal(null);
    }
    const toggleDetailProducts = () => {
        setDetailProducts(null);
    }
    const toggleUpdateProdcuts = () => {
        setUpdateProducts(null);
    }
    const toggleDeleteProducts = () => {
        setDeleteProducts(null);
    }

    const closeBtn = (
        <button className="close" onClick={toggleModalProduct} type="button">
            &times;
        </button>
    );
    const closeBtnBd = (
        <button className="close" onClick={toggleModalBrand} type="button">
            &times;
        </button>
    );
    const closeBtnDetailBranchs = (
        <button className="close" onClick={toggleDetailBranchs} type="button">
            &times;
        </button>
    );
    const closeBtnUpdateBranchs = (
        <button className="close" onClick={toggleUpdateBrands} type="button">
            &times;
        </button>
    );
    const closeBtnDeleteBrand = (
        <button className="close" onClick={toggleDeleteBrand} type="button">
            &times;
        </button>
    )
    const closeBtndetailProducts = (
        <button className="close" onClick={toggleDetailProducts} type="button">
            &times;
        </button>
    );
    const closeBtnDeleteProducts = (
        <button className="close" onClick={toggleDeleteProducts} type="button">
            &times;
        </button>
    )
    const closeBtnProductCategory = (
        <button className="close" onClick={toggleCategoryModal} type="button">
            &times;
        </button>
    );
    const closeBtnUpdateProducts = (
        <button className="close" onClick={toggleUpdateProdcuts} type="button">
            &times;
        </button>
    )


    const [products, setProducts] = useState([]);
    const [getBranch, setGetBranch] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [brachData, productsData] = await Promise.all([
                    getAllBrands(),
                    getAllProducts()
                ]);
                setGetBranch(brachData);
                setProducts(productsData)

            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }; fetchData();
    }, [])

    return (

        <div className="content">
            <Row>
                <Col lg="8">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h2">Danh sách sản phẩm</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div>
                                <Button color="success" className="animation-on-hover" onClick={toggleModalProduct}>Thêm sản phẩm</Button>
                                {/* Phần modal addPD */}
                                <Button color="info" className="animation-on-hover float-right" onClick={toggleCategoryModal} >Danh mục sản phẩm</Button>
                                <AddProduct isOpen={modelProduct} toggle={toggleModalProduct} close={closeBtn}></AddProduct>
                                <CustomScrollbar>
                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th>Tên sản phẩm</th>
                                                <th>Mã sản phẩm</th>
                                                <th>Người tạo</th>
                                                <th>Hình ảnh</th>
                                                <th>Giá</th>
                                                <th>Nhãn hàng</th>
                                                <th>Danh mục</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!products || products.length === 0 ? (
                                                <tr>
                                                    <td colSpan="8" className="text-center">
                                                        Không có sản phẩm nào
                                                    </td>
                                                </tr>
                                            ) : (
                                                products.map((product) => (
                                                    <tr key={product.productsId}>
                                                        <td>{product.nameProducts}</td>
                                                        <td>{product.codeProductsPD}</td>
                                                        <td>{product.creatByPD}</td>
                                                        <td>
                                                            {product.imagePD && (
                                                                <img
                                                                    src={product.imagePD}
                                                                    alt={product.nameProducts}
                                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                                />
                                                            )}
                                                        </td>
                                                        <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.pricePD)}</td>
                                                        <td>{product.brandIdPD}</td>
                                                        <td>{product.productCategorysIdPD}</td>
                                                        <td>
                                                            <Button
                                                                className="btn-icon btn-simple"
                                                                color="info"
                                                                size="sm"
                                                                onClick={() => setDetailProducts(product)}
                                                            >
                                                                <i className="fa fa-user"></i>
                                                            </Button>{` `}
                                                            <Button
                                                                className="btn-icon btn-simple"
                                                                color="success"
                                                                size="sm"
                                                                onClick={() => setUpdateProducts(product)}
                                                            >
                                                                <i className="fa fa-edit"></i>
                                                            </Button>{` `}
                                                            <Button
                                                                className="btn-icon btn-simple"
                                                                color="danger"
                                                                size="sm"
                                                                onClick={() => setDeleteProducts(product)}

                                                            >
                                                                <i className="fa fa-times" />
                                                            </Button>{` `}
                                                            <Button
                                                                className="btn-icon btn-warning"
                                                                color="danger"
                                                                size="sm"
                                                                onClick={() => addToCart(product.productsId)}
                                                                
                                                            >
                                                                <i className="tim-icons icon-basket-simple" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </Table>
                                </CustomScrollbar>
                            </div>

                        </CardBody>
                    </Card>
                </Col>
                <Col lg="4">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h2">Danh sách nhãn hàng</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div>
                                <Button color="success" className="animation-on-hover" onClick={toggleModalBrand}>Thêm nhãn hàng</Button>
                                <AddBrand isOpen={modelBrand} toggle={setModalBrand} close={closeBtnBd} />
                                <CustomScrollbar>
                                    <Table>

                                        <thead style={{ position: "sticky", top: 0, zIndex: 1, backdropFilter: 'blur(10px)' }}>
                                            {/* Thêm backdropFilter để làm mờ nền phía sau mà không cần thêm background */}
                                            <tr>
                                                <th className="text-center">ID</th>
                                                <th>Name</th>
                                                <th>Người Thêm</th>
                                                <th className="text-center">Ngày Thêm</th>
                                                <th className="text-right">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody style={{ top: 100 }}>
                                            {!getBranch || getBranch.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="text-center">
                                                        Không có nhãn hàng nào
                                                    </td>
                                                </tr>
                                            ) : (
                                                getBranch.map((branch) => (
                                                    <tr key={branch.branchId}>
                                                        <td>{branch.branchId}</td>
                                                        <td>{branch.branchName}</td>
                                                        <td>{branch.creatBy}</td>
                                                        <td>{branch.creatDate}</td>
                                                        <td className="text-right">
                                                            <Button className="btn-icon btn-simple" color="info" size="sm" onClick={() => setDetailBranchs(branch)}>
                                                                <i className="fa fa-user"></i>
                                                            </Button>{` `}
                                                            <Button className="btn-icon btn-simple" color="success" size="sm" onClick={() => setUpdateBranchs(branch)}>
                                                                <i className="fa fa-edit"></i>
                                                            </Button>{` `}
                                                            <Button className="btn-icon btn-simple" color="danger" size="sm" onClick={() => setDeleteBrandModal(branch)}>
                                                                <i className="fa fa-times" />
                                                            </Button>{` `}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>

                                    </Table>
                                </CustomScrollbar>
                            </div>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {detailBrandsModal && (
                <BrandsDetailModal
                    isOpen={!!detailBrandsModal}
                    toggle={toggleDetailBranchs}
                    close={closeBtnDetailBranchs}
                    branch={detailBrandsModal}

                />
            )}
            {updateBrandsModal && (
                <BrandsDetailModal
                    isOpen={!!updateBrandsModal}
                    toggle={toggleUpdateBrands}
                    close={closeBtnUpdateBranchs}
                    branch={updateBrandsModal}
                    openEdit={true}

                />
            )}
            {deleteBrandModal && (
                <BrandDeleteModal
                    isOpen={!!deleteBrandModal}
                    toggle={toggleDeleteBrand}
                    close={closeBtnDeleteBrand}
                    brands={deleteBrandModal}
                />
            )}
            {detailProductsModal && (
                <ProductsDetailModal
                    isOpen={!!detailProductsModal}
                    toggle={toggleDetailProducts}
                    close={closeBtndetailProducts}
                    products={detailProductsModal}
                />
            )}
            {updateProductsModal && (
                <ProductsDetailModal
                    isOpen={!!updateProductsModal}
                    toggle={toggleUpdateProdcuts}
                    close={closeBtnUpdateProducts}
                    products={updateProductsModal}
                    openEdit={true}
                />
            )}
            {deleteProductsModal && (
                <ProductsDeleteModal
                    isOpen={!!deleteProductsModal}
                    toggle={toggleDeleteProducts}
                    close={closeBtnDeleteProducts}
                    products={deleteProductsModal}
                />
            )}
            {categoryModal && (
                <ProductCategoryModal
                    isOpen={!!categoryModal}
                    toggle={toggleCategoryModal}
                    close={closeBtnProductCategory}
                />

            )}
        </div>

    );
}

export default Brands;
