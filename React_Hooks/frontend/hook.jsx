import React, {useState,useEffect} from 'react'

export default function Hook() {
    const [click, raiseClick] = useState(0);
    const [title, updateTitle] = useState('Reacty')
    let today = new Date();
    let secs = today.getSeconds();
    const [time, updateClock] = useState(secs);

    useEffect(()=>{
        const secondCount = setInterval(()=>{
            if(time<60){
                updateClock(time + 1)
            } else {
                updateClock(0)
            }
        },1000)
        return(
            ()=>{
            clearInterval(secondCount)
            }
        )
    })

    function addCounter(){
        raiseClick(click+1)
    }

    function changeTitle(e){
        updateTitle(e.target.value)
    }

    useEffect(()=>{
        document.title = title;
    }, [title])

    return(
        <div>
            You've clicked {click} times!
            <br/>
            <button onClick={() => addCounter()}>
                Click Me!
            </button>
            <br/>
            <br/>
            Type to change doc title
            <input type="text" value ={title} onChange={changeTitle}/>
        <br/>
        <br/>
        Current Seconds:
            {time}
        </div>
    )
}