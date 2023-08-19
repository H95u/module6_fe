import Modal from "react-bootstrap/Modal";
import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

export default function Report(props) {
    const handleClose = () => {
        props.onHide();
    };
    const [initialValueReport, setInitialValueReport] = useState({
        description: "",
        accuserId: null,
        accusedId: null,
        accusedName: ""
    })

    useEffect(() => {
        setInitialValueReport({
            description: "",
            accuserId: props.accuserId,
            accusedId: props.accusedId,
            accusedName: props.accusedName
        })
    }, [props]);

    const validationOfReport = Yup.object({
        description: Yup.string().min(3, "Tối thiệu 3 kí tự").required("Nội dung là bắt buộc")
    });

    const handleSubmit = (value) => {
        axios.post("http://localhost:8080/api/reports", value).then((res) => {
            Swal.fire({
                title: "Cảm ơn bạn đã phản hồi, ý kiến của bạn đang chờ duyệt!",
                icon: "success",
                confirmButtonText: "OK"
            })
            handleClose();
        })
    };


    return (
        <>
            <Modal show={props.show} onHide={handleClose} className={`report-container`}>
                <Modal.Header>
                    <Modal.Title>Tố cáo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik initialValues={initialValueReport} onSubmit={handleSubmit}
                            enableReinitialize={true}
                            validationSchema={validationOfReport}>
                        <Form>
                            <div className="mb-3 d-flex report">
                                <label htmlFor={'accusedName'} className={'form-label'}>Người bị tố cáo</label>
                                <Field name={'accusedName'} className={'form-control accusedName'}
                                       id={'accusedName'} disabled/>
                            </div>
                            <div className="mb-3 report">
                                <label htmlFor={'description'} className={'form-label'}>
                                    <span style={{color: "red"}}>*</span> Nội dung</label>
                                <Field as={`textarea`} name={'description'} className={'form-control'}
                                       id={'description'}
                                       placeholder={'Nội dung báo cáo'}/>
                                <span style={{color: "red"}}><ErrorMessage className={'error'}
                                                                           name={'description'}/></span>
                            </div>
                            <div className={`report-button`}>
                                <button className={"btn btn-danger"}>Báo cáo</button>
                                &ensp;
                                <button className={"btn btn-secondary"} onClick={handleClose}>Quay lại</button>
                            </div>
                        </Form>
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
}