import {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {z} from 'zod';
import moment from 'moment/moment';
import DatePicker from 'react-native-date-picker';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {GlobalStyles} from '../../../config/global-styles';
import {Header} from '../../UI/Header';
import {ITransaction} from '../../../types/entities/Transaction';
import {formatPrice} from '../../../helpers/formatPrice';
import {MainButton} from '../../UI/MainButton';
import {useTransactionsStore} from '../../../stores/transactions.store';
import {useSubscriptionsStore} from '../../../stores/subscriptions.store';

interface ITransactionAddFormProps {
  onClose: () => void;
}

export interface ITransactionCreateFormValues
  extends Omit<ITransaction, 'id' | 'pay_date' | 'price'> {
  price: string;
  pay_date: Date;
}

const transactionAddValidationSchema = z.object({
  price: z.string().min(1, {message: 'Price is a required field'}),
  pay_date: z.date(),
});

type TransactionAddValidationSchema = z.infer<
  typeof transactionAddValidationSchema
>;

export const TransactionAddForm: FC<ITransactionAddFormProps> = ({onClose}) => {
  const subscription = useSubscriptionsStore(state => state.subscription);
  const createOneTransaction = useTransactionsStore(state => state.createOne);

  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

  const defaultValues: ITransactionCreateFormValues = {
    price: '',
    pay_date: new Date(),
    subscriptionId: '',
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<TransactionAddValidationSchema>({
    defaultValues,
    resolver: zodResolver(transactionAddValidationSchema),
  });

  const onSubmit: SubmitHandler<TransactionAddValidationSchema> = async (
    values: ITransactionCreateFormValues,
  ) => {
    await createOneTransaction({...values, subscriptionId: subscription?.id});
    onClose && onClose();
  };

  const onChangeNumericInput = (value: string) => {
    setValue('price', formatPrice(value));
  };

  return (
    <View
      style={{...GlobalStyles.box, height: Dimensions.get('window').height}}>
      <Header title={'Create a new transaction'} onClose={onClose} />

      <View style={GlobalStyles.form}>
        <Controller
          control={control}
          render={({field: {onBlur}, fieldState: {error}}) => {
            return (
              <TextInput
                style={
                  !error ? GlobalStyles.inputNumeric : GlobalStyles.inputError
                }
                keyboardType={'numeric'}
                placeholder="Price"
                onBlur={onBlur}
                onChangeText={onChangeNumericInput}
              />
            );
          }}
          name="price"
        />
        {errors.price && (
          <Text style={GlobalStyles.errorMessage}>{errors.price.message}</Text>
        )}

        <Controller
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => {
            return (
              <View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={!error ? GlobalStyles.input : GlobalStyles.inputError}
                  onPress={() => setIsOpenDatePicker(true)}>
                  <Text style={GlobalStyles.datePickerText}>
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
});
