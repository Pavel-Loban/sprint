  import React from 'react';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import { Formik } from 'formik';
  import * as Yup from 'yup';

  import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
  import { RootState } from '../../store';
  import { setAuthLoader,setServerResponse} from '../../store/form-slice';
  import { setUser } from '../../store/user-slice';
  import { FormButton } from '../form-button/form-button';
  import { Input3span } from '../inputs/input-3span/input-3span';

  import styles from './form-rename-pass.module.scss'

interface Props{
    code: string,
}
  export const Schema = Yup.object().shape({

      password: Yup.string()
          .required('')
          .min(8, 'Пароль должен быть более 8 символов')
          .max(16)
          .matches(
              /(?=.*[A-Z])\w+/,
              'Пароль должен содержать как минимум одну прописную',
          )
          .matches(/\d/, 'Пароль должен содержать как минимум одну цифру'),
          passwordConfirmation: Yup.string()
    .required('Пароли должны совпадать')
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
  });


  export const FormRenamePass: React.FC<Props> = ({code}) => {

      const dispatch = useAppDispatch();
      const push = useNavigate();
      const { step1, step2, step3 } = useAppSelector((state: RootState) => state.form);
      const [visiblePass, setVisiblePass] = React.useState<boolean>(false);
      const [visibleChangePass, setVisibleChangePass] = React.useState<boolean>(false);
      const [step, setStep] = React.useState<string>('1');


      const getVisibilityPassword = () => {
          setVisiblePass(!visiblePass);
      }

      const getVisibilityChangePassword = () => {
        setVisibleChangePass(!visibleChangePass);
    }


    const baseUrl = 'https://strapi.cleverland.by/api/auth/reset-password'


    const getRenamePass = async (paramPassword:string, paramChangePass:string) => {

        dispatch(setAuthLoader(true));
        await axios
                .post(baseUrl, {

                    'password': paramPassword,
                    'passwordConfirmation':paramChangePass,
                    'code': code,
                }).then((data) => {

          dispatch(setServerResponse('ok'))
          dispatch(setAuthLoader(false));
                }).catch((err) => {
                    // console.log(err);
                    dispatch(setServerResponse('error'))
                    dispatch(setAuthLoader(false));
                })
    }





      return (

        //   <React.Fragment>



              <Formik
                  initialValues={{
                      password: '',
                      passwordConfirmation: '',
                  }}
                  validationSchema={Schema}
                  onSubmit={(values) => getRenamePass(values.password, values.passwordConfirmation)}
              >
                  {({
                      values,
                      errors,
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      dirty,
                      touched,
                      isValid,
                  }) => {
                      const d = new Date();




                      return (
                          <form className={styles.auth_form}
                              onSubmit={handleSubmit}
                              data-test-id='reset-password-form'
                          >
                              <div className={styles.form_header}>
                                  <h3 className={styles.auth_title}>Восстановление пароля</h3>
                              </div>


                              <Input3span step1={step1} value={values.password} touched={touched?.password} error={errors.password} handleBlur={handleBlur}
                              name='password' label='Новый пароль' handleChange={handleChange}
                                  visiblePass={visiblePass} getVisibilityPassword={getVisibilityPassword} />


                              <Input3span step1={step1} value={values.passwordConfirmation} touched={touched?.passwordConfirmation}
                              name='passwordConfirmation' label='Повторите пароль'  error={errors.passwordConfirmation} handleBlur={handleBlur} handleChange={handleChange}
                                  visiblePass={visibleChangePass} getVisibilityPassword={getVisibilityChangePassword} />



                              <footer className={styles.footer_form}>

                                  <FormButton buttonText='СОХРАНИТЬ ИЗМЕНЕНИЯ ' typeSubmit={true} disabledButton ={!!errors.passwordConfirmation}
                                      getNextStep={() => { }}
                                  />



                                  <div className={styles.footer_link_signin}>
                                      <p className={styles.description_link}>
                                      После сохранения войдите в библиотеку, используя новый пароль
                                      </p>


                                  </div>
                              </footer>
                          </form>
                      );
                  }}
              </Formik>

        //   </React.Fragment>

      )
  }
