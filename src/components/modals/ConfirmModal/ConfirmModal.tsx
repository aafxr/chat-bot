import clsx from "clsx";
import React from 'react';
import {Button, Modal, ModalProps} from "react-bootstrap";

import './ConfirmModal.scss'


export interface ConfirmModalProps extends ModalProps {
    titleText: string
    body: string
    confirmText: string
    cancelText: string
    onCancel?: () => unknown
    onConfirm?: () => unknown
}


export function ConfirmModal({
                                 titleText,
                                 body,
                                 confirmText,
                                 cancelText,
                                 onCancel,
                                 onConfirm,
                                 ...props
                             }: ConfirmModalProps) {
    return (
        <Modal {...props} className={clsx('confirmModal', props.className)}>
            <Modal.Header closeButton>
                <Modal.Title>{titleText}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button className='app-btn' variant="secondary" onClick={onCancel}>
                    {cancelText}
                </Button>
                <Button className='app-btn' variant="primary" onClick={onConfirm}>
                    {confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

