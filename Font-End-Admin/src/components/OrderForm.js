import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const OrderForm = ({ onOrderSubmit }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        onOrderSubmit({ paymentMethod, address });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <h1 htmlFor="paymentMethod">Payment Method</h1>
                <Input
                    type="select"
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={e => setPaymentMethod(e.target.value)}
                >
                    {/* <option value="">Select</option>
                    {paymentMethods.map(method => (
                        <option key={method.id} value={method.name}>
                            {method.name}
                        </option>
                    ))} */}
                </Input>
            </FormGroup>
            {paymentMethod === 'Cash on Delivery' && (
                <FormGroup>
                    <Label htmlFor='adress'>Delivery Address</Label>
                    <Input
                        type="text"
                        id="address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </FormGroup>
            )}
            <Button color="primary" type="submit">Submit Order</Button>
        </Form>
    );
};

export default OrderForm;
