import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {FC, useState} from 'react';
import {z} from 'zod';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {launchImageLibrary} from 'react-native-image-picker';
import NumericInput from 'react-native-numeric-input';
import DatePicker from 'react-native-date-picker';
import {ColorPicker} from 'react-native-color-picker';

import {ISubscription} from '../../../types/entities/Subscription';
import {
  GlobalStyles,
  GlobalStylesVariables,
} from '../../../config/global-styles';
import {Title} from '../../UI/Title';
import {BackButton} from '../../UI/BackButton';
import moment from 'moment';
import {MainButton} from '../../UI/MainButton';
import {Header} from '../../UI/Header';

interface ISubscriptionAddFormProps {
  onClose?: () => void;
}

interface ISubscriptionAddFormValues
  extends Omit<ISubscription, 'avatar_url' | 'id' | 'pay_date' | 'price'> {
  avatar: any;
  price: string;
  pay_date: Date;
}

const subscriptionAddValidationSchema = z.object({
  name: z
    .string()
    .min(1, {message: 'Name is a required field'})
    .max(100, {message: 'Max length is 100 symbols'}),
  avatar: z.any(),
  price: z.string().min(1, {message: 'Price is a required field'}),
  pay_type: z.string().min(1, {message: 'Pay type is a required field'}),
  pay_date: z.date(),
  plan_details: z.string(),
  payment_info: z.number(),
  color: z.string().min(1, {message: 'Color is a required field'}),
});

type SubscriptionAddValidationSchema = z.infer<
  typeof subscriptionAddValidationSchema
>;

