import React, { useEffect, useState } from 'react';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import AdminNav from '../AdminNav/AdminNav';
import { baseUrl } from '../../Redux/Store/baseUrl/BaseUrl';
import ChefFooter from '../../Chef/components/ChefFooter';
import Modal from "react-modal";
import toast, { Toaster } from 'react-hot-toast';


function Categories() {
  const [categories, setCategory] = useState([]);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ category: '', category_image: null })
  const [loading, setLoading] = useState(false);
  console.log('categories=====>>>', categories);

  const fetchCategory = async () => {
    try {
      const response = await axiosInstance.get('all_categories/');
      setCategory(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('category', newCategory.category);
      formData.append('category_image', newCategory.category_image);

      const response = await axiosInstance.post('addCategory/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success(response.data.msg)
      setNewCategory({ category: '', category_image: null })
      closeCategoryModal();
      fetchCategory();
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategoryModal = () => {
    setCategoryModalOpen(true);
  }

  const handleDeleteCategory = async (categoryId) => {

    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this category? Deleting it will also delete all courses associated with this category.');

      if (confirmDelete) {
        const response = await axiosInstance.delete(`delete_category/${categoryId}/`)

        if (response.data.msg) {
          toast.success(response.data.msg);
        }

        fetchCategory();
      } else {
        console.log('Deletion canceled');
      }


    } catch (error) {
      console.log('error', error);
    }
  };

  const closeCategoryModal = () => {
    setCategoryModalOpen(false);
  }

  return (
    <div>
      <AdminNav />
      <div className='mt-6 '>
        <h2 className='font-medium text-slate-500'>Categories</h2>
      </div>

      <div className='py-4 px-6 mb-16'>
        <div className='mb-4'>
          <button
            className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded'
            onClick={handleAddCategoryModal}
          >
            Add Category
          </button>
        </div>

        <Modal
          isOpen={categoryModalOpen}
          onRequestClose={closeCategoryModal}
          className="modal bg-opacity-90 bg-black  fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="modal-content bg-white w-96 md:w-[920px]  md:mt-11 p-4 rounded-lg shadow-lg ">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">ADD CATEGORY</h2>

              <h4
                onClick={closeCategoryModal}
                className="cursor-pointer font-bold text-red-500"
              >
                X
              </h4>

            </div>

            <form onSubmit={handleAddCategory}>
              <div className='mb-4'>
                <label htmlFor="addCtaegory" className='block text-sm font-semibold mb-2'>New Category</label>
                <input
                  type="text"
                  placeholder='New category name'
                  value={newCategory.category}
                  onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })}
                />

              </div>
              <div className='mb-4'>
                <label htmlFor="categoryImage" className='block text-sm font-semibold mb-2'>Add Image</label>

                <input
                  type="file"
                  accept='image/*'
                  onChange={(e) => setNewCategory({ ...newCategory, category_image: e.target.files[0] })}
                  className='mr-2'
                />
                <div className='mt-6 mb-4 flex justify-center'>
                  {loading ? (
                    <p className='text-black'>Loading...</p>
                  ) : (
                    <button className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded' type='submit'>
                      Add Category
                    </button>
                  )}

                </div>


              </div>
            </form>
          </div>

        </Modal>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Image</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px' }}>{category.id}</td>
                <td style={{ padding: '8px' }}>{category.category}</td>
                <td style={{ padding: '8px' }}>
                  <img
                    src={`${baseUrl}${category.category_image}`}
                    alt={category.category}
                    style={{
                      maxWidth: '100px',
                      maxHeight: '100px',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </td>
                <td style={{ padding: '8px' }}>
                  <button
                    className='bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded mr-2'
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />

      <ChefFooter />
    </div>
  );
}

export default Categories;
