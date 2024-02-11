import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { getAllOrders, createOrder, deleteOrder, updateOrder } from '../apis/orders';
import Context from '../context/createContext';



const Home = () => {
    const { user } = useContext(Context);
    const [orders, setOrders] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newOrder, setNewOrder] = useState({
        customer_name: '',
        customer_email: '',
        product: 'Product 1',
        quantity: 1,
    });
    const [editOrder, setEditOrder] = useState(null);
    const [error, setError] = useState('');

    const fetchOrders = async () => {
        if (user) {
            try {
                const res = await getAllOrders();
                setOrders(res.orders.reverse());
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user]);

    const openAddModal = () => {
        setNewOrder({
            customer_email: '',
            customer_name: '',
            product: 'Product 1',
            quantity: 1,
        });
        setEditOrder(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setError('');
    };

    const handleCreateOrder = async () => {
        if (validateOrder(newOrder)) {
            try {
                await createOrder(newOrder);
                const res = await getAllOrders();
                setOrders(res.orders.reverse());
                setNewOrder({
                    customer_email: '',
                    customer_name: '',
                    product: 'Product 1',
                    quantity: 1,
                });
                closeModal();
            } catch (error) {
                console.error('Error creating order:', error);
            }
        }
    };

    const handleEditOrder = (order) => {
        setEditOrder(order);
        setNewOrder({
            customer_name: order.customer_name,
            customer_email: order.customer_email,
            product: order.product,
            quantity: order.quantity,
        });
        setIsModalOpen(true);
    };

    const handleUpdateOrder = async () => {
        if (validateOrder(newOrder)) {
            try {
                await updateOrder(editOrder._id, newOrder);
                const res = await getAllOrders();
                setOrders(res.orders.reverse());
                setNewOrder({
                    customer_email: '',
                    customer_name: '',
                    product: 'Product 1',
                    quantity: 1,
                });
                closeModal();
            } catch (error) {
                console.error('Error updating order:', error);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteOrder(id);
            const res = await getAllOrders();
            setOrders(res.orders.reverse());
        } catch (error) {
            console.log(error);
        }
    };

    const validateOrder = (order) => {
        if (!order.customer_name.trim() || !order.customer_email.trim()) {
            setError('Customer name and email are required');
            return false;
        }

        if (!order.product || !order.quantity) {
            setError('Product and quantity are required');
            return false;
        }

        setError('');
        return true;
    };

    return (
        <div className="container mx-auto mt-8">
            <div>
                {<div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold mx-5">All Orders</h1>
                    {user ? <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md mx-5"
                        onClick={openAddModal}
                    >
                        Add
                    </button> : <div></div>}
                </div>}

                {/* Order List */}
                {orders && (
                    <div>
                        {orders.map((order) => (
                            <div key={order._id} className="mb-4 p-4 border rounded-md">
                                <p className="font-bold">Order ID: {order._id}</p>
                                <p>Customer Name: {order.customer_name}</p>
                                <p>Customer Email: {order.customer_email}</p>
                                <p>Product: {order.product}</p>
                                <p>Quantity: {order.quantity}</p>
                                <div className="flex mt-4">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-md"
                                        onClick={() => handleEditOrder(order)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(order._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal for Adding New Order */}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Create Order Modal"
                    className="modal"
                    overlayClassName="overlay"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">
                            {editOrder ? 'Update Order' : 'Create New Order'}
                        </h2>
                        <button className="text-gray-500" onClick={closeModal}>
                            Close
                        </button>
                    </div>

                    {/* Order Form */}
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Customer Name
                            </label>
                            <input
                                type="text"
                                className="mt-1 p-2 border rounded-md w-full"
                                value={newOrder.customer_name}
                                onChange={(e) =>
                                    setNewOrder({ ...newOrder, customer_name: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Customer Email
                            </label>
                            <input
                                type="text"
                                className="mt-1 p-2 border rounded-md w-full"
                                value={newOrder.customer_email}
                                onChange={(e) =>
                                    setNewOrder({ ...newOrder, customer_email: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Product
                            </label>
                            <select
                                className="mt-1 p-2 border rounded-md w-full"
                                value={newOrder.product}
                                onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
                            >
                                <option value="Product 1">Product 1</option>
                                <option value="Product 2">Product 2</option>
                                <option value="Product 3">Product 3</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Quantity
                            </label>
                            <input
                                type="number"
                                className="mt-1 p-2 border rounded-md w-full"
                                value={newOrder.quantity}
                                onChange={(e) =>
                                    setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) })
                                }
                            />
                        </div>

                        {error && <p className="text-red-500">{error}</p>}
                    </form>

                    {/* Create/Update Button */}
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                        onClick={editOrder ? handleUpdateOrder : handleCreateOrder}
                    >
                        {editOrder ? 'Update' : 'Create'}
                    </button>
                </Modal>
            </div>
        </div>
    );
};

export default Home;
