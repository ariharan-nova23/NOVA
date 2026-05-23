function Message({ msg }) {

  return (

    <div
      className={`p-3 rounded-xl max-w-[80%] ${
        msg.sender === "user"
          ? "bg-cyan-400 text-black ml-auto"
          : "bg-[#111827] text-cyan-300"
      }`}
    >
      {msg.text}
    </div>

  )

}

export default Message