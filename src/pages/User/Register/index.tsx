import Footer from '@/components/Footer';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Link} from '@@/exports';
import {
  LoginForm,
  ProFormText,
  ProFormCheckbox
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history } from '@umijs/max';
import { Form, message, Tabs} from 'antd';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';
import {userRegister} from "@/services/beeapi/userController";

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [type, setType] = useState<string>('account');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const handleSubmit = async (values: API.UserRegisterRequest) => {
    try {
      // 注册,返回值是id,long类型
      const res = await userRegister({
        ...values,
      });
      //检查返回的res对象中是否包含data属性，如果包含，则表示注册成功
      if (res.data) {
        // 定义默认的注册成功消息
        const defaultRegisterSuccessMessage = '注册成功';
        // 使用 message 组件显示成功信息
        message.success(defaultRegisterSuccessMessage);

        // 创建一个新的URL对象，并获取当前window.location.href的查询参数
        const urlParams = new URL(window.location.href).searchParams;
        // 设置一个延迟100毫秒的定时器
        // 定时器触发后，导航到重定向URL，如果没有重定向URL，则导航到根路径
        setTimeout(() => {
          // 将用户重定向到'redirect'参数指定的URL，如果参数不存在，则重定向到首页('/')
          history.push(urlParams.get('redirect') || '/');
        },100);
      }
      // 如果抛出异常
    } catch (error) {
      // 定义默认的登录失败消息
      const defaultRegisterFailureMessage = '注册失败，请重试！';
      // 在控制台打印出错误
      console.log(error);
      // 使用 message 组件显示错误信息
      message.error(defaultRegisterFailureMessage);
    }
  };
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          form={form}
          submitter={
            {
              searchConfig: {
                submitText: "注册"
              }
            }}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.png" />}
          title="bee-api 接口开放平台"
          subTitle={'由rlue开发的一款API接口开放平台'}
          initialValues={{
            autoRegister: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账号密码注册',
              }
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入账号 '}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                  {
                    min: 4,
                    type: 'string',
                    message: '长度不能小于4！',
                  }
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于8！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '校验密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于8！',
                  },
                  // 验证密码和校验密码是否一致
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if ( getFieldValue('userPassword') !== value) {
                        return Promise.reject(new Error('校验密码不匹配'));
                      }
                      return Promise.resolve(value);
                    },
                  }),
                ]}
              />
            </>
          )}
          <ProFormCheckbox
            initialValue={true}
            name="agreeToAnAgreement"
            rules={[
              () => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(new Error("同意协议后才可以注册"));
                  }
                  return Promise.resolve();
                },
                required: true,
              })]}
          >
            同意并接受《<a
            target={"_blank"}
            // todo 写一个自己的协议
            // href={"https://gitee.com/qimu6/statement/blob/master/%E9%9A%90%E7%A7%81%E5%8D%8F%E8%AE%AE.md#%E6%9F%92%E6%9C%A8%E6%8E%A5%E5%8F%A3-%E9%9A%90%E7%A7%81%E6%9D%A1%E6%AC%BE"}
            rel="noreferrer">隐私协议</a>》《<a
            target={"_blank"}
            // href={"https://gitee.com/qimu6/statement/blob/master/%E6%9F%92%E6%9C%A8%E6%8E%A5%E5%8F%A3%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE.md#%E6%9F%92%E6%9C%A8%E6%8E%A5%E5%8F%A3%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE"}
            rel="noreferrer">用户协议</a>》
          </ProFormCheckbox>
          <div
            style={{
              marginTop: -18,
            }}
          >
            <Link
              to={'/user/login'}
              style={{
                float: 'right',
              }}
            >
              已有账号?点击前往登录
            </Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
