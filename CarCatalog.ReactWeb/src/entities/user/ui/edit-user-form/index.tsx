import { Form, FormInstance, Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { IUser, Roles, editUserFormSchema } from 'entities/user';
import React, { FC, PropsWithChildren } from 'react';
import { yupValidator } from 'shared/utils';
import styles from './index.module.css'

interface EditUserFormProps {
    isLoading?: boolean;
    form?: FormInstance<IUser>;
    formId?: string;
    onFinish: (data: IUser) => void
}

const EditUserForm:FC<PropsWithChildren<EditUserFormProps>> = ({children, isLoading = false, form, formId, onFinish}) => {
    const [userForm] = Form.useForm<IUser>(form);
    const yupSync = yupValidator(editUserFormSchema, userForm.getFieldsValue);

    return (
        <Spin spinning={isLoading}>
            <Form 
                id={formId}
                form={userForm}
                layout={'vertical'}
                onFinish={onFinish}
            >
                <Form.Item 
                    name={'id'}
                    hidden={true}
                    children={<Input/>}    
                />
                <Form.Item
                    name={'login'}
                    label={'Логин'}
                    rules={[yupSync]}
                >
                    <Input value={'qwe'} size={'large'} placeholder={'Логин'}></Input>
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

export default EditUserForm;
