import { Button, Card, Form, Input, Row, Spin } from 'antd';
import React, { FC, PropsWithChildren } from 'react';
import { yupValidator } from 'shared/utils';
import { RegisterFormType, registerFormSchema } from '../lib';
import { IRegister } from '../model';

interface RegisterCardProps {
    onFinish: (data: IRegister) => void;
    isLoading?: boolean;
}

const RegisterCard:FC<PropsWithChildren<RegisterCardProps>> = ({children, onFinish, isLoading}) => {
    const [form] = Form.useForm<RegisterFormType>();
    const yupSync = yupValidator(registerFormSchema, form.getFieldsValue) 

    return (
        <Spin spinning={isLoading} size={'large'}>
            <Row align={'middle'} justify={'center'}>
                <Card title={'Создайте учётную запись'} style={{ width: "30rem" }}>
                    <Form form={form} onFinish={onFinish} layout={'vertical'}>
                        <Form.Item 
                            name={'userName'}
                            label={'Имя пользователя'}
                            rules={[yupSync]}
                        >
                            <Input size={'large'} placeholder={'Имя пользователя'}/>
                        </Form.Item>
                        <Form.Item 
                            name={'password'}
                            label={'Пароль'}
                            rules={[yupSync]}
                            >
                            <Input.Password size={'large'} placeholder={'Пароль'}/>
                        </Form.Item>
                        <Form.Item 
                            name={'confirmationPassword'}
                            label={'Подтвердите пароль'}
                            rules={[yupSync]}
                            >
                            <Input.Password size={'large'} placeholder={'Подтвердите пароль'}/>
                        </Form.Item>
                        {children ?
                            <Form.Item>
                                {children}
                            </Form.Item> :
                            null
                        }
                        <Form.Item>
                            <Button type={'primary'} htmlType={'submit'}>
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Row>
        </Spin>
    );
};

export default RegisterCard;
