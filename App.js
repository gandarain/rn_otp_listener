import React, {useEffect, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import RNOtpVerify from 'react-native-otp-verify';

const App = () => {
  const [otpValue, setOtpValue] = useState('');

  // get app signature
  const getAppSignature = () => {
    RNOtpVerify.getHash().then(console.log).catch(console.log);
  };

  // useEffect(() => {
  //   getAppSignature();
  // }, []);

  useEffect(() => {
    RNOtpVerify.getOtp()
      .then(() =>
        RNOtpVerify.addListener((message) => {
          try {
            setOtpValue(message.split(' ')[1]);
          } catch (error) {
            console.log('error ', error);
          }
        }),
      )
      .catch((p) => console.log(p));

    return () => {
      RNOtpVerify.removeListener();
    };
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>SMS listener</Text>
      <TextInput value={otpValue} onChangeText={(val) => setOtpValue(val)} />
    </View>
  );
};

export default App;
