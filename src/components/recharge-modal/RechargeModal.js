import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import { Accordion, AccordionBody, AccordionHeader, Button, Typography } from '@material-tailwind/react';

function RechargeModal({ showRecharge, handleCloseRecharge}) {
    const [open, setOpen] = useState(1);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    return (
        <Modal show={showRecharge} onHide={handleCloseRecharge}>
            <Modal.Header>
                <Modal.Title>Nạp tiền</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion open={open === 1} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
                    <AccordionHeader
                        onClick={() => handleOpen(1)}
                        className={`border-b-0 transition-colors ${
                            open === 1 ? 'text-blue-500 hover:!text-blue-700' : ''
                        }`}
                    >
                        Nạp tiền ngay với paypal?
                    </AccordionHeader>
                    <AccordionBody className="pt-0 text-base font-normal">
                        <Typography className={'ml-2 mb-10'} variant={'h2'} color={'black'}>
                            <a href={'/paypal/charge-1000.html'}>
                                Nạp 1000$
                            </a>
                        </Typography>
                        <Typography className={'ml-2 mb-10'} variant={'h2'} color={'light-green'}>
                            <a href={'/paypal/charge-10000.html'}>
                                Nạp 10000$
                            </a>
                        </Typography>
                        <Typography className={'ml-2'} variant={'h2'} color={'red'}>
                            <a href={'/paypal/charge-50000.html'}>
                                Nạp 50000$
                            </a>
                        </Typography>
                    </AccordionBody>
                </Accordion>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseRecharge}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RechargeModal;
