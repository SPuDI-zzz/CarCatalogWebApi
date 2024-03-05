import { Form, FormInstance, Input, Spin } from 'antd';
import { ICar, carFormSchema } from 'entities/car';
import React, { FC, PropsWithChildren } from 'react';
import { yupValidator } from 'shared/utils';

interface CarFromProps {
    isLoading?: boolean;
    form?: FormInstance<ICar>;
    formId?: string;
    onFinish: (data: ICar) => void;
}

const CarForm:FC<PropsWithChildren<CarFromProps>> = ({children, isLoading = false, form, formId, onFinish}) => {
    const [carForm] = Form.useForm<ICar>(form);
    const yupSync = yupValidator(carFormSchema, carForm.getFieldsValue); 

    return (
        <Spin spinning={isLoading}>
            <Form 
                id={formId}
                form={carForm}
                layout={'vertical'}
                onFinish={onFinish}
            >
                <Form.Item 
                    name={'id'}
                    hidden={true}
                    children={<Input/>}
                />
                <Form.Item 
                    name={'userId'}
                    hidden={true}
                    children={<Input/>}
                />
                <Form.Item
                    name={'mark'}
                    label={'Марка'}
                    rules={[yupSync]}
                >
                    <Input size={'large'} placeholder={'Название марки'}></Input>
                </Form.Item>
                <Form.Item
                    name={'model'}
                    label={'Модель'}
                    rules={[yupSync]}
                >
                    <Input size={'large'} placeholder={'Название модели'}></Input>
                </Form.Item>
                <Form.Item
                    name={'color'}
                    label={'Цвет'}
                    rules={[yupSync]}
                >
                    <Input size={'large'} placeholder={'Название цвета'}></Input>
                </Form.Item>
                {children ?
                    <Form.Item>
                        {children}
                    </Form.Item> :
                    null
                }
            </Form>
        </Spin>
    );
};

export default CarForm;
