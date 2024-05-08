import {useState, useEffect, useRef} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  useColorScheme,
} from 'react-native';
import Header from '../Header/Header';
import CardTodo from '../CardTodo/CardTodo';
import TabBottomMenu from '../BottomMenu/TabBottomMenu';
import Dialog from 'react-native-dialog';
import NewTodoButton from '../ButtonNewTodo/NewTodoButton';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Settings from '../Settings/Settings';
import {useSelector} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
let isFirstRender = true;
let isLoadUpdate = false;

const Home = () => {
  const [todoList, setTodoList] = useState([]);
  const [selectedTabName, setSelectedTabName] = useState('all');
  const [isAddDialogDisplayed, setIsAddDialogDisplayed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [settingsTab, setSettingsTab] = useState(false);
  const scrollViewRef = useRef();
  const {language} = useSelector(state => state.site);

  const loadTodoList = async () => {
    try {
      const todoListString = await AsyncStorage.getItem('@todoList');
      const parsedTodoList = JSON.parse(todoListString) || [];
      isLoadUpdate = true;
      setTodoList(parsedTodoList);
    } catch (err) {
      alert(err);
    }
  };

  const saveTodoList = async () => {
    try {
      await AsyncStorage.setItem('@todoList', JSON.stringify(todoList));
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    loadTodoList();
  }, []);

  useEffect(() => {
    if (!isLoadUpdate) {
      if (!isFirstRender) {
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    } else {
      isLoadUpdate = false;
    }
  }, [todoList]);

  const getFilteredList = () => {
    switch (selectedTabName) {
      case 'all':
        return todoList;
      case 'inProgress':
        return todoList.filter(todos => !todos.isCompleted);
      case 'done':
        return todoList.filter(todos => todos.isCompleted);
      case 'settings':
        setSettingsTab(true);
        return [];
    }
  };

  const deleteTodo = todoToDelete => {
    Alert.alert(
      language ? 'Yapılacaklardan Sil' : 'Delete todo',
      language
        ? 'Silmek İstediğinize Emin Misiniz ?'
        : 'Are you sure you want to delete this todo ?',
      [
        {text: language ? 'İptal' : 'Cancel', style: 'cancel'},
        {
          text: language ? 'Sil' : 'Delete',
          style: 'destructive',
          onPress: () => {
            setTodoList(todoList.filter(t => t.id !== todoToDelete.id));
          },
        },
      ],
    );
  };

  const addTodo = () => {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setIsAddDialogDisplayed(false);
    setInputValue('');
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({duration: 500, animated: true});
    }, 200);
  };

  const renderAddDialog = () => {
    return (
      <Dialog.Container
        visible={isAddDialogDisplayed}
        onBackdropPress={() => setIsAddDialogDisplayed(false)}>
        <Dialog.Title>{language ? 'Ekle' : 'Add'}</Dialog.Title>
        <Dialog.Input
          onChangeText={setInputValue}
          placeholder={
            language
              ? 'Örn : V60 ile güzel bir kahve demle'
              : 'Ex : Brew a nice coffee with the V60'
          }
        />
        <Dialog.Button
          label={language ? 'İptal' : 'Cancel'}
          color="grey"
          onPress={() => setIsAddDialogDisplayed(false)}
        />
        <Dialog.Button
          disabled={inputValue.length === 0}
          label={language ? 'Kaydet' : 'Save'}
          onPress={addTodo}
        />
      </Dialog.Container>
    );
  };

  const renderTodoList = () => {
    return getFilteredList().map(todo => (
      <View key={todo.id} style={styles.cardItem}>
        <CardTodo todo={todo} onPress={updateTodo} onLongPress={deleteTodo} />
      </View>
    ));
  };

  const updateTodo = todo => {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };

    const updatedTodoList = [...todoList];
    const indexToUpdate = updatedTodoList.findIndex(
      t => t.id === updatedTodo.id,
    );

    updatedTodoList[indexToUpdate] = updatedTodo;
    setTodoList(updatedTodoList);
  };

  const renderTabContent = () => {
    if (selectedTabName === 'settings') {
      return <Settings />;
    } else {
      return renderTodoList();
    }
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={[styles.App, backgroundStyle]}>
          <View style={styles.Header}>
            <Header />
          </View>
          <View style={styles.Body}>
            <ScrollView ref={scrollViewRef}>{renderTabContent()}</ScrollView>
          </View>
          <NewTodoButton onPress={() => setIsAddDialogDisplayed(true)} />
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={styles.Footer}>
        <TabBottomMenu
          onPress={tabName => {
            if (tabName === 'settings') {
              setSettingsTab(true);
              setSelectedTabName(tabName);
            } else {
              setSelectedTabName(tabName);
            }
          }}
          selectedTabName={selectedTabName}
          todoList={todoList}
        />
      </View>
      {renderAddDialog()}
    </>
  );
};

const styles = StyleSheet.create({
  App: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  Header: {
    flex: 1,
  },
  Body: {
    flex: 6,
  },
  Footer: {
    height: 70,
  },
  cardItem: {paddingBottom: 15},
});

export default Home;