export const SubscriptionAddForm: FC<ISubscriptionAddFormProps> = ({
  onClose,
}) => {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

  const defaultValues: ISubscriptionAddFormValues = {
    name: '',
    avatar: '',
    price: '',
    pay_type: '',
    pay_date: new Date(),
    plan_details: '',
    payment_info: 0,
    color: '',
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
  } = useForm<SubscriptionAddValidationSchema>({
    defaultValues,
    resolver: zodResolver(subscriptionAddValidationSchema),
  });

  const formValues = watch();

  const onSubmit: SubmitHandler<SubscriptionAddValidationSchema> = (
    values: ISubscriptionAddFormValues,
  ) => {
    console.log('DATA', values);
  };

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response?.assets && response?.assets[0]) {
        setValue('avatar', response.assets[0]);
      }
    });
  };

  const removeImage = () => {
    setValue('avatar', '');
  };

  const onChangeNumericInput = (value: string) => {
    let newText = '';
    const numbers = '0123456789';

    for (let i = 0; i < value.length; i++) {
      if (numbers.indexOf(value[i]) > -1) {
        newText = newText + value[i];
      } else {
        Alert.alert('please enter numbers only');
        setValue('price', '');
      }
    }
    setValue('price', newText);
  };

  return (
    <View style={GlobalStyles.box}>
      <Header title={'Create a new subscription'} onClose={onClose} />

      <View style={{...GlobalStyles.form, justifyContent: 'flex-start'}}>
        {!formValues.avatar && (
          <TouchableOpacity
            style={styles.uploadImageBox}
            activeOpacity={0.8}
            onPress={pickImage}>
            <Text style={styles.uploadImageText}>Upload Image</Text>
          </TouchableOpacity>
        )}

        {formValues.avatar && (
          <View style={styles.uploadImageContainer}>
            <TouchableOpacity
              style={styles.uploadImageRemove}
              activeOpacity={1}
              onPress={removeImage}>
              <Image
                style={styles.uploadImageRemoveIcon}
                source={require('../../../assets/images/close.png')}
              />
            </TouchableOpacity>

            <Image
              style={styles.uploadImage}
              source={{uri: formValues.avatar.uri}}
            />
          </View>
        )}

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <TextInput
              style={!error ? GlobalStyles.input : GlobalStyles.inputError}
              placeholder="Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text style={GlobalStyles.errorMessage}>{errors.name.message}</Text>
        )}

        <View style={styles.twoInputs}>
          <Controller
            control={control}
            render={({field: {onBlur}, fieldState: {error}}) => {
              return (
                <View style={styles.inputNumericBox}>
                  <TextInput
                    style={
                      !error ? styles.inputNumeric : GlobalStyles.inputError
                    }
                    keyboardType={'numeric'}
                    placeholder="Price"
                    onBlur={onBlur}
                    onChangeText={onChangeNumericInput}
                  />

                  {errors.price && (
                    <Text style={GlobalStyles.errorMessage}>
                      {errors.price.message}
                    </Text>
                  )}
                </View>
              );
            }}
            name="price"
          />

          <Controller
            control={control}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <View style={{width: '48.5%'}}>
                <TextInput
                  style={!error ? GlobalStyles.input : GlobalStyles.inputError}
                  placeholder="Pay Type"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />

                {errors.pay_type && (
                  <Text style={GlobalStyles.errorMessage}>
                    {errors.pay_type.message}
                  </Text>
                )}
              </View>
            )}
            name="pay_type"
          />
        </View>

        <Controller
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => {
            return (
              <View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={!error ? GlobalStyles.input : GlobalStyles.inputError}
                  onPress={() => setIsOpenDatePicker(true)}>
                  <Text style={styles.datePickerText}>
                    Pay date: {moment(value).format('MM-DD-YYYY')}
                  </Text>
                </TouchableOpacity>

                <DatePicker
                  modal
                  open={isOpenDatePicker}
                  date={value}
                  onConfirm={date => {
                    setIsOpenDatePicker(false);
                    onChange(date);
                  }}
                  onCancel={() => {
                    setIsOpenDatePicker(false);
                  }}
                />
              </View>
            );
          }}
          name="pay_date"
        />
        {errors.pay_date && (
          <Text style={GlobalStyles.errorMessage}>
            {errors.pay_date.message}
          </Text>
        )}

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
            return (
              <View>
                <TextInput
                  style={!error ? GlobalStyles.input : GlobalStyles.inputError}
                  placeholder="Color"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />

                {errors.color && (
                  <Text style={GlobalStyles.errorMessage}>
                    {errors.color.message}
                  </Text>
                )}

                <ColorPicker
                  style={styles.colorPicker}
                  onColorSelected={onChange}
                />
              </View>
            );
          }}
          name="color"
        />

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <TextInput
              style={!error ? GlobalStyles.input : GlobalStyles.inputError}
              placeholder="Plan details"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="plan_details"
        />
        {errors.plan_details && (
          <Text style={GlobalStyles.errorMessage}>
            {errors.plan_details.message}
          </Text>
        )}

        <View style={styles.actions}>
          <MainButton onClick={handleSubmit(onSubmit)} title={'Create'} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    marginTop: 20,
  },
  uploadImageContainer: {
    position: 'relative',
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  uploadImageRemove: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 28,
    height: 28,
    backgroundColor: '#fff',
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    zIndex: 200,
  },
  uploadImageRemoveIcon: {
    width: 24,
    height: 24,
  },
  uploadImageBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 40,
    borderRadius: 20,
    borderStyle: 'dotted',
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 20,
  },
  uploadImageText: {
    textAlign: 'center',
    fontFamily: GlobalStylesVariables.mainFontMedium,
    fontWeight: '500',
    color: '#000',
    fontSize: 16,
  },
  uploadImage: {
    zIndex: 100,
    width: 150,
    height: 150,
    borderRadius: 20,
  },

  priceContainer: {
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: 11,
    left: 10,
    zIndex: 100,
    fontFamily: GlobalStylesVariables.mainFontRegular,
    fontSize: 16,
  },
  inputNumericBox: {
    width: '46%',
  },
  inputNumeric: {
    padding: 15,
    fontSize: 16,
    fontFamily: GlobalStylesVariables.mainFontRegular,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9eaec',
    borderStyle: 'solid',
    backgroundColor: '#FAFCFE',
    borderRadius: 20,
  },

  twoInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  datePickerText: {
    fontSize: 16,
    fontFamily: GlobalStylesVariables.mainFontRegular,
  },

  colorPicker: {
    height: 250,
    marginBottom: 20,
  },
});
