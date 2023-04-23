import {View, Text, TextInput} from 'react-native';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useLinkTo} from '@react-navigation/native';

import {MainButton} from '../components/UI/MainButton';
import {GlobalStyles, GlobalStylesVariables} from '../config/global-styles';
import {PasswordInput} from '../components/UI/PasswordInput';
import {Title} from '../components/UI/Title';
import {SocialLinks} from '../components/auth/SocialLinks';
import {useAuthStore} from '../stores/auth.store';
import {MainLayout} from '../layouts/main';

interface IRegisterFormValues {
  email: string;
  password: string;
  repeatPassword: string;
}

const registerValidationSchema = z
  .object({
    email: z
      .string()
      .min(1, {message: 'Email is required field'})
      .email({message: 'Must be a valid email'}),
    password: z
      .string()
      .min(6, {message: 'Password must be atleast 6 characters'}),
    repeatPassword: z
      .string()
      .min(1, {message: 'Repeat Password is required field'}),
  })
  .refine(({password, repeatPassword}) => password === repeatPassword, {
    path: ['repeatPassword'],
    message: "Password don't match",
  });

type RegisterValidationSchema = z.infer<typeof registerValidationSchema>;

const RegisterScreen = () => {
  const defaultValues: IRegisterFormValues = {
    email: '',
    password: '',
    repeatPassword: '',
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterValidationSchema>({
    defaultValues,
    resolver: zodResolver(registerValidationSchema),
  });
  const linkTo = useLinkTo();
  const register = useAuthStore(state => state.register);

  const onSubmit: SubmitHandler<RegisterValidationSchema> = async (
    payload: IRegisterFormValues,
  ) => {
    await register(payload);
    linkTo('/screens/Home');
  };

  return (
    <MainLayout>
      <View style={GlobalStyles.box}>
        <View style={GlobalStyles.form}>
          <Title title={'Register'} />

          <Controller
            control={control}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <TextInput
                style={!error ? GlobalStyles.input : GlobalStyles.inputError}
                placeholderTextColor={
                  GlobalStylesVariables.placeholderInputColor
                }
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={GlobalStyles.errorMessage}>
              {errors.email.message}
            </Text>
          )}

          <Controller
            control={control}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <PasswordInput
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                error={error?.message}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={GlobalStyles.errorMessage}>
              {errors.password.message}
            </Text>
          )}

          <Controller
            control={control}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <PasswordInput
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                placeholder={'Repeat Password'}
                error={error?.message}
              />
            )}
            name="repeatPassword"
          />
          {errors.repeatPassword && (
            <Text style={GlobalStyles.errorMessage}>
              {errors.repeatPassword.message}
            </Text>
          )}

          <MainButton onClick={handleSubmit(onSubmit)} title={'Submit'} />

          <SocialLinks
            link={'/screens/Login'}
            title={'Sign up with'}
            linkTitle={'Login'}
            linkDescription={'Already have an account?'}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default RegisterScreen;
