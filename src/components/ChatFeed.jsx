
import MessageFeed from "./MessageFeed";
import MyMsg from "./MyMsg";
import TheirMsg from "./TheirMsg";
const ChatFeed =(props) => {

    const {chats,activeChat, userName, messages} = props;

    const chat =chats && chats[activeChat];
    const renderReadReceipts =(message,isMyMessage) => {
          return   chat.people.map((person,index) => person.last_read==message.id && (
              <div
                  key={'read_${index}'}
                  className="read-receipt"
                  style={{float: isMyMessage ?'right' :'left',
                            backgroundImage: 'url(${person?.person?.avatar})'}}
              />
          ))
    }

    const renderMessages = () => {
        const keys = Object.keys(messages);

        return keys.map((key, index) =>{
            const message = messages[key];
            const lastMessagekey =index === 0 ? null : keys[index - 1];
            const isMyMessage = userName === message.sender.username;

            return(
                <div key={'msg_${index}'} style={{width: '100%'}}>
                <div className="message-block">
                    {
                        isMyMessage
                        ?<MyMsg message={messages}/>
                        : <TheirMsg message={messages} lastMessage={messages[lastMessagekey]}/>
                    }
                </div>
                <div className="read-rceipts" style={{marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px'  : '68px'}}>
                     
               {renderReadReceipts(message, isMyMessage)}

                </div>

                </div>
            )
        })

    }
    

     if(!chat) return 'Loding....'

    return(
        <div className="chat-feed">
            <div className="chat-title-container">
                 <div className="chat-title">
                     {chat.title}
                 </div> 
                 <div className="chat-subtitle">
                     {chat.people.map((person) =>  '${person.person.username}')}
                 </div>
            </div>

            {renderMessages()}
            <div style={{  height: '100px' }}/>
            <div className="message-form-container">

               <MessageFeed {...props}  chatId={activeChat}  />

            </div>
            
        </div>
    );

}


export default ChatFeed;

