import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';
import { getAllProductCategorys, AddProductCategorys, updateProductCategory, getByIdProductCategory } from '../../api/apiProductCategorys';


export const ProductCategoryModal = ({ isOpen, toggle, close }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ Name: '', Title: '', SeoTitle: '', SeoDescription: '', SeoKeyWord: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false); // Modal chỉnh sửa danh mục

  // Fetch danh mục sản phẩm từ API
  const fetchCategories = async () => {
    try {
      const response = await getAllProductCategorys();
      setCategories(response);
    } catch (error) {
      console.error('Có lỗi khi tải danh mục sản phẩm', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleAddCategory = async () => {
    try {
      const response = await AddProductCategorys(newCategory);
      setCategories([...categories, response]);
      setNewCategory({ Name: '', Title: '', SeoTitle: '', SeoDescription: '', SeoKeyWord: '' });
      setIsAddCategoryModalOpen(false); // Đóng modal sau khi thêm thành công
    } catch (error) {
      console.error('Có lỗi khi thêm danh mục sản phẩm', error);
    }
  };

  const handleEditCategory = async () => {
    if (!currentCategory) return;

    try {
      // Cập nhật danh mục
      await updateProductCategory(currentCategory.id, currentCategory);
      
      // Lấy lại thông tin mới nhất của danh mục vừa cập nhật
      const updatedCategory = await getByIdProductCategory(currentCategory.id);
      
      // Cập nhật lại state với thông tin mới
      const updatedCategories = categories.map(cat =>
        cat.id === currentCategory.id ? updatedCategory : cat
      );
      
      setCategories(updatedCategories);
      setIsEditCategoryModalOpen(false);
      setCurrentCategory(null);
    } catch (error) {
      console.error('Có lỗi khi cập nhật danh mục sản phẩm:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditing && currentCategory) {
      setCurrentCategory({ ...currentCategory, [name]: value });
    } else {
      setNewCategory({ ...newCategory, [name]: value });
    }
  };

  const handleEditButtonClick = (category) => {
    setIsEditing(true);
    setCurrentCategory(category);
    setIsEditCategoryModalOpen(true); // Mở modal chỉnh sửa danh mục
  };

  const toggleAddCategoryModal = () => {
    setIsAddCategoryModalOpen(!isAddCategoryModalOpen);
  };

  const toggleEditCategoryModal = () => {
    setIsEditCategoryModalOpen(!isEditCategoryModalOpen);
  };
  const closeBtnAdd = (
    <button className="close" onClick={toggleAddCategoryModal} type="button">
      &times;
    </button>
  );
  const closeBtnEdit = (
    <button className="close" onClick={toggleEditCategoryModal} type="button">
      &times;
    </button>
  );

  return (
    <div>
      {/* Modal chính */}
      <Modal isOpen={isOpen} toggle={toggle} backdrop = {false} size="lg" style={{ maxWidth: '100%', width: '100%', height: '100vh', margin: 0, padding: 0 ,transform:"none"}}>
        <ModalHeader toggle={toggle} close={close}>Quản lý danh mục sản phẩm</ModalHeader>
        <ModalBody style={{ height: 'calc(100vh - 56px)', overflowY: 'auto' }}>
          {/* Nút thêm danh mục */}
          <Button color="primary" onClick={toggleAddCategoryModal}>
            Thêm danh mục
          </Button>

          {/* Bảng danh sách danh mục */}
          <Table striped>
            <thead>
              <tr>
                <th>Tên danh mục</th>
                <th>Tiêu đề</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.title}</td>
                  <td>
                    <Button
                      color="warning"
                      size="sm"
                      onClick={() => handleEditButtonClick(category)}
                    >
                      Chỉnh sửa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ModalBody>
      </Modal>

      {/* Modal thêm danh mục */}
      <Modal isOpen={isAddCategoryModalOpen} toggle={toggleAddCategoryModal} backdrop ={false} size="lg">
        <ModalHeader toggle={toggleAddCategoryModal} close={closeBtnAdd}>Thêm danh mục sản phẩm</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="categoryName">Tên danh mục</Label>
              <Input
                type="text"
                name="Name"
                id="categoryName"
                value={newCategory.Name}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="categoryTitle">Tiêu đề</Label>
              <Input
                type="text"
                name="Title"
                id="categoryTitle"
                value={newCategory.Title}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="categorySeoTitle">SEO Title</Label>
              <Input
                type="text"
                name="SeoTitle"
                id="categorySeoTitle"
                value={newCategory.SeoTitle}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="categorySeoDescription">SEO Description</Label>
              <Input
                type="text"
                name="SeoDescription"
                id="categorySeoDescription"
                value={newCategory.SeoDescription}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="categorySeoKeyWord">SEO Keywords</Label>
              <Input
                type="text"
                name="SeoKeyWord"
                id="categorySeoKeyWord"
                value={newCategory.SeoKeyWord}
                onChange={handleInputChange}
              />
            </FormGroup>
            <Button color="primary" onClick={handleAddCategory}>
              Thêm danh mục
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleAddCategoryModal}>
            Đóng
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal chỉnh sửa danh mục */}
      <Modal isOpen={isEditCategoryModalOpen} toggle={toggleEditCategoryModal} backdrop ={false} size="lg">
        <ModalHeader toggle={toggleEditCategoryModal} close={closeBtnEdit}>Chỉnh sửa danh mục sản phẩm</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="editCategoryName">Tên danh mục</Label>
              <Input
                type="text"
                name="Name"
                id="editCategoryName"
                value={currentCategory?.Name || ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editCategoryTitle">Tiêu đề</Label>
              <Input
                type="text"
                name="Title"
                id="editCategoryTitle"
                value={currentCategory?.Title || ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editCategorySeoTitle">SEO Title</Label>
              <Input
                type="text"
                name="SeoTitle"
                id="editCategorySeoTitle"
                value={currentCategory?.SeoTitle || ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editCategorySeoDescription">SEO Description</Label>
              <Input
                type="text"
                name="SeoDescription"
                id="editCategorySeoDescription"
                value={currentCategory?.SeoDescription || ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editCategorySeoKeyWord">SEO Keywords</Label>
              <Input
                type="text"
                name="SeoKeyWord"
                id="editCategorySeoKeyWord"
                value={currentCategory?.SeoKeyWord || ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <Button color="primary" onClick={handleEditCategory} onChange={getAllProductCategorys}>
              Cập nhật danh mục
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleEditCategoryModal}>
            Đóng
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
