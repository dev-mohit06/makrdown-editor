const Header = ({ title, icon, ai, handleDownload, handelAiResponse, isAiButtonDisabled }) => {
    return (
        <div className='editor__header'>
            <h1>{title}</h1>
            <div className='actions'>
                <img  src={ai} onClick={handelAiResponse} title="AI Response" disabled={isAiButtonDisabled} />
                <img src={icon} onClick={handleDownload} title="Download" />
            </div>
        </div>
    )
}

export default Header