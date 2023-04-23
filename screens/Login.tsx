import {View, Text, TextInput} from 'react-native';
import {z} from 'zod';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useLinkTo} from '@react-navigation/native';

import {GlobalStyles, GlobalStylesVariables} from '../config/global-styles';
import {Title} from '../components/UI/Title';
import {PasswordInput} from '../components/UI/PasswordInput';
import {MainButton} from '../components/UI/MainButton';
import {SocialLinks} from '../components/auth/SocialLinks';
import {useAuthStore} from '../stores/auth.store';
import {MainLayout} from '../layouts/main';

interface ILoginFormValues {
  email: string;
  password: string;
}

const loginValidationSchema = z.object({
  email: z
    .string()
    .min(1, {message: 'Email is required field'})
    .email({message: 'Must be a valid email'}),
  password: z
    .string()
    .min(6, {message: 'Password must be atleast 6 characters'}),
});

type LoginValidationSchema = z.infer<typeof loginValidationSchema>;

const LoginScreen = () => {
  const linkTo = useLinkTo();

  const defaultValues: ILoginFormValues = {
    email: '',
    password: '',
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginValidationSchema>({
    defaultValues,
    resolver: zodResolver(loginValidationSchema),
  });
  const login = useAuthStore(state => state.login);

  const onSubmit: SubmitHandler<LoginValidationSchema> = async (
    payload: ILoginFormValues,
  ) => {
    try {
      await login(payload);
      linkTo('/screens/Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <View style={GlobalStyles.box}>
        <View style={GlobalStyles.form}>
          <Title title={'Login'} />

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

          <MainButton onClick={handleSubmit(onSubmit)} title={'Submit'} />

          <SocialLinks
            link={'/screens/Register'}
            title={'Sign in with'}
            linkTitle={'Register'}
            linkDescription={"Don't have an account?"}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default LoginScreen;
