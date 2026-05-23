function Navbar() {

  return (

    <nav className="flex justify-between items-center px-10 py-6">

      <h1 className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_15px_#00ffff]">
        NOVA
      </h1>

      <ul className="flex gap-8 text-gray-300">

        <li className="hover:text-cyan-400 cursor-pointer transition">
          Home
        </li>

        <li className="hover:text-cyan-400 cursor-pointer transition">
          Features
        </li>

        <li className="hover:text-cyan-400 cursor-pointer transition">
          About
        </li>

      </ul>

    </nav>

  )

}

export default Navbar
