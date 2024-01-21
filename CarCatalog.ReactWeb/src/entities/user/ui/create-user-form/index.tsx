import { Form, FormInstance, Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { ICreateUserForm, Roles, createUserFormShema } from 'entities/user';
import React, { FC, PropsWithChildren } from 'react';
import { yupValidator } from 'shared/utils';
import styles from './index.module.css'

interface CreateUserFormProps {
    isLoading?: boolean;
    form?: FormInstance<ICreateUserForm>;
    formId?: string;
    onFinish: (data: ICreateUserForm) => void
}

const CreateUserForm:FC<PropsWithChildren<CreateUserFormProps>> = ({children, isLoading = false, form, formId, onFinish}) => {
    const [userForm] = Form.useForm<ICreateUserForm>(form);
    const yupSync = yupValidator(createUserFormShema, userForm.getFieldsValue);

    return (
        <Spin spinning={isLoading}>
            <Form 
                id={formId}
                form={userForm}
                layout={'vertical'}
                onFinish={onFinish}
            >
                <Form.Item
                    name={'login'}
                    label={'Логин'}
                    rules={[yupSync]}
                >
                    <Input size={'large'} placeholder={'Логин'}></Input>
                </Form.Item>
                <Form.Item 
                    name={'password'}
                    label={'Пароль'}
                    rules={[yupSync]}
                >
                    <Input.Password size={'large'} placeholder={'Пароль'}/>
                </Form.Item>
                <Form.Item 
                    name={'roles'}
                    label={'Роли'}
                    rules={[yupSync]}
                >
                    <Select
                        mode={'multiple'}
                        allowClear
                        className={styles.select}
                        placeholder={'Выберите роли'}
                        options={Roles.map(role => ({
                            label: role,
                            value: role,
                        } as DefaultOptionType))}
                    />
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

export default CreateUserForm;
