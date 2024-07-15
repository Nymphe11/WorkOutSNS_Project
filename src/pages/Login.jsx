import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {API} from '../apis';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const Login = ({}) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const LoginApi = async () => {
    try {
      const requestBody = {
        email: email,
        password: password,
      };

      const res = await API.post('/auth', requestBody);

      console.log(res);
      if (res.status === 200) {
        const {token} = res.data;
        // await AsyncStorage.setItem('authToken', token);
        navigation.navigate('MainTab');
      } else {
        // status가 200이 아닌 경우, 응답 객체의 message를 alert로 표시
        alert(res.data.message || '로그인에 실패하였습니다');
      }
    } catch (error) {
      console.error(error);

      // 에러 응답에서 message를 추출하여 표시
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert('로그인에 실패하였습니다');
      }
    }
  };

  const handleLogin = () => {
    // 이메일 검증로직
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 입력 값 검증
    if (!email) {
      emailRef.current.focus();
      return;
    }
    if (!emailRegex.test(email)) {
      emailRef.current.focus();
      alert('올바른 이메일 형식이 아닙니다.');
      return;
    }
    if (!password) {
      passwordRef.current.focus();
      return;
    }

    // 입력 값 검증 통과 시 가입 처리 로직 실행
    LoginApi();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
        }}>
        <View style={styles.infoWrapper}>
          <Icon name="mail" type="antdesign" style={styles.iconStyle} />
          <TextInput
            style={styles.textInputStyle}
            ref={emailRef}
            placeholder="이메일 아이디 입력"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.infoWrapper}>
          <Icon
            name="lock"
            type="antdesign"
            size={24}
            style={styles.iconStyle}
          />
          <TextInput
            style={styles.textInputStyle}
            ref={passwordRef}
            placeholder="비밀번호 입력"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.infoWrapper, {backgroundColor: '#007fff'}]}>
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Join')}
          style={styles.joinButtonStyle}>
          <Text>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.7,
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 4,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  textInputStyle: {
    width: width * 0.6,
    fontSize: 16,
  },
  loginText: {
    fontSize: 16,
    color: '#fff',
  },
  joinButtonStyle: {
    marginTop: 8,
  },
});

export default Login;
