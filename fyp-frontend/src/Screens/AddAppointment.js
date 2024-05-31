import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Sidebar from './Sidebar'; // Adjust the path as necessary
import { useSelector } from 'react-redux';
import { useNavigate, useLocation} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css-files/Dashboard.css'; // Ensure the path is correct
import axios from 'axios';

const AddAppointment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { patient_id, xray_id } = location.state;
    
    const user = useSelector(state => state.user).user;
    const radiologist_id = user._id
    const [formData, setFormData] = useState({
        radiologist_id: radiologist_id || '', 
        patient_id: patient_id || '', 
        xray_id: xray_id || '',
        date: '',
        time: '',
    });

    const CreateAppointment = async () =>{
        try{
          const response = await axios.post(`http://localhost:3000/appointment/createAppointment/${formData.patient_id}/${formData.radiologist_id}/${formData.xray_id}`,
          {
            date: formData.data,
            time: formData.time}
        )
          // if (!response.ok) {
          //   throw new Error('Network response was not ok');
          // }
          // const data = await response.data();
          console.log(response)
          // setFormData(data.data.patient);
        }
        catch(error){
          console.error('Error posting appointment details:', error);
        }
      };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleDateChange = (date) => {
        setFormData({ ...formData, date });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        CreateAppointment();
        // Implement your API call logic here, e.g.:
        // await fetch('localhost:3000/patient/createPatient', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
        navigate('/dashboard'); // Navigate after successful creation
    };

    return (
        <div className="container-fluid">
            <Row>
                <Col md={2} className="p-0">
                    <Sidebar />
                </Col>
                <Col md={10}>
                    <Container className="pt-5">
                        <h2>Create Appointment</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                                <DatePicker
                                    selected={formData.date}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    placeholderText="Select date"
                                    name="date"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    placeholder="Enter time"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">Create Appointment</Button>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </div>
    );
};

export default AddAppointment;
