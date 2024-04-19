/* eslint-disable react-native/no-inline-styles */
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {
  Box,
  Button,
  CheckIcon,
  HStack,
  Select,
  Text,
  VStack,
} from 'native-base';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {SheetHeader} from '@components/ui';
import {WIN_HEIGHT} from '../../config';
import {authStore} from '@store/auth';
import {observer} from 'mobx-react-lite';

interface WorkListType {
  title: string;
  description: string;
  id: string;
  days: number[];
}

const WorkList: WorkListType[] = [
  {
    id: '1',
    title: 'Full Time',
    description: '7 days/week',
    days: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: '2',
    title: 'Part Time',
    description: '5 days/week',
    days: [1, 2, 3, 4, 5],
  },
  {
    id: '3',
    title: 'Weekend',
    description: 'Saturday & Sunday',
    days: [6, 7],
  },
];

export const ContractTypeSheet = observer((props: SheetProps) => {
  const contractTypeSheetRef = useRef<ActionSheetRef>(null);
  const [service, setService] = React.useState('');

  const userD = authStore.auth;

  useEffect(() => {
    const type = userD.rider?.contract_type.toString() ?? '';
    console.log('contract type', type);
    setService(type);
  }, [userD.rider?.contract_type]);

  const getServiceDataById = useCallback(() => {
    const filter = WorkList.filter(el => el.id === service);
    return filter[0];
  }, [service]);

  const getDayName = (dayNumber: number): string => {
    const dayNames = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    // Subtract 1 since arrays are 0-indexed but your days start from 1
    return dayNames[dayNumber - 1];
  };

  const Content = useCallback(() => {
    return (
      <Box py={6} px={4} bg="#ffffff" h="full" roundedTop="2xl">
        <SheetHeader sheetToClose="contractType" title="Contract type" />
        <VStack mt={4}>
          <Select
            selectedValue={service}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Choose Service"
            _selectedItem={{
              bg: 'themeLight.primary.base',
              _text: {color: 'white'},
              endIcon: <CheckIcon color="white" size="5" />,
            }}
            mt={1}
            onValueChange={itemValue => setService(itemValue)}>
            {WorkList.map((el, i) => (
              <Select.Item key={i} label={el.title} value={el.id} />
            ))}
          </Select>

          <VStack
            borderWidth={1}
            borderColor="themeLight.gray.3"
            rounded="md"
            p={4}
            mt={8}>
            <HStack space={4} alignItems="center">
              <Text fontWeight="bold" fontSize="md">
                {getServiceDataById()?.title}
              </Text>
              <Text>{getServiceDataById()?.description}</Text>
            </HStack>
            <HStack mt={4} space={3} flexWrap="wrap">
              {getServiceDataById()?.days.map((day, i) => (
                <Box key={i} bg="themeLight.gray.2" mb={4} p={2} rounded="md">
                  <Text color="white">{getDayName(day)}</Text>
                </Box>
              ))}
            </HStack>
          </VStack>

          <Button py={4} rounded="full" mt={8} _text={{fontWeight: 'bold'}}>
            Finish
          </Button>
        </VStack>
      </Box>
    );
  }, [getServiceDataById, service]);

  return (
    <ActionSheet
      id={props.sheetId}
      ref={contractTypeSheetRef}
      indicatorStyle={{
        width: 0,
      }}
      gestureEnabled={true}
      containerStyle={{
        height: WIN_HEIGHT * 0.9,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: 'transparent',
        // backgroundColor: colorMode === 'dark' ? '#111827' : '#fff',
      }}>
      {Content()}
    </ActionSheet>
  );
});
