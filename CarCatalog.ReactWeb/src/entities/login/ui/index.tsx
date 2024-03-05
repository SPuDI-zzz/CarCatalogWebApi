import { Button, Card, Form, Input, Row, Spin } from 'antd';
import React, { FC, PropsWithChildren } from 'react';
import { yupValidator } from 'shared/utils';
import { LoginFormType, loginFormSchema } from '../lib';
import { ILogin } from '../model';

interface LoginCardProps {
    onFinish: (data: ILogin) => void;
    isLoading?: boolean;
}

const LoginCard:FC<PropsWithChildren<LoginCardProps>> = ({children, onFinish, isLoading}) => {
    const [form] = Form.useForm<LoginFormType>();
    const yupSync = yupValidator(loginFormSchema, form.getFieldsValue);

    return (
        <Spin spinning={isLoading} size={'large'}>
            <Row align={'middle'} justify={'center'}>
                <Card title={'Войдите'} style={{ width: "30rem" }}>
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
                        {children ?
                            <Form.Item>
                                {children}
                            </Form.Item> :
                            null
                        }
                        <Form.Item>
                            <Button type={'primary'} htmlType={'submit'}>
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>               
                </Card>
            </Row>
        </Spin>
    );
};

export default LoginCard;
