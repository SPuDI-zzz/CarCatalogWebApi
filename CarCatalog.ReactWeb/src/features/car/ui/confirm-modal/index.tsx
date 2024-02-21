import { Modal, message } from 'antd';
import { HttpStatusCode } from 'axios';
import { CarStore, ICar } from 'entities/car';
import { observer } from 'mobx-react-lite';
import React, { FC, PropsWithChildren, useEffect } from 'react';

interface ConfirmCarModalProps {
    car?: ICar;
    isOpened?: boolean;
    isLoading?: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const ConfirmCarModal:FC<PropsWithChildren<ConfirmCarModalProps>> = ({
    children,
    car,
    isOpened,
    isLoading,
    onClose,
    onSuccess,
}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const {deleteCarAction: deleteCar, getCarsAction: getCars, error} = CarStore;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'Это машина была удалена раньше',
        });
    };

    const onOk = async () => {
        if (!car)
            return;
        
        const isDeleted = await deleteCar(car.id)
        if (isDeleted) {
            await getCars();
            onSuccess?.();
        }
    }

    useEffect(() => {
        if (error?.response?.status === HttpStatusCode.NotFound) {
            warning();
            onClose();
            getCars();
        }
    }, [error?.response?.status, getCars, onClose, warning]);

    return (
        <>
            {contextHolder}
            <Modal
                destroyOnClose={true}
                title={'Удаление автомобиля'}
                open={isOpened}
                onCancel={onClose}
                confirmLoading={isLoading}
                okText={'Подтвердить'}
                cancelText={'Отмена'}
                onOk={onOk}
            >
                {car ?
                    <p>{`Вы уверены, что хотите удалить: ${car.mark} ${car.model}`}</p> :
                    <p>{'Загрузка...'}</p>
                }
                {children}
            </Modal>
        </>
    );
};

export default observer(ConfirmCarModal);
