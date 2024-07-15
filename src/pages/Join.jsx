import {Icon} from '@rneui/themed';
import React, {useRef, useState, useEffect} from 'react';
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

const {width} = Dimensions.get('window');

const Join = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const emailRef = useRef(null);
  const nicknameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const phoneRef = useRef(null);

  const joinAccountApi = async () => {
    try {
      const requestBody = {
        email: email,
        password: password,
        nickname: nickname,
        phoneNumber: phone,
      };

      const res = await API.post('/accounts', requestBody);

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleJoin = () => {
    // 이메일 검증로직
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 비밀번호 형식 검증을 위한 정규 표현식
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

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
    if (!nickname) {
      nicknameRef.current.focus();
      return;
    }
    if (!password) {
      passwordRef.current.focus();
      return;
    }
    if (!passwordRegex.test(password)) {
      passwordRef.current.focus();
      alert(
        '비밀번호는 8~20글자, 영어 소문자, 대문자, 특수 문자, 숫자를 각각 하나 이상 포함해야 합니다.',
      );
      return;
    }
    if (password !== confirmPassword) {
      passwordRef.current.focus();
      alert('비밀번호 확인에 실패했습니다.');
      return;
    }
    if (!confirmPassword) {
      confirmPasswordRef.current.focus();
      return;
    }
    if (!phone) {
      phoneRef.current.focus();
      return;
    }

    // 입력 값 검증 통과 시 가입 처리 로직 실행
    joinAccountApi();
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
            ref={emailRef}
            style={styles.textInputStyle}
            placeholder="사용할 이메일 아이디 입력"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.infoWrapper}>
          <Icon name="person" type="ionicon" style={styles.iconStyle} />
          <TextInput
            ref={nicknameRef}
            style={styles.textInputStyle}
            placeholder="사용할 닉네임 입력"
            value={nickname}
            onChangeText={setNickname}
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
            ref={passwordRef}
            style={styles.textInputStyle}
            placeholder="비밀번호 입력"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.infoWrapper}>
          <Icon name="check" type="entypo" size={24} style={styles.iconStyle} />
          <TextInput
            ref={confirmPasswordRef}
            style={styles.textInputStyle}
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.infoWrapper}>
          <Icon
            name="mobile1"
            type="antdesign"
            size={24}
            style={styles.iconStyle}
          />
          <TextInput
            ref={phoneRef}
            style={styles.textInputStyle}
            placeholder="전화 번호"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity
          onPress={handleJoin}
          style={[styles.infoWrapper, {backgroundColor: '#007fff'}]}>
          <Text style={styles.loginText}>가입하기</Text>
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

export default Join;
