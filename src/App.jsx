import './App.scss'
import ChatList from './components/ChatList'
import ChatWindow from './components/ChatWindow'
import Context from './context/Context'

function App() {
    return (
        <div className="App">
            <Context>
                <ChatList />
                <ChatWindow />
            </Context>
        </div>
    )
}

export default App
